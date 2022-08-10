import range from 'lodash/range';
import shuffle from 'lodash/shuffle';

interface Game {
  cards: number[];
  hand: number[];
  handSize: number;
  isAce: (card: number) => boolean;
  getAceCount: () => number;
  init: () => void;
  getStatus: () => GameStatus;
}

interface GameStatus {
  hand: number[];
  cardsLeft: number;
  acesLeft: number;
  finished: boolean;
}

const game: Game = {
  cards: [], // shuffled 52 cards
  hand: [],
  handSize: 5,
  init: () => {
    game.cards = shuffle(range(0, 52));
    game.hand = [];
  },
  isAce: (card) => {
    return !(card % 13);
  },
  getAceCount: () => {
    return game.cards.reduce((count, card) =>
      count + Number(game.isAce(card)), 0
    );
  },
  getStatus: () => {
    return {
      hand: game.hand,
      cardsLeft: game.cards.length,
      acesLeft: game.getAceCount(),
      finished: game.cards.length <= 0,
    };
  },
};

export const resolvers = {
  Query: {
    game: (): GameStatus => {
      return game.getStatus();
    },
  },
  Mutation: {
    deal: (): GameStatus => {
      if (game.cards.length <= 0) {
        game.init();
        return game.getStatus();
      }

      game.hand = game.cards.splice(0, game.handSize);
      return game.getStatus();
    },
    reset: (): GameStatus => {
      game.init();
      return game.getStatus();
    },
  },
};
