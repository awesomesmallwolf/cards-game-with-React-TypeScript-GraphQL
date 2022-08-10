import clsx from 'clsx';
import { Suite } from '../Card/Card.utils';
import { CloverIcon, DiamondIcon, HeartIcon, SpadeIcon } from '../Svg/Svg';
import styles from './Symbol.module.css';

interface SymbolProps {
  className: string;
  suite: Suite;
  variant?: 'small' | 'big';
}

function Symbol({ className, suite, variant = 'big' }: SymbolProps): React.ReactElement {
  const Icon = {
    clover: CloverIcon,
    diamond: DiamondIcon,
    heart: HeartIcon,
    spade: SpadeIcon,
  }[suite];

  return (
    <Icon className={clsx(className, styles.symbol, { [styles.small]: variant === 'small' })} />
  );
}

Symbol.defaultProps = {
  variant: 'big',
};

export default Symbol;
