import { clsx } from 'clsx';
import type { FC } from 'react';

import { Icon } from '../../foundation/Icon';

import styles from './ProductListSlideButton.module.css';

export const ArrowType = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;
export type ArrowType = typeof ArrowType[keyof typeof ArrowType];

type Props = {
  arrowType: ArrowType;
  disabled: boolean;
  onClick: () => void;
};

export const ProductListSlideButton: FC<Props> = ({ arrowType, disabled, onClick }) => {
  return (
    <button
      className={clsx(styles.container, disabled && styles.container__disabled)}
      disabled={disabled}
      onClick={onClick}
    >
      {arrowType === ArrowType.LEFT ? (
        <Icon color="#222222" height={16} type="FaArrowLeft" width={16} />
      ) : (
        <Icon color="#222222" height={16} type="FaArrowRight" width={16} />
      )}
    </button>
  );
};
