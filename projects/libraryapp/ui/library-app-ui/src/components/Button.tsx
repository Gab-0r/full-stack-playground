import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  color?: "primary" | "secondary" | "danger";
  enable?: "" | "disabled";
}

const Button = ({
  children,
  onClick,
  color = "primary",
  enable = "",
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      onClick={onClick}
      disabled={enable === "disabled"}
    >
      {children}
    </button>
  );
};

export default Button;
