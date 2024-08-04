'use client';

import React, {useState} from 'react';
import {useAtomValue} from 'jotai';
import {pedalboardAtom} from '@/context/atoms';
import {MAX_FILE_SIZE} from '@/lib/constants';
import {processAudio} from '@/lib/fetchers';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

export default function FileUploader() {
  const pedalboard = useAtomValue(pedalboardAtom);
  const [error, setError] = useState<string>();

  const generateAudio = async (e) => {
    try {
      e.preventDefault();
      const audioFile = e.target.audio.files[0];
      if (audioFile.size <= MAX_FILE_SIZE) {
        setError(undefined);
        const data = await processAudio(pedalboard, audioFile);

        const audioCtx = new AudioContext();
        const source = audioCtx.createBufferSource();
        source.buffer = await audioCtx.decodeAudioData(data);
        source.connect(audioCtx.destination);
        source.start();
      } else setError('The selected audio file exceeds the maximum file size limit.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className={'card h-fit'} onSubmit={generateAudio}>
      <div className={'grid gap-1.5'}>
        <Label htmlFor={'audio'}>Audio</Label>
        <Input id={'audio'} className={'max-w-sm cursor-pointer'} type={'file'} accept={'audio/*'} required />
        {error && <small className={'text-red-500'}>{error}</small>}
      </div>
      <Button type={'submit'}>Generate</Button>
    </form>
  );
}
