import type { Profile } from '../../model/profile';

import type { GraphQLModelResolver } from './model_resolver';

export const profileResolver: GraphQLModelResolver<Profile> = {
  avatar: (parent) => {
    return parent.avatar;
  },
};
