import type { FC, ReactNode } from 'react';

import styles from './WidthRestriction.module.css';

type Props = {
  children: ReactNode;
};

export const WidthRestriction: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {children}
      </div>
    </div>
  );
};
