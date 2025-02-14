import type { FeatureSection } from '../../model/feature_section';

import type { GraphQLModelResolver } from './model_resolver';

export const featureSectionResolver: GraphQLModelResolver<FeatureSection> = {
  items: (parent) => {
    return parent.items;
  },
};
