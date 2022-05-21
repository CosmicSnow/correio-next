import React from "react";

interface AlertProps {
  className?: string;
  children?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ children, className }) => {
  return (
    <div
      className={
        "border bg-yellow-100 border-yellow-400 text-yellow-600 py-4 px-4 rounded-md " +
        className
      }
    >
      {children}
    </div>
  );
};

export { Alert };
