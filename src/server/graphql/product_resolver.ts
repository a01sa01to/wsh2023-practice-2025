import type { Product } from '../../model/product';

import type { GraphQLModelResolver } from './model_resolver';

export const productResolver: GraphQLModelResolver<Product> = {
  media: (parent) => {
    return parent.media;
  },
  offers: (parent) => {
    return parent.offers
  },
  reviews: (parent) => {
    return parent.reviews
  },
};
