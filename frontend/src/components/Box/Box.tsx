import styles from './Box.module.css';

interface BoxProps {
  title: string;
  description: string;
}

function Box({ title, description }: BoxProps): React.ReactElement {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </section>
  );
}

export default Box;
