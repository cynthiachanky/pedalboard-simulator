'use client';

import React, {useCallback} from 'react';
import config from '@/public/pedal-config.json';
import {useAtom, useSetAtom} from 'jotai';
import {DEFAULT_PEDAL_CONFIG, pedalboardAtom, pedalIndexAtom} from '@/context/atoms';
import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';

export default function AddPedalButton() {
  const setPedalIndex = useSetAtom(pedalIndexAtom);
  const [pedalboard, setPedalboard] = useAtom(pedalboardAtom);

  const addPedal = useCallback(
    (pedalId: string) => {
      const nextIndex = pedalboard.length;
      setPedalboard((pedalboard) => pedalboard.concat([{id: pedalId, ...DEFAULT_PEDAL_CONFIG[pedalId]}]));
      setPedalIndex(nextIndex);
    },
    [pedalboard.length]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={'mt-8 col-span-5'}>Add Pedal</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'w-56'}>
        {config.map(({id, name}: PedalConfig) => (
          <DropdownMenuItem key={id} onSelect={() => addPedal(id)}>
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
