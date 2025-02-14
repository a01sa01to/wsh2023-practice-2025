import { clsx } from "clsx"
import type { ComponentProps, FC } from 'react';

import styles from './Image.module.css';

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
      className={clsx(className, styles.container, fill && styles.container__fill)}
      decoding={decoding ?? "async"}
      loading={loading ?? "lazy"}
      src={`${filename}.webp`}
      {...rest}
    />
  );
};
