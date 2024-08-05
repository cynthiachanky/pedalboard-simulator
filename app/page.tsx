import React from 'react';
import Pedalboard from '@/components/Pedalboard';
import ConfigManager from '@/components/ConfigManager';
import FileUploader from '@/components/FileUploader';
import PedalConfigurator from '@/components/PedalConfigurator';

export default function IndexPage() {
  return (
    <div className={'min-h-[calc(100vh-65px-64px-36px)] grid md:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] gap-8'}>
      <Pedalboard />
      <div className={'space-y-8'}>
        <ConfigManager />
        <FileUploader />
        <PedalConfigurator />
      </div>
    </div>
  );
}
