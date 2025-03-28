"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variant: "primary";
  className?: string;
  appName: string;
}

export const Button = ({ size, variant, className}: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
