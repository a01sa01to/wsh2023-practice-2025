import { clsx } from 'clsx';
import type { FC, ReactNode } from 'react';

import styles from './ProductOfferLabel.module.css';

type Size = 'base' | 'lg';
type Props = {
  children: ReactNode;
  size: Size;
};

export const ProductOfferLabel: FC<Props> = ({ children, size }) => (
  <span
    className={clsx(styles.container, size === 'base' && styles.container__base, size === 'lg' && styles.container__lg)}
  >
    {children}
  </span>
);
