import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <p>
          <span>Made by </span>
          <a href="https://lindsey.digital/">lindsey.digital</a>
        </p>
      </footer>
    </>
  );
}
