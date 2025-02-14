import { clsx } from 'clsx';
import type { FC } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { ProductCard } from '../ProductCard';
import { ArrowType, ProductListSlideButton } from '../ProductListSlideButton';

import styles from './ProductListSlider.module.css';
import { useSlider } from './hooks/useSlider';

type Props = {
  featureSection?: FeatureSectionFragmentResponse;
};

export const ProductListSlider: FC<Props> = ({ featureSection }) => {
  const products = featureSection?.items.map((item) => item.product);

  const { containerElementRef, setSlideIndex, slideIndex, visibleItemCount } = useSlider({
    items: products ?? [],
  });

  return (
    <div className={styles.container}>
      <div className={styles.slideButton}>
        <ProductListSlideButton
          arrowType={ArrowType.LEFT}
          disabled={slideIndex === 0}
          onClick={() => setSlideIndex(slideIndex - visibleItemCount)}
        />
      </div>
      <div className={styles.listWrapper}>
        <ul
          ref={containerElementRef}
          className={styles.list}
          style={{
            gridAutoColumns: `calc(100% / ${visibleItemCount})`,
            transform: `translateX(calc(${slideIndex} / ${visibleItemCount} * -100%))`,
          }}
        >
          {(products ?? []).map((product, index) => {
            const hidden = index < slideIndex || slideIndex + visibleItemCount <= index;
            return (
              <li key={product.id} className={clsx(styles.item, hidden && styles.item__hidden)}>
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.slideButton}>
        <ProductListSlideButton
          arrowType={ArrowType.RIGHT}
          disabled={slideIndex + visibleItemCount >= (products ?? []).length}
          onClick={() => setSlideIndex(slideIndex + visibleItemCount)}
        />
      </div>
    </div>
  );
};
