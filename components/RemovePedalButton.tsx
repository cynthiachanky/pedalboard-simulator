'use client';

import React, {useCallback} from 'react';
import {useAtom, useSetAtom} from 'jotai';
import {pedalboardAtom, pedalIndexAtom} from '@/context/atoms';
import {Button} from '@/components/ui/button';

export default function RemovePedalButton() {
  const [pedalIndex, setPedalIndex] = useAtom(pedalIndexAtom);
  const setPedalboard = useSetAtom(pedalboardAtom);

  const removePedal = useCallback(() => {
    setPedalboard((pedalboard) => pedalboard.filter((pedal, index) => index !== pedalIndex));
    setPedalIndex(-1);
  }, [pedalIndex]);

  return (
    <Button className={'mt-4 w-full'} variant={'destructive'} onClick={removePedal}>
      Remove Pedal
    </Button>
  );
}
