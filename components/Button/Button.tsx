import styles from "./Button.module.scss";

type ButtonProps = {
  onClick?: () => {};
  isGhost?: boolean;
  type?: "submit";
  isDisabled?: boolean;
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  onClick,
  isGhost,
  type,
  isDisabled,
  children,
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className={`${styles.button} ${!isGhost ? styles.alive : styles.ghost}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
