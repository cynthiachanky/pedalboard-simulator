import React from 'react';
import config from '../public/pedal-config.json';
import FileUploader from '@/components/FileUploader';
import PedalConfigurator from '@/components/PedalConfigurator';

export default function IndexPage() {
  return (
    <main className={'h-[calc(100vh-65px)] p-8 grid grid-cols-[3fr_1fr] gap-8'}>
      <div className={'overflow-y-auto card'}>
        <ol className={'space-y-4'}>
          {config.map(({id: pid, name, params}: PedalConfig) => (
            <li key={pid} className={'font-bold'}>
              {name}
              <ul className={'font-normal mt-2 space-y-2'}>
                {params.map(({id, ...data}) => (
                  <li key={`${pid}_${id}`}>
                    <p className={'capitalize'}>{id}</p>
                    <p>{JSON.stringify(data)}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
      <div className={'grid gap-8'}>
        <FileUploader />
        <PedalConfigurator />
      </div>
    </main>
  );
}
