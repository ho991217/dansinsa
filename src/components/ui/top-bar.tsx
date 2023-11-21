import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  title?: string;
  hasBackButton?: boolean;
}

export default function TopBar({ title, hasBackButton = false }: Props) {
  return (
    <div className="flex h-[60px] w-full items-center justify-between px-4">
      {hasBackButton && <TopBar.BackButton />}
      {!hasBackButton && <TopBar.Title className="">{title}</TopBar.Title>}
      {/* <TopBar.ShoppingCart /> */}
    </div>
  );
}

TopBar.BackButton = function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      className="flex-grow-0"
      onClick={() => {
        navigate(-1);
      }}
    >
      <svg
        width="22"
        height="16"
        viewBox="0 0 22 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 9C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM21 7L1 7V9L21 9V7Z"
          fill="black"
        />
      </svg>
    </button>
  );
};

TopBar.Title = function Title(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={clsx(
        "grid place-items-center text-lg font-bold",
        props.className,
      )}
    >
      {props.children}
    </h3>
  );
};

TopBar.ShoppingCart = function ShoppingCart() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_652_601)">
        <path
          d="M8.99997 22.5C9.55225 22.5 9.99997 22.0523 9.99997 21.5C9.99997 20.9477 9.55225 20.5 8.99997 20.5C8.44768 20.5 7.99997 20.9477 7.99997 21.5C7.99997 22.0523 8.44768 22.5 8.99997 22.5Z"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 22.5C20.5523 22.5 21 22.0523 21 21.5C21 20.9477 20.5523 20.5 20 20.5C19.4477 20.5 19 20.9477 19 21.5C19 22.0523 19.4477 22.5 20 22.5Z"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.999969 1.5H4.99997L7.67997 14.89C7.77141 15.3504 8.02188 15.764 8.38751 16.0583C8.75315 16.3526 9.21067 16.509 9.67997 16.5H19.4C19.8693 16.509 20.3268 16.3526 20.6924 16.0583C21.0581 15.764 21.3085 15.3504 21.4 14.89L23 6.5H5.99997"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_652_601">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
