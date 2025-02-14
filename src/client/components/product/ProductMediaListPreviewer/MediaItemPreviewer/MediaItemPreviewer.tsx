import { clsx } from 'clsx';
import type { FC } from 'react';

import type { MediaFileFragmentResponse } from '../../../../graphql/fragments';
import { getMediaType } from '../../../../utils/get_media_type';
import { DeviceType, GetDeviceType } from '../../../foundation/GetDeviceType';
import { Image } from '../../../foundation/Image';

import styles from './MediaItemPreiewer.module.css';

type Props = {
  file: MediaFileFragmentResponse;
};

export const MediaItemPreviewer: FC<Props> = ({ file }) => {
  const type = getMediaType(file.filename);

  return (
    <div className={styles.container}>
      {type === 'image' && <Image fill src={file.filename} />}
      {type === 'video' && (
        <GetDeviceType>
          {({ deviceType }) => (
            <video
              autoPlay
              controls
              muted
              playsInline
              className={clsx(styles.video, deviceType === DeviceType.MOBILE && styles.video__mobile, deviceType === DeviceType.DESKTOP && styles.video__desktop)}
              src={file.filename}
            />
          )}
        </GetDeviceType>
      )}
    </div>
  );
};
