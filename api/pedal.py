from pedalboard import Chorus, Compressor, Delay, Distortion, Gain, Limiter, NoiseGate, Phaser, PitchShift, Reverb

config = {
    'chorus': {
        'name': 'Chorus',
        'plugin': Chorus,
        'params': {
            'rate_hz': {'id': 'rate', 'unit': 'Hz', 'type': 'number', 'min': 0, 'max': 100, 'default': 1.0},
            'depth': {'id': 'depth', 'type': 'number', 'min': 0, 'max': 1, 'default': 0.25},
            'centre_delay_ms': {'id': 'delay', 'unit': 'ms', 'type': 'number', 'min': 0, 'max': 1000, 'step': 1,
                                'default': 7},
            'feedback': {'id': 'feedback', 'type': 'number', 'min': 0, 'max': 1, 'default': 0.0},
            'mix': {'id': 'mix', 'type': 'number', 'min': 0, 'max': 1, 'default': 0.5}
        }
    },
    'compressor': {
        'name': 'Compressor',
        'plugin': Compressor,
        'params': {
            'threshold_db': {'id': 'threshold', 'unit': 'dB', 'type': 'number', 'min': -50, 'max': 0, 'default': 0},
            'ratio': {'id': 'ratio', 'type': 'number', 'min': 1, 'max': 30, 'default': 1},
            'attack_ms': {'id': 'attack', 'unit': 'ms', 'type': 'number', 'min': 0, 'max': 200, 'step': 1,
                          'default': 1},
            'release_ms': {'id': 'release', 'unit': 'ms', 'type': 'number', 'min': 0, 'max': 5000, 'step': 1,
                           'default': 100}
        }
    },
    'delay': {
        'name': 'Delay',
        'plugin': Delay,
        'params': {
            'delay_seconds': {'id': 'delay', 'unit': 'ms', 'type': 'number', 'min': 0, 'max': 30000, 'step': 1,
                              'default': 500, 'fx': (lambda x: x / 1000)},
            'feedback': {'id': 'feedback', 'type': 'number', 'min': 0, 'max': 1, 'default': 0.0},
            'mix': {'id': 'mix', 'type': 'number', 'min': 0, 'max': 1, 'default': 0.5}
        }
    },
    'distortion': {
        'name': 'Distortion',
        'plugin': Distortion,
        'params': {
            'drive_db': {'id': 'drive', 'unit': 'dB', 'type': 'number', 'min': 0, 'max': 50, 'default': 25}
        }
    },
    'gain': {
        'name': 'Gain',
        'plugin': Gain,
        'params': {
            'gain_db': {'id': 'gain', 'unit': 'dB', 'type': 'number', 'min': -96, 'max': 24, 'default': 1.0}
        }
    },
    'limiter': {
        'name': 'Limiter',
        'plugin': Limiter,
        'params': {
            'threshold_db': {'id': 'threshold', 'unit': 'dB', 'type': 'number', 'min': -20, 'max': 20,
                             'default': -10.0},
            'release_ms': {'id': 'release', 'unit': 'ms', 'type': 'number', 'min': 2, 'max': 2000, 'step': 1,
                           'default': 100}
        }
    },
    'noise_gate': {
        'name': 'Noise Gate',
        'plugin': NoiseGate,
        'params': {
            'threshold_db': {'id': 'threshold', 'unit': 'dB', 'type': 'number', 'min': -100, 'max': 0,
                             'default': -100.0},
            'ratio': {'id': 'ratio', 'type': 'number', 'min': 1, 'max': 30, 'default': 10},
            'attack_ms': {'id': 'attack', 'unit': 'ms', 'type': 'number', 'min': 0, 'max': 100, 'step': 1,
                          'default': 1},
            'release_ms': {'id': 'release', 'unit': 'ms', 'type': 'number', 'min': 0, 'max': 10000, 'step': 1,
                           'default': 100}
        }
    },
    'phaser': {
        'name': 'Phaser',
        'plugin': Phaser,
        'params': {
            'rate_hz': {'id': 'rate', 'unit': 'Hz', 'type': 'number', 'min': 0, 'max': 10, 'default': 1.0},
            'depth': {'id': 'depth', 'type': 'number', 'min': 0, 'max': 1, 'default': 0.5},
            'centre_frequency_hz': {'id': 'frequency', 'unit': 'Hz', 'type': 'number', 'min': 20, 'max': 20000,
                                    'step': 1, 'default': 1300},
            'feedback': {'id': 'feedback', 'type': 'number', 'min': 0, 'max': 1, 'default': 0.0},
            'mix': {'id': 'mix', 'type': 'number', 'min': 0, 'max': 1, 'default': 0.5}
        }
    },
    'pitch_shift': {
        'name': 'Pitch Shift',
        'plugin': PitchShift,
        'params': {
            'semitones': {'id': 'semitones', 'type': 'number', 'min': -12, 'max': 12, 'step': 1, 'default': 0}
        }
    },
    'reverb': {
        'name': 'Reverb',
        'plugin': Reverb,
        'params': {
            'room_size': {'id': 'size', 'type': 'number', 'min': 0, 'max': 1, 'default': 0.5},
            'damping': {'id': 'damping', 'type': 'number', 'min': 0, 'max': 1, 'default': 0.5},
            'wet_level': {'id': 'wet', 'type': 'number', 'min': 0, 'max': 1, 'default': 0.33},
            'dry_level': {'id': 'dry', 'type': 'number', 'min': 0, 'max': 1, 'default': 0.4},
            'width': {'id': 'width', 'type': 'number', 'min': 0, 'max': 1, 'default': 1.0},
            'freeze_mode': {'id': 'freeze', 'type': 'boolean', 'default': False,
                            'fx': (lambda x: 1 if x is True else 0)}
        }
    }
}
