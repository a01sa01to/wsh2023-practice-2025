import { cacheExchange, Client, fetchExchange } from 'urql';

export const client = new Client({
  exchanges: [cacheExchange, fetchExchange],
  url: '/graphql',
});
