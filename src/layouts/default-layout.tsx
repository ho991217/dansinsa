import Navigation from "../components/ui/navigation";
import TopBar from "../components/ui/top-bar";
import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { navHiddenPath } from "./nav-hidden-path";

interface DefaultLayoutProps extends ComponentPropsWithoutRef<"div"> {
  title?: string;
  hasBackButton?: boolean;
  children: React.ReactNode;
}

export default function DefaultLayout({
  title = "DANSINSA",
  hasBackButton = false,
  children,
  className,
  ...props
}: DefaultLayoutProps) {
  const { pathname } = useLocation();

  const isHiddenPath = () => {
    const wildcardRegex = /\/\*/;
    const samePath = navHiddenPath.find((path) => {
      const exactPath = !wildcardRegex.test(path);
      if (exactPath && path === pathname) return true;

      const supPath = path.replace(wildcardRegex, "");
      if (pathname.startsWith(supPath)) return true;

      return false;
    });

    return Boolean(samePath);
  };

  return (
    <>
      <TopBar title={title} hasBackButton={isHiddenPath()} />
      <div
        className={clsx(
          "m-6 flex flex-grow flex-col items-center gap-6 scrollbar-hide",
          className,
        )}
        {...props}
      >
        {children}
      </div>
      {!isHiddenPath() && <Navigation />}
    </>
  );
}
