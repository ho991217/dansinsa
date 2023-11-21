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
        "flex items-center justify-center rounded-lg py-3 text-white",
        color === "primary" ? "bg-blue-500" : "bg-gray-500",
        disabled && "bg-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
