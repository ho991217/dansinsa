import { LinkProps } from "react-router-dom";
import Button, { ButtonProps } from "./button";
import { Link } from "react-router-dom";
import clsx from "clsx";

export default function ButtonTo({
  to,
  children,
  className,
  ...props
}: ButtonProps & LinkProps) {
  return (
    <Button className={clsx("transition-colors", className)} {...props}>
      <Link className="h-full w-full" to={to}>
        {children}
      </Link>
    </Button>
  );
}
