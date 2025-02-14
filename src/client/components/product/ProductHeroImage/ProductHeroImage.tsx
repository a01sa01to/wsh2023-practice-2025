import { clsx } from 'clsx';
import { memo } from 'react';
import type { FC } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { Anchor } from '../../foundation/Anchor';
import { AspectRatio } from '../../foundation/AspectRatio';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { Image } from '../../foundation/Image';
import { WidthRestriction } from '../../foundation/WidthRestriction';

import styles from './ProductHeroImage.module.css';

type Props = {
  product?: Pick<ProductFragmentResponse, 'id' | 'name' | 'media'>;
  title: string;
};

export const ProductHeroImage: FC<Props> = memo(({ product, title }) => {
  const thumbnailFile = product?.media.find((productMedia) => productMedia.isThumbnail)?.file;

  return (
    <GetDeviceType>
      {({ deviceType }) => {
        return (
          <WidthRestriction>
            <Anchor href={product ? `/product/${product.id}` : '#'}>
              <div className={styles.container}>
                <AspectRatio ratioHeight={9} ratioWidth={16}>
                  {thumbnailFile && (
                    <Image className={styles.image} decoding="sync" loading="eager" src={thumbnailFile.filename} />
                  )}
                </AspectRatio>

                <div className={styles.overlay}>
                  <p
                    className={clsx(
                      styles.title,
                      deviceType === DeviceType.DESKTOP && styles.title__desktop,
                      deviceType === DeviceType.MOBILE && styles.title__mobile,
                    )}
                  >
                    {title}
                  </p>
                  <p
                    className={clsx(
                      styles.description,
                      deviceType === DeviceType.DESKTOP && styles.description__desktop,
                      deviceType === DeviceType.MOBILE && styles.description__mobile,
                    )}
                  >
                    {product ? product.name : ''}
                  </p>
                </div>
              </div>
            </Anchor>
          </WidthRestriction>
        );
      }}
    </GetDeviceType>
  );
});

ProductHeroImage.displayName = 'ProductHeroImage';
