import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps {
  className?: string;
  size?: 'big' | 'small';
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
}

function Button({
  className,
  size = 'big',
  variant = 'primary',
  type = 'button',
  children,
  onClick,
}: ButtonProps): React.ReactElement {
  const classes = clsx(className, styles.button, {
    [styles.big]: size === 'big',
    [styles.secondary]: variant === 'secondary',
  });

  return type === 'submit' ? (
    <button className={classes} type="submit" onClick={onClick}>
      {children}
    </button>
  ) : (
    <button className={classes} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  size: '',
  type: '',
  variant: '',
  onClick: () => undefined,
};

export default Button;
