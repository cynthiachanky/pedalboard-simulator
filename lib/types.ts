interface Pedal {
  id: string;

  [key: string]: any;
}

type BaseParams<T = number | boolean> = {
  id: string;
  type: T extends number ? 'number' : T extends boolean ? 'boolean' : string;
  default: T;
};
type ParamSlider = BaseParams<number> & {unit?: string; min: number; max: number; step?: number};
type ParamCheckbox = BaseParams<boolean>;
type ParamType = ParamSlider | ParamCheckbox;

interface PedalConfig {
  id: string;
  name: string;
  params: ParamType[];
}
