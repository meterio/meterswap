import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = 'https://graph-theta.voltswap.finance/subgraphs/name/theta/geyser-v2';

export const tclient = new ApolloClient({
  uri,
  cache: new InMemoryCache()
});



const UNI_GRAPH_URI = 'https://graph-theta.voltswap.finance/subgraphs/name/theta/uniswap-v2-subgraph';
export const uniClient = new ApolloClient({
  uri: UNI_GRAPH_URI,
  cache: new InMemoryCache()
});
