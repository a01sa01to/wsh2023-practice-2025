import type { FC } from 'react';
import { memo } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { useFeature } from '../../../hooks/useFeatures';
import { ProductGridList } from '../ProductGridList';
import { ProductListSlider } from '../ProductListSlider';

type Props = {
  featureSection: Pick<FeatureSectionFragmentResponse, 'id' | 'title'>;
};

export const ProductList: FC<Props> = memo(({ featureSection }) => {
  const { feature } = useFeature(featureSection.id);

  return (
    <>
      <ProductListSlider featureSection={feature} />
      <ProductGridList featureSection={feature} />
    </>
  );
});

ProductList.displayName = 'ProductList';
