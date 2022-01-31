import styles from "./Button.module.scss";

type ButtonProps = {
  onClick?: () => {};
  onSubmit?: () => {};
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  onClick,
  onSubmit,
  children,
}) => {
  return (
    <button className={styles.button} onClick={onClick} onSubmit={onSubmit}>
      {children}
    </button>
  );
};
