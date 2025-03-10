import type { FC } from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';

import styles from './NotFound.module.css';

export const NotFound: FC = () => {
  return (
    <>
      <Helmet>
        <title>ページが見つかりませんでした</title>
      </Helmet>
      <Layout>
        <div className={styles.container}>
          <div className={styles.inner}>
            <p className={styles.mainParagraph}>ページが存在しません</p>
            <p className={styles.subParagraph}>Not Found</p>
          </div>
        </div>
      </Layout>
    </>
  );
};
