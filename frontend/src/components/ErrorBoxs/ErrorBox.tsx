import Constants from '../../utils/Constants';
import Button from '../Button/Button';
import styles from './ErrorBox.module.css';

interface ErrorBoxProps {
  error: Error;
  retry: () => void;
}

function ErrorBox({ error, retry }: ErrorBoxProps): React.ReactElement {
  return (
    <div className={styles.error}>
      <h3 className={styles.title}>{error.toString()}</h3>
      <p>{error.stack?.toString()}</p>
      <Button size="big" variant="primary" onClick={retry}>
        {Constants.retry}
      </Button>
    </div>
  );
}

export default ErrorBox;
