import type { User } from '../../model/user';

import type { GraphQLModelResolver } from './model_resolver';

export const userResolver: GraphQLModelResolver<User> = {
  orders: (parent) => {
    return parent.orders;
  },
  profile: (parent) => {
    return parent.profile;
  },
  reviews: (parent) => {
    return parent.reviews;
  },
};
