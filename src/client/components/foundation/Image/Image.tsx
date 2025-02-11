import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import * as styles from './Image.styles';

type Props = Omit<ComponentProps<'img'>, 'className'> & {
  fill?: boolean;
};

export const Image: FC<Props> = ({ decoding, fill, loading, ...rest }) => {
  return (
    <img
      className={classNames(styles.container(), {
        [styles.container__fill()]: fill === true,
      })}
      decoding={decoding ?? "async"}
      loading={loading ?? "lazy"}
      {...rest}
    />
  );
};
