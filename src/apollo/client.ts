import { ApolloClient, DefaultOptions, InMemoryCache } from '@apollo/client';

const API_URL_GQ = import.meta.env.VITE_GRAPH_QL_API_URL;
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  uri: API_URL_GQ,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client;
