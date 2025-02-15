import type { Context } from '@apollo/client';
import type { GraphQLFieldResolver } from 'graphql';

import { FeatureSection } from '../../model/feature_section';
import { Product } from '../../model/product';
import { Recommendation } from '../../model/recommendation';
import { User } from '../../model/user';
import { dataSource } from '../data_source';

type QueryResolver = {
  feature: GraphQLFieldResolver<unknown, Context, { id: number }, Promise<FeatureSection>>;
  features: GraphQLFieldResolver<unknown, Context, never, Promise<FeatureSection[]>>;
  me: GraphQLFieldResolver<unknown, Context, never, Promise<User | null>>;
  product: GraphQLFieldResolver<unknown, Context, { id: number }, Promise<Product>>;
  recommendations: GraphQLFieldResolver<unknown, Context, never, Promise<Recommendation[]>>;
  user: GraphQLFieldResolver<unknown, Context, { id: number }, Promise<User>>;
};

export const queryResolver: QueryResolver = {
  feature: (_parent, args) => {
    return dataSource.manager.findOneOrFail(FeatureSection, {
      relations: {
        items: {
          product: {
            media: {
              file: true,
            },
            offers: true,
          },
        },
      },
      select: {
        id: true,
        items: {
          id: true,
          product: {
            id: true,
            media: {
              file: {
                filename: true,
              },
              isThumbnail: true,
            },
            name: true,
            offers: {
              endDate: true,
              id: true,
              price: true,
              startDate: true,
            },
            price: true,
          },
        },
        title: true,
      },
      where: {
        id: args.id,
        items: {
          product: {
            media: {
              isThumbnail: true,
            },
          },
        },
      },
    });
  },
  features: () => {
    return dataSource.manager.find(FeatureSection, {
      select: {
        id: true,
        title: true,
      },
    });
  },
  me: async (_parent, _args, { session }) => {
    if (session['userId'] == null) {
      return null;
    }
    return dataSource.manager.findOneOrFail(User, {
      relations: {
        orders: {
          items: {
            product: {
              media: {
                file: true,
              },
              offers: true,
              reviews: {
                user: {
                  profile: {
                    avatar: true,
                  },
                },
              },
            },
          }
        },
        profile: {
          avatar: true,
        },
        reviews: {
          product: true,
        },
      },
      where: { id: session['userId'] },
    });
  },
  product: (_parent, args) => {
    return dataSource.manager.findOneOrFail(Product, {
      relations: {
        media: {
          file: true,
        },
        offers: true,
        reviews: {
          user: {
            profile: {
              avatar: true,
            },
          },
        },
      },
      where: { id: args.id },
    });
  },
  recommendations: () => {
    return dataSource.manager.find(Recommendation, {
      relations: {
        product: {
          media: {
            file: true,
          },
        },
      },
      select: {
        id: true,
        product: {
          id: true,
          media: {
            file: {
              filename: true,
            },
            isThumbnail: true,
          },
          name: true,
        },
      },
      where: {
        product: {
          media: {
            isThumbnail: true,
          },
        },
      },
    });
  },
  user: (_parent, args) => {
    return dataSource.manager.findOneOrFail(User, {
      relations: {
        orders: {
          items: {
            product: {
              media: {
                file: true,
              },
              offers: true,
              reviews: {
                user: {
                  profile: {
                    avatar: true,
                  }
                },
              },
            },
          },
        },
        profile: {
          avatar: true,
        },
        reviews: true,
      },
      where: { id: args.id },
    });
  },
};
