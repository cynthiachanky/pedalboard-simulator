# This file is used to check the maximum and minimum values of each parameter accepted by the plugin.
# The actual boundaries are defined with reference to the default plugins in Logic Pro.

from sys import float_info
from pedal import config as pedal_config

if __name__ == '__main__':
    for pedal in pedal_config.values():
        print(f'=== {pedal["name"]} ===')
        plugin = pedal['plugin']
        default_args = {}
        for param, config in pedal['params'].items():
            default_args[param] = config['fx'](config['default']) if 'fx' in config else config['default']
        print(f'{default_args}\n')

        for param in pedal['params']:
            print(f'> Test {param} for {pedal["name"]}')
            for value in [float_info.min, float_info.max]:
                args = default_args.copy()
                args[param] = value
                print(f'>> {args}')
                try:
                    plugin(**args)
                except Exception as e:
                    print(e)
            print('\n')

        print('\n')
