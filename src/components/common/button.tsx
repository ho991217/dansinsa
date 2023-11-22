import clsx from "clsx";
import { ComponentProps } from "react";

export interface ButtonProps extends ComponentProps<"button"> {
  color?: "primary" | "secondary";
}

export default function Button({
  children,
  className,
  color = "primary",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center rounded-lg py-3",
        color === "primary"
          ? "bg-blue-500 text-white"
          : "bg-white text-blue-500",
        disabled && "bg-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
