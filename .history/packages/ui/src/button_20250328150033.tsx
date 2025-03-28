"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "outlined";
  className?: string;
  size: string;
}

export const Button = ({ size, variant, className}: ButtonProps) => {
  return (
    <button
      className={`${className} ${variant === "primary" ? "bg-primary" : ""} ${size === "lg" ?  "px-4"}`}
      onClick={() => alert(`Hello from your ${} app!`)}
    >
      {}
    </button>
  );
};
