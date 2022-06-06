import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = 'https://graph-meter.voltswap.finance/subgraphs/name/meter/geyser-v2';

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache()
});

const UNI_GRAPH_URI = 'https://graph-meter.voltswap.finance/subgraphs/name/meterio/uniswap-v2-subgraph';
export const uniClient = new ApolloClient({
  uri: UNI_GRAPH_URI,
  cache: new InMemoryCache()
});
