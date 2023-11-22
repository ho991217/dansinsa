import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { Tables } from "../../types/supabase.types";
import { Link } from "react-router-dom";
import { ImageSkeleton, TextSkeleton } from "../ui/skeleton";
import clsx from "clsx";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

export default function Card(props: Tables<"product">) {
  return (
    <MotionLink
      to={"/product/" + props.id}
      className={clsx(
        "relative flex-col items-center justify-center overflow-hidden rounded-2xl bg-white shadow-xl even:translate-y-10",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute left-0 top-0 flex w-full justify-end gap-2 bg-gradient-to-b from-white to-transparent px-4 pt-2">
        <Card.Like />
        {/* <Card.Share /> */}
      </div>
      <img
        src={props.image_url ?? ""}
        alt={props.name ?? ""}
        className="mb-2 aspect-square w-full object-contain object-top"
      />
      <div className="flex w-full flex-col items-start justify-center gap-1 px-4 pb-3 ">
        <div className="text-xs sm:text-sm">{props.name}</div>
        <div className="mb-2 overflow-hidden text-ellipsis text-[10px] text-gray-500 sm:text-xs">
          {props.description}
        </div>
        <div className="w-full text-right text-sm font-semibold">
          {props.price?.toLocaleString("ko-KR", {
            style: "currency",
            currency: "KRW",
          })}
        </div>
      </div>
    </MotionLink>
  );
}

Card.Container = function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-4 pb-9"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

Card.Like = function Like(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.60999V4.60999Z"
        stroke="rgb(89, 89, 89)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

Card.Share = function Share(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
        stroke="rgb(89, 89, 89)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
        stroke="rgb(89, 89, 89)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
        stroke="rgb(89, 89, 89)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.59 13.51L15.42 17.49"
        stroke="rgb(89, 89, 89)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.41 6.51L8.59 10.49"
        stroke="rgb(89, 89, 89)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

Card.Skeleton = function Skeleton({ isLoaded }: { isLoaded: boolean }) {
  return (
    <div
      className={clsx(
        "relative flex aspect-[0.6] flex-col items-center justify-center overflow-hidden rounded-2xl bg-white",
        isLoaded ? "hidden" : "flex",
      )}
    >
      <ImageSkeleton className="mb-2 h-[265px] w-full" />
      <div className="flex w-full flex-col items-start justify-center gap-1 px-4 pb-3">
        <TextSkeleton length={20} />
        <TextSkeleton length={25} />
        <div className="mb-2">
          <TextSkeleton length={17} />
        </div>
        <div className="w-full text-right">
          <TextSkeleton length={10} />
        </div>
      </div>
    </div>
  );
};
