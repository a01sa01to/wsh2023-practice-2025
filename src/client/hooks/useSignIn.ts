import { useMutation } from 'urql';

import { SignInMutation } from '../graphql/mutations';

export const useSignIn = () => {
  const [_, signIn] = useMutation(SignInMutation);

  return { signIn };
};
