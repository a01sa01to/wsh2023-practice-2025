import type { FC } from 'react';

import { useAuthUser } from '../../../hooks/useAuthUser';
import { useOpenModal } from '../../../store/modal';
import { Anchor } from '../../foundation/Anchor';
import { Icon } from '../../foundation/Icon';
import { Image } from '../../foundation/Image';

import styles from './Header.module.css';

export const Header: FC = () => {
  const { isAuthUser } = useAuthUser();
  const handleOpenModal = useOpenModal();

  return (
    <header className={styles.container}>
      <Anchor href="/">
        <div className={styles.logo}>
          <Image height={32} src="/icons/logo.svg" width={205} />
        </div>
      </Anchor>
      {isAuthUser ? (
        <Anchor data-testid="navigate-order" href={'/order'}>
          <div className={styles.orderLink}>
            <Icon color="#222222" height={20} type="FaShoppingCart" width={20} />
          </div>
        </Anchor>
      ) : (
        <button
          className={styles.signInButton}
          data-testid="navigate-signin"
          onClick={() => handleOpenModal('SIGN_IN')}
        >
          <Icon color="#222222" height={20} type="FaUser" width={20} />
        </button>
      )}
    </header>
  );
};
