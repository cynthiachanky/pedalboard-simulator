import {atom} from 'jotai';

export const pedalboardAtom = atom<Pedal[]>([]);
export const pedalIndexAtom = atom<number>(-1);
