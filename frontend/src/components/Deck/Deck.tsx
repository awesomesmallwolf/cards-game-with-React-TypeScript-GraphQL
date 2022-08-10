import clsx from 'clsx';
import Spinner from 'react-spinner';
import 'react-spinner/react-spinner.css';
import constants from '../../utils/Constants';
import { isAce } from '../../utils/Helpers';
import Box from '../Box/Box';
import Button from '../Button/Button';
import CardGroup from '../CardGroup/CardGroup';
import { WinnerBadge } from '../Svg/Svg';
import styles from './Deck.module.css';

interface DeckProps {
  game: {
    hand: number[];
    acesLeft: number;
    cardsLeft: number;
    finished: boolean;
  };
  loading: boolean;
  onDeal: () => void;
  onReset: () => void;
}

function Deck({ game, loading, onDeal, onReset }: DeckProps): React.ReactElement {
  const hasAce = game?.hand.some((card) => isAce(card));
  const isWinner = game?.finished && hasAce;

  return (
    <section className={styles.section}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <header className={styles.header}>
            <Box title={game.cardsLeft.toString()} description="Cards Left" />
            <Box title={game.acesLeft.toString()} description="Aces Left" />
          </header>

          {isWinner && (
            <div className={styles.badge}>
              <WinnerBadge />
            </div>
          )}

          <main className={styles.main}>
            <CardGroup className={clsx({ [styles.wiggle]: isWinner })} cards={game.hand} />
          </main>

          <footer>
            {game.finished ? (
              <>
                {!hasAce && (
                  <>
                    <p className={styles.paragraph}>{constants.lost}</p>
                    <p className={styles.paragraph}>{constants.lostDescription}</p>
                  </>
                )}

                <Button className={styles.again} size="small" variant="secondary" onClick={onReset}>
                  {constants.playAgain}
                </Button>
              </>
            ) : (
              <>
                <Button className={styles.deal} size="big" variant="primary" onClick={onDeal}>
                  {constants.deal}
                </Button>

                <Button className={styles.reset} size="small" variant="secondary" onClick={onReset}>
                  {constants.reset}
                </Button>
              </>
            )}
          </footer>
        </>
      )}
    </section>
  );
}

export default Deck;
