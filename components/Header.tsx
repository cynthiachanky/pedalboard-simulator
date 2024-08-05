import React from 'react';
import {AudioLines} from 'lucide-react';
import ThemeButton from '@/components/ThemeButton';

export default function Header() {
  return (
    <header className={'sticky top-0 z-10 h-[65px] bg-background flex items-center gap-1 border-b px-8'}>
      <div className={'inline-flex items-center justify-center h-10 w-10'}>
        <AudioLines className={'size-5 fill-foreground'} />
      </div>
      <h1 className={'text-xl font-medium'}>Pedalboard Simulator</h1>
      <ThemeButton />
    </header>
  );
}
