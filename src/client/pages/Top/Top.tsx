import { type FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';
import { ProductList } from '../../components/feature/ProductList';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import type { GetFeatureSectionsQueryResponse, GetRecommendationsQueryResponse } from '../../graphql/queries';

import styles from './Top.module.css';

export const Top: FC = () => {
  const [recommendation, setRecommendation] = useState<GetRecommendationsQueryResponse['recommendations'][0] | undefined>(undefined)
  const [features, setFeatures] = useState<GetFeatureSectionsQueryResponse['features'] | undefined>(undefined)

  useEffect(() => {
    const hour = new Date().getUTCHours();
    const recommendations = (window as any).__data?.recommendations;

    setRecommendation(recommendations[hour % recommendations.length]);
    setFeatures((window as any).__data?.features);
  }, [])

  return (
    <>
      <Helmet>
        <title>買えるオーガニック</title>
      </Helmet>
      <Layout>
        <div>
          <ProductHeroImage product={recommendation?.product} title="今週のオススメ" />

          <div className={styles.featureList}>
            {(features ?? []).map((featureSection) => {
              return (
                <div key={featureSection.id} className={styles.feature}>
                  <h2 className={styles.featureHeading}>{featureSection.title}</h2>
                  <ProductList featureSection={featureSection} />
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};
