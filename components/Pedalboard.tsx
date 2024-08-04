'use client';

import React, {useEffect} from 'react';
import config from '@/public/pedal-config.json';
import {useAtom, useSetAtom} from 'jotai';
import {pedalboardAtom, pedalIndexAtom} from '@/context/atoms';
import {useDragAndDrop} from '@formkit/drag-and-drop/react';
import {Button} from '@/components/ui/button';
import AddPedalButton from '@/components/AddPedalButton';

export default function Pedalboard() {
  const setPedalIndex = useSetAtom(pedalIndexAtom);
  const [pedalboard, setPedalboard] = useAtom(pedalboardAtom);
  const [pedalboardRef, pedals, setPedals] = useDragAndDrop<HTMLUListElement, Pedal>(pedalboard, {
    handleEnd: ({targetData}) => {
      setPedalboard(targetData.parent.data.getValues(targetData.parent.el));
      setPedalIndex(-1);
    }
  });

  useEffect(() => setPedals(pedalboard), [pedalboard]);

  return (
    <div>
      <ul ref={pedalboardRef} className={'grid grid-cols-5 gap-4'}>
        {pedals.map(({id}: Pedal, index: number) => {
          const pedal = config.find((pedalConfig: PedalConfig) => pedalConfig.id === id);
          return (
            <li key={`#${index + 1}_${id}`} data-label={pedal.name}>
              <Button
                className={'w-full'}
                variant={index % 2 === 0 ? 'default' : 'outline'}
                onClick={() => setPedalIndex(index)}
              >
                #{index + 1} {pedal.name}
              </Button>
            </li>
          );
        })}
      </ul>
      <AddPedalButton />
    </div>
  );
}
