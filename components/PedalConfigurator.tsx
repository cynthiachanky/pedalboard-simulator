'use client';

import React, {useCallback, useEffect, useState} from 'react';
import config from '@/public/pedal-config.json';
import {useAtom, useAtomValue} from 'jotai';
import {pedalboardAtom, pedalIndexAtom} from '@/context/atoms';
import {Label} from '@/components/ui/label';
import {Slider} from '@/components/ui/slider';
import {Checkbox} from '@/components/ui/checkbox';

export default function PedalConfigurator() {
  const pedalIndex = useAtomValue(pedalIndexAtom);
  const [pedalboard, setPedalboard] = useAtom(pedalboardAtom);
  const [pedalConfig, setPedalConfig] = useState<PedalConfig>();

  useEffect(() => {
    const pedalConfig: PedalConfig =
      pedalIndex >= 0 && pedalIndex < pedalboard.length
        ? config.find((pedalConfig: PedalConfig) => pedalConfig.id === pedalboard[pedalIndex].id)
        : undefined;
    setPedalConfig(pedalConfig);
  }, [pedalIndex, pedalboard.length]);

  const updatePedalboard = useCallback(
    (param: string, value: any) => {
      setPedalboard((board) => [
        ...board.slice(0, pedalIndex),
        {
          ...board[pedalIndex],
          [param]: value
        },
        ...board.slice(pedalIndex + 1, board.length)
      ]);
    },
    [pedalIndex]
  );

  const generateInputElement = useCallback(
    (pedal: Pedal, param: ParamType) => {
      switch (param.type) {
        case 'number':
          return (
            <div key={param.id} className={'space-y-2'}>
              <Label className={'capitalize'} htmlFor={param.id}>
                {param.id}
              </Label>
              <Slider
                value={[pedal[param.id]]}
                onValueChange={([value]) => updatePedalboard(param.id, value)}
                max={param.max}
                min={param.min}
                step={param.step ?? 0.01}
              />
              <Label className={'float-right'}>
                {pedal[param.id]}
                {param.unit}
              </Label>
            </div>
          );
        case 'boolean':
          return (
            <div key={param.id} className={'flex items-center space-x-2'}>
              <Checkbox
                id={param.id}
                checked={pedal[param.id]}
                onCheckedChange={(value) => updatePedalboard(param.id, value)}
              />
              <Label className={'capitalize cursor-pointer'} htmlFor={param.id}>
                {param.id}
              </Label>
            </div>
          );
        default:
          return <p>Unsupported parameter type</p>;
      }
    },
    [updatePedalboard]
  );

  return (
    <form className={'card h-fit'}>
      {pedalConfig ? (
        <fieldset className={'grid rounded-lg border p-4'}>
          <legend className={'-ml-1 px-1 text-sm font-medium'}>{pedalConfig.name}</legend>
          {pedalConfig.params.map((param) => generateInputElement(pedalboard[pedalIndex], param))}
        </fieldset>
      ) : (
        <p>Select a pedal to configure.</p>
      )}
    </form>
  );
}
