import type { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  onClose: () => void;
  color?: "primary" | "secondary" | "danger" | "success";
}

const Alert = ({ children, onClose, color = "success" }: AlertProps) => {
  return (
    <div className="w-25">
      <div
        className={`alert alert-dismissible fade show mx-1 alert-` + color}
        role="alert"
      >
        {children}
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default Alert;
