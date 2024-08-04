'use client';

import React, {useEffect} from 'react';
import {useAtom, useSetAtom} from 'jotai';
import {pedalboardAtom, pedalIndexAtom} from '@/context/atoms';
import {PEDAL_CONFIG} from '@/lib/constants';
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
    <div className={'card'}>
      {pedals.length === 0 && (
        <h3 className={'text-lg font-semibold'}>
          Experiment with different effects, save your configurations, and generate processed audio files effortlessly.
        </h3>
      )}
      <ul ref={pedalboardRef} className={'grid grid-cols-5 gap-4'}>
        {pedals.map(({id}: Pedal, index: number) => {
          const pedal = PEDAL_CONFIG.find((pedalConfig) => pedalConfig.id === id);
          return (
            pedal && (
              <li key={`#${index + 1}_${id}`} data-label={pedal.name}>
                <Button
                  className={'w-full'}
                  variant={index % 2 === 0 ? 'default' : 'outline'}
                  onClick={() => setPedalIndex(index)}
                >
                  #{index + 1} {pedal.name}
                </Button>
              </li>
            )
          );
        })}
      </ul>
      <AddPedalButton />
    </div>
  );
}
