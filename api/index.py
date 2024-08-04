from flask import Flask, request, make_response, send_file
from werkzeug.exceptions import HTTPException
from json import loads as parse_json
from io import BytesIO
from uuid import uuid4 as uuid
from pedalboard import Pedalboard, Plugin
from pedalboard.io import AudioFile
from api.pedal import config as pedal_config

MAX_PEDAL_COUNT = 32
MAX_FILE_SIZE = 1024 * 1024 * 10  # 10MB

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE


class PedalTypeError(Exception):
    pass


class PedalParamError(Exception):
    pass


# pedal = { id: str, [param: str]: any }
def map_pedal(pedal: dict) -> Plugin:
    pid = pedal['id']
    if pid in pedal_config:
        args = {}
        for param, config in pedal_config[pid]['params'].items():
            value = pedal[config['id']] if config['id'] in pedal else config['default']
            args[param] = config['fx'](value) if 'fx' in config else value
        try:
            plugin = pedal_config[pid]['plugin']
            return plugin(**args)
        except Exception:
            raise PedalParamError()
    else:
        raise PedalTypeError()


def create_pedalboard(config: list) -> Pedalboard:
    pedal_list = list(map(map_pedal, config))
    return Pedalboard(pedal_list)


# @app.get('/api/config')
# def get_config():
#     config = []
#     for pedal in pedal_config:
#         params = []
#         for param in pedal_config[pedal]['params'].values():
#             param_config = param.copy()
#             param_config.pop('fx', None)
#             params.append(param_config)
#         config.append({'id': pedal, 'name': pedal_config[pedal]['name'], 'params': params})
#     return config


@app.post('/api/simulation')
def simulate_pedalboard():
    try:
        app.logger.debug('=== Start of Pedalboard Creation ===')
        pedalboard_json = parse_json(request.form['pedalboard'])
        if len(pedalboard_json) >= MAX_PEDAL_COUNT:
            app.logger.error('Pedal Chain Too Long')
            return {'error': 'Pedal Chain Too Long', 'message': 'Your pedalboard exceeds the maximum pedal limit.'}, 400
        pedalboard = create_pedalboard(pedalboard_json)
        app.logger.debug('=== End of Pedalboard Creation ===')

        app.logger.debug('=== Start of File Processing ===')
        input_buffer = BytesIO(request.files['audio'].read())
        output_buffer = BytesIO()
        with AudioFile(input_buffer, 'r') as input_file:
            with AudioFile(output_buffer, 'w', samplerate=input_file.samplerate, num_channels=input_file.num_channels,
                           format='wav') as output_file:
                while input_file.tell() < input_file.frames:
                    processed = pedalboard(input_file.read(input_file.samplerate), input_file.samplerate)
                    output_file.write(processed)
        output_buffer.seek(0)
        app.logger.debug('=== End of File Processing ===')

        response = make_response(
            send_file(output_buffer, mimetype='audio/wav', as_attachment=True, download_name=f'{uuid()}.wav')
        )
        if app.debug is True:
            response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except PedalTypeError:
        app.logger.error('Pedal Type Error')
        return {'error': 'Pedal Type Error', 'message': 'Your pedalboard consists of unsupported pedal type.'}, 400
    except PedalParamError:
        app.logger.error('Pedal Param Error')
        return {'error': 'Pedal Parameter Error', 'message': 'Your pedals contain invalid parameter value(s).'}, 400


@app.errorhandler(HTTPException)
def handle_http_exception(e):
    app.logger.error(e)
    if e.code == 413:
        return {'error': 'Audio File Too Large', 'message': 'Your audio file exceeds the maximum file size limit.'}, 413
    else:
        return {'error': e.name, 'message': e.description}, e.code


@app.errorhandler(Exception)
def handle_exception(e):
    app.logger.error(e)
    return {'error': 'Unexpected Error', 'message': 'An unexpected error occurs during processing.'}, 400
