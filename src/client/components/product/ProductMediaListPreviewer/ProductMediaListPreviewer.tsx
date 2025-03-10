import { clsx } from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { AspectRatio } from '../../foundation/AspectRatio';

import { MediaItem } from './MediaItem';
import { MediaItemPreviewer } from './MediaItemPreviewer';
import styles from './ProductMediaListPreviewer.module.css';

type Props = {
  product: ProductFragmentResponse | undefined;
};

export const ProductMediaListPreviewer: FC<Props> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className={styles.container}>
      <AspectRatio ratioHeight={9} ratioWidth={16}>
        <MediaItemPreviewer file={product?.media[activeIndex].file} />
      </AspectRatio>
      <div className={styles.itemListWrapper}>
        <ul className={styles.itemList}>
          {/* 高さを変えないためにあらかじめ 1 要素入れとく */}
          {!product && <li className={styles.item} />}
          {(product?.media ?? []).map((media, index) => {
            const disabled = index === activeIndex;

            return (
              <li key={media.id} className={styles.item}>
                <AspectRatio ratioHeight={1} ratioWidth={1}>
                  <button
                    className={clsx(styles.itemSelectButton, disabled && styles.itemSelectButton__disabled)}
                    disabled={disabled}
                    onClick={() => setActiveIndex(index)}
                  >
                    <MediaItem file={media.file} />
                  </button>
                </AspectRatio>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
