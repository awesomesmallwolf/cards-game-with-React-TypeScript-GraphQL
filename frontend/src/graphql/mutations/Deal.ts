import { gql } from '@apollo/client';

export const DealDocument = gql`
  mutation Deal {
    deal {
      hand
      cardsLeft
      acesLeft
      finished
    }
  }
`;
