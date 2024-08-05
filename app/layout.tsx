import React from 'react';
import './globals.css';
import {JetBrains_Mono} from 'next/font/google';
import {JotaiProvider} from '@/context/JotaiProvider';
import {DARK_MODE_CLASSNAME} from '@/lib/constants';
import Header from '@/components/Header';

const JetBrainsMono = JetBrains_Mono({subsets: ['latin']});

export const metadata = {
  title: 'Pedalboard Simulator',
  description: 'Create your custom pedalboard preset online'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang={'en'} className={DARK_MODE_CLASSNAME}>
      <body className={JetBrainsMono.className}>
        <JotaiProvider>
          <Header />
          <main className={'p-8'}>{children}</main>
        </JotaiProvider>
      </body>
    </html>
  );
}
