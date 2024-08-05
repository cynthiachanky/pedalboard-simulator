'use client';

import React, {useCallback, useEffect} from 'react';
import {useAtom} from 'jotai';
import {themeAtom} from '@/context/atoms';
import {DARK_MODE_CLASSNAME, THEME, THEME_STORAGE_KEY} from '@/lib/constants';
import {Moon, Sun} from 'lucide-react';
import {Button} from '@/components/ui/button';

export default function ThemeButton() {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let storageTheme: (typeof THEME)[keyof typeof THEME];
    try {
      storageTheme = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY));
    } catch (err) {
      // ignore JSON.parse error
    }

    if (
      storageTheme === THEME.LIGHT ||
      (!(THEME_STORAGE_KEY in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)
    ) {
      document.documentElement.classList.remove(DARK_MODE_CLASSNAME);
      setTheme(THEME.LIGHT);
    } else {
      // document.documentElement.classList.add(DARK_MODE_CLASSNAME);
      setTheme(THEME.DARK);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.toggle(DARK_MODE_CLASSNAME);
    setTheme((theme) => {
      switch (theme) {
        case THEME.LIGHT:
          return THEME.DARK;
        case THEME.DARK:
          return THEME.LIGHT;
        default:
          return THEME.DARK;
      }
    });
  }, []);

  return (
    <Button className={'rounded-full ml-auto'} variant={'ghost'} size={'icon'} onClick={toggleTheme}>
      {theme === THEME.LIGHT ? (
        <Sun className={'size-4 fill-foreground'} />
      ) : (
        <Moon className={'size-4 fill-foreground'} />
      )}
    </Button>
  );
}
