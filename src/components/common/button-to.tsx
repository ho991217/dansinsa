import { LinkProps } from "react-router-dom";
import Button, { ButtonProps } from "./button";
import { Link } from "react-router-dom";

export default function ButtonTo({
  to,
  children,
  ...props
}: ButtonProps & LinkProps) {
  return (
    <Button {...props}>
      <Link className="h-full w-full" to={to}>
        {children}
      </Link>
    </Button>
  );
}
