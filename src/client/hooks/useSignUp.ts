import { useMutation } from 'urql';

import { SignUpMutation } from '../graphql/mutations';

export const useSignUp = () => {
  const [_, signUp] = useMutation(SignUpMutation);

  return { signUp };
};
