import clsx from 'clsx';
import Symbol from '../Symbol/Symbol';
import { ComposeCard } from './Card.utils';
import styles from './Card.module.css';

interface CardProps {
  className: string;
  card: number;
}

function Card({ card, className }: CardProps): React.ReactElement {
  const composedCard = ComposeCard(card);

  return (
    <li className={clsx(className, styles.card)}>
      <h2 className={clsx(styles.number, styles[composedCard.suite])}>{composedCard.rank}</h2>
      <div className={styles.background}>
        <Symbol className={styles.symbol} suite={composedCard.suite} variant="small" />
        <Symbol className={styles.image} suite={composedCard.suite} variant="big" />
      </div>
    </li>
  );
}

export default Card;
