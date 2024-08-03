from json import dumps as stringify
from api.pedal import config as pedal_config

if __name__ == '__main__':
    config = []
    for pedal in pedal_config:
        params = []
        for param in pedal_config[pedal]['params'].values():
            param_config = param.copy()
            param_config.pop('fx', None)
            params.append(param_config)
        config.append({'id': pedal, 'name': pedal_config[pedal]['name'], 'params': params})

    with open('public/pedal-config.json', 'w') as f:
        f.write(stringify(config))
