import styles from "./Button.module.scss";

type ButtonProps = {
  onClick?: () => {};
  onSubmit?: () => {};
  isGhost?: boolean;
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  onClick,
  onSubmit,
  isGhost,
  children,
}) => {
  return (
    <button
      className={!isGhost ? styles.button : styles.button_ghost}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  );
};
