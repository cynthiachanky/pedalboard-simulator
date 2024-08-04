'use client';

import {PropsWithChildren} from 'react';
import {Provider} from 'jotai';

export const JotaiProvider = ({children}: PropsWithChildren<unknown>) => <Provider>{children}</Provider>;
