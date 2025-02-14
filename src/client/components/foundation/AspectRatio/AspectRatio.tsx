import type { FC, ReactNode } from 'react';

import styles from './AspectRatio.module.css';

type Props = {
  ratioWidth: number;
  ratioHeight: number;
  children: ReactNode;
};

export const AspectRatio: FC<Props> = ({ children, ratioHeight, ratioWidth }) => {
  return (
    <div className={styles.container} style={{ aspectRatio: `${ratioWidth}/${ratioHeight}` }}>
      {children}
    </div>
  );
};
