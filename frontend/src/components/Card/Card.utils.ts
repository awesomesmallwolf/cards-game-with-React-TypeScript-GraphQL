const COUNT_SAME_SUITE = 13;
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITES = ['spade', 'diamond', 'clover', 'heart'];

type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export type Suite = 'clover' | 'diamond' | 'heart' | 'spade';

type Card = {
  rank: Rank;
  suite: Suite;
};

export const ComposeCard = (cardNumber: number): Card => {
  return {
    rank: RANKS[cardNumber % COUNT_SAME_SUITE] as Rank,
    suite: SUITES[Math.floor(cardNumber / COUNT_SAME_SUITE)] as Suite,
  };
};
