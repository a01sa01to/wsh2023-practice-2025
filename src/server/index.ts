import http from 'node:http';

import { koaMiddleware } from '@as-integrations/koa';
import gracefulShutdown from 'http-graceful-shutdown';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import logger from 'koa-logger';
import route from 'koa-route';
import send from 'koa-send';
import session from 'koa-session';
import serve from 'koa-static';

import type { Context } from './context';
import { dataSource } from './data_source';
import { initializeApolloServer } from './graphql';
import { initializeDatabase } from './utils/initialize_database';
import { rootResolve } from './utils/root_resolve';

const PORT = Number(process.env.PORT ?? 8080);

async function init(): Promise<void> {
  await initializeDatabase();
  await dataSource.initialize();

  const app = new Koa();
  const httpServer = http.createServer(app.callback());

  app.keys = ['cookie-key'];
  app.use(logger());
  app.use(bodyParser());
  app.use(session({}, app));
  app.use(compress());

  app.use(async (ctx, next) => {
    if (['/fonts', '/images', '/icons', '/videos', '/robots.txt'].some((path) => ctx.path.startsWith(path))) {
      ctx.set('Cache-Control', 'public, max-age=86400, immutable');
    }

    await next();

    if (ctx.path === '/') {
      const res = ctx.response;
      let body = ""
      for await (const chunk of res.body) body += chunk;

      const graphqlQuery = `
query {
  recommendations {
    ...RecommendationFragment
  }
  features {
    ...FeatureSectionFragment
  }
}
fragment RecommendationFragment on Recommendation  {
  product {
    id
    name
    media {
      isThumbnail
      file {
        filename
      }
    }
  }
}
fragment FeatureSectionFragment on FeatureSection {
  id
  title
  items {
    ...FeatureItemFragment
  }
}
fragment FeatureItemFragment on FeatureItem {
  product {
    id
    name
    price
    media {
      isThumbnail
      file {
        filename
      }
    }
    offers {
      ...LimitedTimeOfferFragment
    }
  }
}
fragment LimitedTimeOfferFragment on LimitedTimeOffer {
  id
  price
  startDate
  endDate
}`

      const queryResponse = await apolloServer.executeOperation({ query: graphqlQuery })
      if (queryResponse.body.kind !== 'single') return;

      body = body.replace("</head>", `<script type="module">window.__data = ${JSON.stringify(queryResponse.body.singleResult.data)}</script></head>`);
      res.body = body
    }

    if (ctx.path.startsWith("/product/")) {
      const id = Number.parseInt(ctx.path.split("/")[2], 10);

      const res = ctx.response;
      let body = ""
      for await (const chunk of res.body) body += chunk;

      const graphqlQuery = `
query GetProductDetails($productId: Int!) {
  product(id: $productId) {
    ...ProductWithReviewFragment
  }
}
fragment ProductWithReviewFragment on Product {
  ...ProductFragment
  reviews {
    ...ReviewFragment
  }
}
fragment ProductFragment on Product {
  id
  name
  price
  description
  media {
    ...ProductMediaFragment
  }
  offers {
    ...LimitedTimeOfferFragment
  }
}
fragment ProductMediaFragment on ProductMedia {
  id
  isThumbnail
  file {
    ...MediaFileFragment
  }
}
fragment MediaFileFragment on MediaFile {
  id
  filename
}
fragment LimitedTimeOfferFragment on LimitedTimeOffer {
  id
  price
  startDate
  endDate
}
fragment ReviewFragment on Review {
  id
  postedAt
  comment
  user {
    ...UserFragment
  }
}
fragment UserFragment on User {
  id
  email
  profile {
    ...ProfileFragment
  }
}
fragment ProfileFragment on Profile {
  id
  name
  avatar {
    ...MediaFileFragment
  }
}`

      const queryResponse = await apolloServer.executeOperation({ query: graphqlQuery, variables: { productId: id } })
      if (queryResponse.body.kind !== 'single') return;

      body = body.replace("</head>", `<script type="module">window.__data = ${JSON.stringify(queryResponse.body.singleResult.data)}</script></head>`);
      res.body = body
    }
  });

  const apolloServer = await initializeApolloServer();
  await apolloServer.start();

  app.use(
    route.all(
      '/graphql',
      koaMiddleware(apolloServer, {
        context: async ({ ctx }) => {
          return { session: ctx.session } as Context;
        },
      }),
    ),
  );

  app.use(
    route.post('/initialize', async (ctx) => {
      await initializeDatabase();
      ctx.status = 204;
    }),
  );

  app.use(serve(rootResolve('dist')));
  app.use(serve(rootResolve('public')));

  app.use(async (ctx) => await send(ctx, rootResolve('/dist/index.html')));

  httpServer.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });

  gracefulShutdown(httpServer, {
    async onShutdown(signal) {
      console.log(`Received signal to terminate: ${signal}`);
      await apolloServer.stop();
      await dataSource.destroy();
    },
  });
}

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
