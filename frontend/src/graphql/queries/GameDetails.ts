import { gql } from '@apollo/client';

export const GameDetailsDocument = gql`
  query GameDetails {
    game {
      hand
      cardsLeft
      acesLeft
      finished
    }
  }
`;
