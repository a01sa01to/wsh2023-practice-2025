import { useMutation } from 'urql';

import type { SendReviewMutationResponse } from '../graphql/mutations';
import { SendReviewMutation } from '../graphql/mutations';

export const useSendReview = () => {
  const [_, sendReview] = useMutation<SendReviewMutationResponse>(SendReviewMutation);

  return { sendReview };
};
