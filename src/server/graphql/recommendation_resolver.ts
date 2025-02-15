import type { Recommendation } from '../../model/recommendation';

import type { GraphQLModelResolver } from './model_resolver';

export const recommendationResolver: GraphQLModelResolver<Recommendation> = {
  product: (parent) => {
    return parent.product;
  },
};
