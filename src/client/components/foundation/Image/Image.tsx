import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import * as styles from './Image.styles';

type Props = ComponentProps<'img'> & {
  fill?: boolean;
};

export const Image: FC<Props> = ({ className, decoding, fill, loading, src, ...rest }) => {
  if (src?.startsWith("data:")) {
    return <img src={src} {...rest} />;
  }

  const [filename, ext] = src?.split('.') ?? [];

  if (ext === "svg") {
    return <img src={src} {...rest} />;
  }

  return (
    <img
      className={classNames((className ?? ''), styles.container(), {
        [styles.container__fill()]: fill === true,
      })}
      decoding={decoding ?? "async"}
      loading={loading ?? "lazy"}
      src={`${filename}.webp`}
      {...rest}
    />
  );
};
