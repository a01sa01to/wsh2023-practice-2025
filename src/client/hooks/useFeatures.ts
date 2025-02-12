import { useQuery } from '@apollo/client';

import type { GetFeatureSectionQueryResponse, GetFeatureSectionsQueryResponse } from '../graphql/queries';
import { GetFeatureSectionQuery, GetFeatureSectionsQuery } from '../graphql/queries';

export const useFeatures = () => {
  const featuresResult = useQuery<GetFeatureSectionsQueryResponse>(GetFeatureSectionsQuery);

  const features = featuresResult?.data?.features;

  return { features };
};

export const useFeature = (featureId: number) => {
  const featureResult = useQuery<GetFeatureSectionQueryResponse>(GetFeatureSectionQuery, {
    variables: {
      id: featureId,
    }
  })

  const feature = featureResult?.data?.feature;

  return { feature };
}