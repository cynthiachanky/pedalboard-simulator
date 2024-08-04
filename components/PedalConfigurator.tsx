'use client';

import React, {useCallback, useEffect, useState} from 'react';
import config from '../public/pedal-config.json';
import {Label} from '@/components/ui/label';
import {Slider} from '@/components/ui/slider';
import {Checkbox} from '@/components/ui/checkbox';

export default function PedalConfigurator({pedal}: {pedal?: Pedal}) {
  const [pedalConfig, setPedalConfig] = useState<PedalConfig>();

  useEffect(() => {
    const pedalConfig: PedalConfig = pedal
      ? config.find((pedalConfig: PedalConfig) => pedalConfig.id === pedal.id)
      : undefined;
    setPedalConfig(pedalConfig);
  }, [pedal?.id]);

  const generateInputElement = useCallback((pedal: Pedal, param: ParamType) => {
    switch (param.type) {
      case 'number':
        return (
          <div key={param.id} className={'space-y-2'}>
            <Label className={'capitalize'} htmlFor={param.id}>
              {param.id}
            </Label>
            <Slider value={[pedal[param.id]]} max={param.max} min={param.min} step={param.step ?? 0.01} />
            <Label className={'float-right'}>
              {pedal[param.id]}
              {param.unit}
            </Label>
          </div>
        );
      case 'boolean':
        return (
          <div key={param.id} className={'flex items-center space-x-2'}>
            <Checkbox id={param.id} checked={pedal[param.id]} />
            <Label className={'capitalize'} htmlFor={param.id}>
              {param.id}
            </Label>
          </div>
        );
      default:
        return <p>Unsupported parameter type</p>;
    }
  }, []);

  return (
    <form className={'card h-fit'}>
      {pedal && pedalConfig ? (
        <fieldset className={'grid rounded-lg border p-4'}>
          <legend className={'-ml-1 px-1 text-sm font-medium'}>{pedalConfig.name}</legend>
          {pedalConfig.params.map((param) => generateInputElement(pedal, param))}
        </fieldset>
      ) : (
        <p>Select a pedal to configure.</p>
      )}
    </form>
  );
}
