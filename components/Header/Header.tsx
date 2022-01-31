import styles from "./Header.module.scss";

type HeaderProps = {
  title: string;
  description: string;
};

export default function Header({ title, description }: HeaderProps) {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.description}>{description}</h2>
    </>
  );
}
