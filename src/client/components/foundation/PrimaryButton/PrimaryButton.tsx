import { clsx } from 'clsx';
import type { ComponentProps, FC } from 'react';

import styles from './PrimaryButton.module.css';

type Size = 'sm' | 'base' | 'lg';
type Props = Omit<ComponentProps<'button'>, 'className'> & {
  size: Size;
};

export const PrimaryButton: FC<Props> = ({ children, size, ...rest }) => {
  return (
    <button
      className={clsx(
        styles.container,
        size === 'base' && styles.container__base,
        size === 'lg' && styles.container__lg,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
