import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <p className={`${styles.link} ${styles.main}`}>
          <span>Made by </span>
          <a href="https://lindsey.digital/">lindsey.digital</a>
        </p>
        <p className={`${styles.link} ${styles.secondary}`}>
          <a href="https://github.com/maximilian-lindsey/say-it-with-songs">
            GitHub Repository
          </a>
        </p>
      </footer>
    </>
  );
}
