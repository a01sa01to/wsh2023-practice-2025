import type { Review } from '../../model/review';

import type { GraphQLModelResolver } from './model_resolver';

export const reviewResolver: GraphQLModelResolver<Review> = {
  product: (parent) => {
    return parent.product;
  },
  user: (parent) => {
    return parent.user;
  },
};
