import { Provider as JotaiProvider } from 'jotai';
import type { FC, ReactNode } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { Provider as UrqlProvider } from 'urql';

import { Fallback } from '../../../pages/Fallback';
import { client } from '../../../utils/apollo_client';

type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => (
  <UrqlProvider value={client}>
    <BrowserRouter>
      <JotaiProvider>
        <ErrorBoundary fallbackRender={Fallback}>
          <Suspense fallback={null}>{children}</Suspense>
        </ErrorBoundary>
      </JotaiProvider>
    </BrowserRouter>
  </UrqlProvider>
);
