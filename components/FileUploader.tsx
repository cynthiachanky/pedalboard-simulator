'use client';

import React from 'react';
import {processAudio} from '@/lib/fetchers';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

export default function FileUploader({pedalboard}: {pedalboard: Pedal[]}) {
  const generateAudio = async (e) => {
    try {
      e.preventDefault();
      const data = await processAudio(pedalboard, e.target.audio.files[0]);

      const audioCtx = new AudioContext();
      const source = audioCtx.createBufferSource();
      source.buffer = await audioCtx.decodeAudioData(data);
      source.connect(audioCtx.destination);
      source.start();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form className={'card h-fit'} onSubmit={generateAudio}>
      <div className={'grid gap-1.5'}>
        <Label htmlFor={'audio'}>Audio</Label>
        <Input id={'audio'} className={'max-w-sm'} type={'file'} required />
      </div>
      <Button type={'submit'}>Generate</Button>
    </form>
  );
}
