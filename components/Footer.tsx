import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={'md:flex items-center justify-center text-center px-8 pb-4'}>
      <p className={'text-sm text-muted-foreground'}>© 2024 Cynthia Chan</p>
      <div className={'text-sm mt-2 md:mt-0 md:ml-16 space-x-6'}>
        <Link className={'underline-offset-4 hover:underline'} href={'/'}>
          Home
        </Link>
        <Link className={'underline-offset-4 hover:underline'} href={'/about'}>
          About
        </Link>
      </div>
    </footer>
  );
}
