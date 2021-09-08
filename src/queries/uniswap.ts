import { gql } from '@apollo/client';

export const GET_PAIRS = gql`
  query getPairs {
    pairs(first: 1000) {
      id
      token0Price
      token1Price
      reserveUSD
      totalSupply
      token0 {
        id
        symbol
        decimals
      }
      token1 {
        id
        symbol
        decimals
      }
    }
  }
`;
