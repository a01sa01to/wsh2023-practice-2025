import { type ShoppingCartItem } from '../../model/shopping_cart_item';

import type { GraphQLModelResolver } from './model_resolver';

export const shoppingCartItemResolver: GraphQLModelResolver<ShoppingCartItem> = {
  product: (parent) => {
    return parent.product;
  },
};
