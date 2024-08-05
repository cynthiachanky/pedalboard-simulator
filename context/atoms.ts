import {atom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';
import {THEME, THEME_STORAGE_KEY} from '@/lib/constants';

export const themeAtom = atomWithStorage<(typeof THEME)[keyof typeof THEME]>(THEME_STORAGE_KEY, THEME.DARK);

export const pedalboardAtom = atom<Pedal[]>([]);
export const pedalIndexAtom = atom<number>(-1);
