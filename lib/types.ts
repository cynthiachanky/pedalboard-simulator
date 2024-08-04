interface Pedal {
  id: string;

  [key: string]: any;
}

type ParamSlider = {
  id: string;
  unit?: string;
  type: 'number';
  min: number;
  max: number;
  step?: number;
  default: number;
};
type ParamCheckbox = {id: string; type: 'boolean'; default: boolean};
type ParamType = ParamSlider | ParamCheckbox;

interface PedalConfig {
  id: string;
  name: string;
  params: ParamType[];
}
