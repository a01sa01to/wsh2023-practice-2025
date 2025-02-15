import { useMutation } from 'urql';

import type { UpdateItemInShoppingCartMutationResponse } from '../graphql/mutations';
import { UpdateItemInShoppingCartMutation } from '../graphql/mutations';

export const useUpdateCartItem = () => {
  const [updateCartItemRes, updateCartItem] = useMutation<UpdateItemInShoppingCartMutationResponse>(UpdateItemInShoppingCartMutation);

  return { updateCartItem };
};
