import { clsx } from 'clsx';
import type { FC } from 'react';

import { Anchor } from '../Anchor';

import styles from './PrimaryAnchor.module.css';

type Size = 'base' | 'lg';
type Props = {
  size: Size;
  href: string;
  children: string;
};

export const PrimaryAnchor: FC<Props> = ({ children, href, size }) => (
  <Anchor href={href}>
    <span
      className={clsx(styles.inner, size === 'lg' && styles.container__lg, size === 'base' && styles.container__base)}
    >
      {children}
    </span>
  </Anchor>
);
