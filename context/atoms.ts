import {atom} from 'jotai';
import config from '@/public/pedal-config.json';

export const DEFAULT_PEDAL_CONFIG: {[id: string]: {[param: string]: any}} = config.reduce(
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

const initialPedalboard: Pedal[] = Object.entries(DEFAULT_PEDAL_CONFIG).map(([id, params]) => ({id, ...params}));

export const pedalboardAtom = atom<Pedal[]>(initialPedalboard);
export const pedalIndexAtom = atom<number>(-1);
