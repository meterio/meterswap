import { ApolloClient, InMemoryCache } from '@apollo/client'

const uri = 'https://graph.voltswap.finance/subgraphs/name/meter/geyser-V2'

export const client = new ApolloClient({
  uri,

  cache: new InMemoryCache()
})
