'use client';

import React from 'react';
import config from '@/public/pedal-config.json';
import {useAtom, useSetAtom} from 'jotai';
import {pedalboardAtom, pedalIndexAtom} from '@/context/atoms';
import {Button} from '@/components/ui/button';

export default function Pedalboard() {
  const setPedalIndex = useSetAtom(pedalIndexAtom);
  const [pedalboard, setPedalboard] = useAtom(pedalboardAtom);

  return (
    <div className={'grid grid-cols-5 gap-4'}>
      {pedalboard.map(({id}: Pedal, index: number) => {
        const pedal = config.find((pedalConfig: PedalConfig) => pedalConfig.id === id);
        return (
          <Button key={id} variant={index % 2 === 0 ? 'default' : 'outline'} onClick={() => setPedalIndex(index)}>
            #{index + 1} {pedal.name}
          </Button>
        );
      })}
    </div>
  );
}
