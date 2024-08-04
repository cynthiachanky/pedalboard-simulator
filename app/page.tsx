import React from 'react';
import Pedalboard from '@/components/Pedalboard';
import FileUploader from '@/components/FileUploader';
import PedalConfigurator from '@/components/PedalConfigurator';

export default function IndexPage() {
  return (
    <main className={'h-[calc(100vh-65px)] p-8 grid grid-cols-[3fr_1fr] gap-8'}>
      <Pedalboard />
      <div className={'space-y-8'}>
        <FileUploader />
        <PedalConfigurator />
      </div>
    </main>
  );
}
