import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = 'https://geyser-graph-on-moonbeam.voltswap.finance/subgraphs/name/moonbeam/token-geyser-v2';

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache()
});


const UNI_GRAPH_URI = 'https://geyser-graph-on-moonbeam.voltswap.finance/subgraphs/name/moonbeam/uniswap-v2-subgraph';
export const uniClient = new ApolloClient({
  uri: UNI_GRAPH_URI,
  cache: new InMemoryCache()
});
