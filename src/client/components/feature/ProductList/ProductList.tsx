import type { FC } from 'react';
import { memo } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { useFeature } from '../../../hooks/useFeatures';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { ProductGridList } from '../ProductGridList';
import { ProductListSlider } from '../ProductListSlider';

type Props = {
  featureSection: Pick<FeatureSectionFragmentResponse, "id" | "title">;
};

export const ProductList: FC<Props> = memo(({ featureSection }) => {
  const { feature } = useFeature(featureSection.id);

  return (
    <GetDeviceType>
      {({ deviceType }) => {
        switch (deviceType) {
          case DeviceType.DESKTOP: {
            return <ProductListSlider featureSection={feature} />;
          }
          case DeviceType.MOBILE: {
            return <ProductGridList featureSection={feature} />;
          }
        }
      }}
    </GetDeviceType>
  );
});

ProductList.displayName = 'ProductList';
