import clsx from "clsx";
import { ComponentPropsWithoutRef, useState } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  icon: React.ReactNode;
}

export default function Input({
  type,
  id,
  value,
  onChange,
  icon,
  ...props
}: InputProps) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div
      className={clsx(
        "flex h-[50px] w-full items-center gap-3 rounded-md border-[1.5px] bg-white px-3 py-1 transition-colors",
        isFocus ? " border-blue-500" : "border-gray-300",
      )}
    >
      <label htmlFor={id}>{icon}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full outline-none"
        onFocus={setIsFocus.bind(null, true)}
        onBlur={setIsFocus.bind(null, false)}
        {...props}
      />
    </div>
  );
}
