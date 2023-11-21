import clsx from "clsx";
import { ComponentProps } from "react";

interface TextSkeletonProps extends ComponentProps<"span"> {
  length?: number;
}

export function TextSkeleton({
  length,
  className,
  ...props
}: TextSkeletonProps) {
  return (
    <span
      className={clsx(
        "select-none rounded-md bg-gray-200 text-sm text-gray-200",
        className,
      )}
      {...props}
    >
      {"-".repeat(length ?? 1)}
    </span>
  );
}

export function IconSkeleton() {
  return <div />;
}

export function ImageSkeleton({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx("bg-gray-200", className)} {...props} />;
}
