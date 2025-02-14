import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Image } from '../../foundation/Image';

import styles from './Footer.module.css';

const FOOTER_LINK_ITEMS = ['利用規約', 'お問い合わせ', 'Q&A', '運営会社', 'オーガニックとは'] as const;

export const Footer: FC = () => {
  return (
    <footer className={styles.container}>
      <ul
        className={styles.itemList}
      >
        {FOOTER_LINK_ITEMS.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
      <NavLink to="/">
        <Image src="/icons/logo.svg" />
      </NavLink>
    </footer>
  );
};
