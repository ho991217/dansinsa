import clsx from "clsx";
import { MotionProps, motion } from "framer-motion";

interface Props extends MotionProps {
  delay?: number;
  className?: string;
}

export default function VtonDiv({
  className,
  children,
  delay,
  ...props
}: Props) {
  return (
    <motion.div
      className={clsx("text-left text-3xl font-semibold", className)}
      initial={{ opacity: 0, translateY: 10, filter: "blur(10px)" }}
      animate={{
        opacity: 1,
        translateY: 0,
        filter: "blur(0px)",
        transition: { delay, duration: 1 },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
