import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
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
        "flex items-center justify-center rounded-lg text-white",
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
