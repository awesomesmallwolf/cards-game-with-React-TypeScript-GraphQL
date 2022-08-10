import { gql } from '@apollo/client';

export const ResetDocument = gql`
  mutation Reset {
    reset {
      hand
      cardsLeft
      acesLeft
      finished
    }
  }
`;
