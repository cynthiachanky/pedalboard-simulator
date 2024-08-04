interface Pedal {
  id: string;

  [key: string]: any;
}

type ParamSlider = {id: string; unit?: string; min: number; max: number; step?: number; default: number};
type ParamCheckbox = {id: string; type: 'boolean'; default: boolean};

interface PedalConfig {
  id: string;
  name: string;
  params: (ParamSlider | ParamCheckbox)[];
}
