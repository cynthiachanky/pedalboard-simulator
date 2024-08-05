'use client';

import React, {useCallback, useState} from 'react';
import {useAtomValue} from 'jotai';
import {pedalboardAtom} from '@/context/atoms';
import {MAX_FILE_SIZE} from '@/lib/constants';
import {processAudio} from '@/lib/fetchers';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {Music, Pause} from 'lucide-react';

export default function FileUploader() {
  const pedalboard = useAtomValue(pedalboardAtom);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode>();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const generateAudio = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      if (!(e.target instanceof HTMLFormElement)) return;
      e.preventDefault();
      const audioFile = e.target.audio.files[0];
      if (audioFile.size <= MAX_FILE_SIZE) {
        setIsGenerating(true);
        const data = await processAudio(pedalboard, audioFile);
        setError(undefined);

        const audioCtx = new AudioContext();
        const source = audioCtx.createBufferSource();
        source.buffer = await audioCtx.decodeAudioData(data);
        source.onended = () => setAudioSource(undefined);
        source.connect(audioCtx.destination);
        source.start();
        setAudioSource(source);
      } else setError('The selected audio file exceeds the maximum file size limit.');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const stopPlayingAudio = useCallback(() => {
    if (!audioSource) return;
    audioSource.stop();
    setAudioSource(undefined);
  }, [audioSource]);

  return (
    <form className={'card h-fit'} onSubmit={generateAudio}>
      <div className={'grid gap-1.5'}>
        <Label htmlFor={'audio'}>
          Audio{' '}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>?</TooltipTrigger>
              <TooltipContent>Upload any audio file up to 4MB in size.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Input
          id={'audio'}
          className={'max-w-sm cursor-pointer'}
          type={'file'}
          accept={'audio/*'}
          required
          onChange={() => setError(undefined)}
        />
        {error && <small className={'text-red-500'}>{error}</small>}
      </div>
      <Button type={'submit'} disabled={isGenerating}>
        {isGenerating ? (
          <>
            <Music className={'animate-bounce size-4 mr-2'} />
            Generating
          </>
        ) : (
          'Generate'
        )}
      </Button>
      {audioSource && (
        <Button variant={'destructive'} onClick={stopPlayingAudio}>
          <Pause className={'size-4 mr-2'} />
          Stop Playing
        </Button>
      )}
    </form>
  );
}
