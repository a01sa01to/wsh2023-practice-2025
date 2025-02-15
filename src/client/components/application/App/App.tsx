import type { FC } from 'react';
import { Helmet } from 'react-helmet';

import { SignInModal } from '../../modal/SignInModal';
import { SignUpModal } from '../../modal/SignUpModal';
import { Providers } from '../Providers';
import { Routes } from '../Routes';

import resetStyle from 'modern-css-reset/src/reset.css?raw';
import rootStyle from './root.css?raw';

export const App: FC = () => (
  <Providers>
    <Helmet>
      <style>{resetStyle}</style>
      <style>{rootStyle}</style>
    </Helmet>
    <Routes />
    <SignInModal />
    <SignUpModal />
  </Providers>
);
