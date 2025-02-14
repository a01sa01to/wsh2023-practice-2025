import { clsx } from 'clsx';
import type { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { Layout } from '../../components/application/Layout';
import { AspectRatio } from '../../components/foundation/AspectRatio';
import { DeviceType, GetDeviceType } from '../../components/foundation/GetDeviceType';
import { PrimaryAnchor } from '../../components/foundation/PrimaryAnchor';
import { WidthRestriction } from '../../components/foundation/WidthRestriction';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useRecommendation } from '../../hooks/useRecommendation';

import styles from './OrderComplete.module.css';

export const OrderComplete: FC = () => {
  const navigate = useNavigate();
  const { authUserLoading, isAuthUser } = useAuthUser();
  const { recommendation } = useRecommendation();

  if (!recommendation || authUserLoading) {
    return null;
  }
  if (!isAuthUser) {
    navigate('/');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>購入が完了しました</title>
        <style>{`@font-face {
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 700;
  font-display: block;
  src: url('/fonts/NotoSerifJP-Bold-subset.woff2') format('woff2');
}
@font-face {
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url('/fonts/NotoSerifJP-Regular-subset.woff2') format('woff2');
}`}</style>
      </Helmet>
      <Layout>
        <GetDeviceType>
          {({ deviceType }) => (
            <WidthRestriction>
              <div className={styles.container}>
                <div className={styles.notice}>
                  <h2 className={styles.noticeHeading}>購入が完了しました</h2>
                  <AspectRatio ratioHeight={1} ratioWidth={2}>
                    <div className={styles.noticeDescriptionWrapper}>
                      <p
                        className={clsx(styles.noticeDescription, deviceType === DeviceType.DESKTOP && styles.noticeDescription__desktop, deviceType === DeviceType.MOBILE && styles.noticeDescription__mobile)}
                      >
                        このサイトは架空のサイトであり、商品が発送されることはありません
                      </p>
                    </div>
                  </AspectRatio>
                </div>

                <div className={styles.recommended}>
                  <h2 className={styles.recommendedHeading}>こちらの商品もオススメです</h2>
                  <ProductHeroImage product={recommendation.product} title={recommendation.product.name} />
                </div>

                <div className={styles.backToTopButtonWrapper}>
                  <PrimaryAnchor href="/" size="lg">
                    トップへ戻る
                  </PrimaryAnchor>
                </div>
              </div>
            </WidthRestriction>
          )}
        </GetDeviceType>
      </Layout>
    </>
  );
};
