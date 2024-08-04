import React from 'react';

export default function Header() {
  return (
    <header className={'sticky top-0 z-10 h-[57px] flex items-center gap-1 border-b px-4'}>
      <div className={'inline-flex items-center justify-center h-10 w-10'}>
        <svg
          className={'size-5 fill-foreground'}
          xmlns={'http://www.w3.org/2000/svg'}
          width={'24'}
          height={'24'}
          viewBox={'0 0 24 24'}
          fill={'none'}
          stroke={'currentColor'}
          strokeWidth={'2'}
          strokeLinecap={'round'}
          strokeLinejoin={'round'}
        >
          <path d={'M2 10v3'} />
          <path d={'M6 6v11'} />
          <path d={'M10 3v18'} />
          <path d={'M14 8v7'} />
          <path d={'M18 5v13'} />
          <path d={'M22 10v3'} />
        </svg>
      </div>
      <h1 className={'text-xl font-medium'}>Pedalboard Simulator</h1>
    </header>
  );
}
