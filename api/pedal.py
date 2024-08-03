from pedalboard import Chorus, Compressor, Delay, Distortion, Gain, Limiter, NoiseGate, Phaser, PitchShift, Reverb

config = {
    'chorus': {
        'name': 'Chorus',
        'plugin': Chorus,
        'params': {
            'rate_hz': {'id': 'rate', 'unit': 'Hz', 'min': 0, 'max': 100, 'default': 1.0},
            'depth': {'id': 'depth', 'min': 0, 'max': 1, 'default': 0.25},
            'centre_delay_ms': {'id': 'delay', 'unit': 'ms', 'min': 0, 'max': 1000, 'step': 1, 'default': 7},
            'feedback': {'id': 'feedback', 'min': 0, 'max': 1, 'default': 0.0},
            'mix': {'id': 'mix', 'min': 0, 'max': 1, 'default': 0.5}
        }
    },
    'compressor': {
        'name': 'Compressor',
        'plugin': Compressor,
        'params': {
            'threshold_db': {'id': 'threshold', 'unit': 'dB', 'min': -50, 'max': 0, 'default': 0},
            'ratio': {'id': 'ratio', 'min': 1, 'max': 30, 'default': 1},
            'attack_ms': {'id': 'attack', 'unit': 'ms', 'min': 0, 'max': 200, 'step': 1, 'default': 1},
            'release_ms': {'id': 'release', 'unit': 'ms', 'min': 0, 'max': 5000, 'step': 1, 'default': 100}
        }
    },
    'delay': {
        'name': 'Delay',
        'plugin': Delay,
        'params': {
            'delay_seconds': {'id': 'delay', 'unit': 'ms', 'min': 0, 'max': 30000, 'step': 1, 'default': 500,
                              'fx': (lambda x: x / 1000)},
            'feedback': {'id': 'feedback', 'min': 0, 'max': 1, 'default': 0.0},
            'mix': {'id': 'mix', 'min': 0, 'max': 1, 'default': 0.5}
        }
    },
    'distortion': {
        'name': 'Distortion',
        'plugin': Distortion,
        'params': {
            'drive_db': {'id': 'drive', 'unit': 'dB', 'min': 0, 'max': 50, 'default': 25}
        }
    },
    'gain': {
        'name': 'Gain',
        'plugin': Gain,
        'params': {
            'gain_db': {'id': 'gain', 'unit': 'dB', 'min': -96, 'max': 24, 'default': 1.0}
        }
    },
    'limiter': {
        'name': 'Limiter',
        'plugin': Limiter,
        'params': {
            'threshold_db': {'id': 'threshold', 'unit': 'dB', 'min': -20, 'max': 20, 'default': -10.0},
            'release_ms': {'id': 'release', 'unit': 'ms', 'min': 2, 'max': 2000, 'step': 1, 'default': 100}
        }
    },
    'noise_gate': {
        'name': 'Noise Gate',
        'plugin': NoiseGate,
        'params': {
            'threshold_db': {'id': 'threshold', 'unit': 'dB', 'min': -100, 'max': 0, 'default': -100.0},
            'ratio': {'id': 'ratio', 'min': 1, 'max': 30, 'default': 10},
            'attack_ms': {'id': 'attack', 'unit': 'ms', 'min': 0, 'max': 100, 'step': 1, 'default': 1},
            'release_ms': {'id': 'release', 'unit': 'ms', 'min': 0, 'max': 10000, 'step': 1, 'default': 100}
        }
    },
    'phaser': {
        'name': 'Phaser',
        'plugin': Phaser,
        'params': {
            'rate_hz': {'id': 'rate', 'unit': 'Hz', 'min': 0, 'max': 10, 'default': 1.0},
            'depth': {'id': 'depth', 'min': 0, 'max': 1, 'default': 0.5},
            'centre_frequency_hz': {'id': 'frequency', 'unit': 'Hz', 'min': 20, 'max': 20000, 'step': 1,
                                    'default': 1300},
            'feedback': {'id': 'feedback', 'min': 0, 'max': 1, 'default': 0.0},
            'mix': {'id': 'mix', 'min': 0, 'max': 1, 'default': 0.5}
        }
    },
    'pitch_shift': {
        'name': 'Pitch Shift',
        'plugin': PitchShift,
        'params': {
            'semitones': {'id': 'semitones', 'min': -12, 'max': 12, 'step': 1, 'default': 0}
        }
    },
    'reverb': {
        'name': 'Reverb',
        'plugin': Reverb,
        'params': {
            'room_size': {'id': 'size', 'min': 0, 'max': 1, 'default': 0.5},
            'damping': {'id': 'damping', 'min': 0, 'max': 1, 'default': 0.5},
            'wet_level': {'id': 'wet', 'min': 0, 'max': 1, 'default': 0.33},
            'dry_level': {'id': 'dry', 'min': 0, 'max': 1, 'default': 0.4},
            'width': {'id': 'width', 'min': 0, 'max': 1, 'default': 1.0},
            'freeze_mode': {'id': 'freeze', 'type': 'boolean', 'default': False,
                            'fx': (lambda x: 1 if x is True else 0)}
        }
    }
}
