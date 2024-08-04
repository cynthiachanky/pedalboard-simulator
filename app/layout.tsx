import React from 'react';
import './globals.css';
import {JetBrains_Mono} from 'next/font/google';
import Header from '@/components/Header';

const JetBrainsMono = JetBrains_Mono({subsets: ['latin']});

export const metadata = {
  title: 'Pedalboard Simulator',
  description: 'Create your custom pedalboard preset online'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang={'en'} className={'dark'}>
      <body className={JetBrainsMono.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
