import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { motion, useAnimate, useAnimationControls } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { PATH } from "../../constants";

interface NavigationItem {
  id: number;
  name: string;
  path: string;
  icon: React.ReactNode;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 1,
    name: "홈",
    path: PATH.main,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 22V12H15V22"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: "가상피팅",
    path: PATH.vton.intro,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 16V7.99999C20.9996 7.64927 20.9071 7.3048 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.26999L13 2.26999C12.696 2.09446 12.3511 2.00204 12 2.00204C11.6489 2.00204 11.304 2.09446 11 2.26999L4 6.26999C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.3048 3.00036 7.64927 3 7.99999V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 3,
    name: "로그인",
    path: PATH.login,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 4,
    name: "마이페이지",
    path: PATH.mypage,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Navigation() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { isScrollingDown, isScrollingUp } = useScrollDirection();
  const controls = useAnimationControls();
  const { isLoggedIn } = useAuth();

  const close = () => controls.start({ y: 100 });
  const open = () => controls.start({ y: 0 });

  useEffect(() => {
    isLoggedIn().then(setLoggedIn);
    open();
  }, []);

  useEffect(() => {
    if (isScrollingDown) {
      close();
    } else if (isScrollingUp) {
      open();
    }
  }, [isScrollingDown, isScrollingUp, controls]);

  return (
    <motion.div
      className={clsx(
        "fixed bottom-[-1px] z-50 box-border flex h-[80px] w-full max-w-lg items-start justify-evenly bg-gray-800 pt-3",
      )}
      initial={{ y: 100 }}
      animate={controls}
      exit={{ y: 100 }}
      transition={{ duration: 0.2 }}
    >
      {NavigationItems.map((item) => {
        if (item.id === 3 && loggedIn) return null;
        if (item.id === 4 && !loggedIn) return null;
        return (
          <Link
            key={item.id}
            to={item.path}
            className="flex w-[25%] flex-col items-center justify-center gap-1 text-white"
          >
            {item.icon}
            <span className="text-xs font-light">{item.name}</span>
          </Link>
        );
      })}
    </motion.div>
  );
}
