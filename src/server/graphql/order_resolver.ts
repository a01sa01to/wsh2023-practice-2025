import type { Order } from '../../model/order';

import type { GraphQLModelResolver } from './model_resolver';

export const orderResolver: GraphQLModelResolver<Order> = {
  items: async (parent) => {
    return parent.items;
  },
};
