import { ApolloClient, InMemoryCache } from '@apollo/client'


const uri = 'http://13.250.45.177:8000/subgraphs/name/meter/geyser-V2'

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
})
