import config from '@/public/pedal-config.json';

export const PEDAL_CONFIG = config as PedalConfig[];

export const DEFAULT_PEDAL_CONFIG: {[id: string]: {[param: string]: any}} = PEDAL_CONFIG.reduce(
  (accu, pedalConfig: PedalConfig) => ({
    ...accu,
    [pedalConfig.id]: pedalConfig.params.reduce(
      (defaultParams, curr) => ({
        ...defaultParams,
        [curr.id]: curr.default
      }),
      {}
    )
  }),
  {}
);

export const MAX_PEDAL_COUNT = 32;
export const MAX_FILE_SIZE = 1024 * 1024 * 4; // 4MB

export const THEME_STORAGE_KEY = 'theme';
export const DARK_MODE_CLASSNAME = 'dark';
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;
