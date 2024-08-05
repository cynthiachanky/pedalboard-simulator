'use client';

import React, {useCallback, useRef, useState} from 'react';
import {useAtom} from 'jotai';
import {pedalboardAtom} from '@/context/atoms';
import {MAX_PEDAL_COUNT, PEDAL_CONFIG} from '@/lib/constants';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';

const parseConfig = async (configFile: File): Promise<Pedal[]> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const data: Pedal[] = e.target && typeof e.target.result === 'string' ? JSON.parse(e.target.result) : undefined;
        if (data.length > MAX_PEDAL_COUNT) reject(new Error('Your pedalboard exceeds the maximum pedal limit.'));

        data.forEach(({id, ...params}) => {
          // validate pedal type
          const config = PEDAL_CONFIG.find((pedal) => pedal.id === id);
          if (!config) reject(new Error('Your pedalboard consists of unsupported pedal type.'));

          // validate parameter value
          config?.params.forEach((param) => {
            switch (param.type) {
              case 'number':
                if (
                  params[param.id] < param.min ||
                  params[param.id] > param.max ||
                  (param.step && params[param.id] % param.step !== 0)
                )
                  reject(new Error('Your pedals contain invalid parameter value(s).'));
                break;
              case 'boolean':
                if (![true, false].includes(params[param.id]))
                  reject(new Error('Your pedals contain invalid parameter value(s).'));
                break;
            }
          });
        });
        resolve(data);
      } catch (err) {
        reject(new Error('Your pedalboard is broken or formatted incorrectly.'));
      }
    };
    fileReader.onerror = (err) => reject(err);
    fileReader.readAsText(configFile);
  });

export default function ConfigManager() {
  const presetRef = useRef<HTMLAnchorElement>(null);
  const [pedalboard, setPedalboard] = useAtom(pedalboardAtom);
  const [error, setError] = useState<string>();

  const importConfig = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!(e.target instanceof HTMLInputElement)) return;
      e.preventDefault();

      if (!e.target.files?.[0]) return;
      const data = await parseConfig(e.target.files[0]);
      setPedalboard(data);
      setError(undefined);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      e.target.form?.reset();
    }
  }, []);

  const exportConfig = useCallback(
    (e: React.FormEvent<HTMLFormElement>, preset: Pedal[]) => {
      if (!presetRef.current) return;

      try {
        if (!(e.target instanceof HTMLFormElement)) return;
        e.preventDefault();

        presetRef.current.href = URL.createObjectURL(new Blob([JSON.stringify(preset)], {type: 'application/json'}));
        presetRef.current.download = 'pedalboard.json';
        presetRef.current.click();
        setError(undefined);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        presetRef.current.href = '';
        presetRef.current.download = '';
      }
    },
    [presetRef.current]
  );

  return (
    <>
      <form className={'card h-fit'} onSubmit={(e) => exportConfig(e, pedalboard)}>
        <div className={'grid gap-1.5'}>
          <Label htmlFor={'config'}>
            Preset{' '}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>?</TooltipTrigger>
                <TooltipContent>Import any preset previously downloaded!</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id={'config'}
            className={'max-w-sm cursor-pointer'}
            type={'file'}
            accept={'.json'}
            onChange={importConfig}
          />
          {error && <small className={'text-red-500'}>{error}</small>}
        </div>
        <Button type={'submit'}>Export</Button>
      </form>
      <a ref={presetRef} />
    </>
  );
}
