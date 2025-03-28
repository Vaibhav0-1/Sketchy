"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "outlined";
  className?: string;
  size: "lg" | "sm"
  onClick: () => void;
  children: ReactNode
}

export const Button = ({ size, variant, className}: ButtonProps) => {
  return (
    <button
      className={`${className} ${variant === "primary" ? "bg-primary" : ""} ${size === "lg" ?  "px-4 py-2" : "px-2 py-1"}`}
      onClick={children}
    >
      {}
    </button>
  );
};
