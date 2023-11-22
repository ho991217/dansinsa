import clsx from "clsx";
import { ComponentPropsWithoutRef, useState } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  icon?: React.ReactNode;
  unit?: string;
}

export default function Input({
  type,
  id,
  value,
  onChange,
  icon,
  unit,
  ...props
}: InputProps) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div
      className={clsx(
        "flex h-[50px] w-full items-center justify-between rounded-md border-[1.5px] bg-white px-3 py-1 transition-colors",
        isFocus ? " border-blue-500" : "border-gray-300",
      )}
    >
      <div className="flex items-center gap-3">
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
      {unit && (
        <span className="pr-4 text-sm font-light text-gray-500">{unit}</span>
      )}
    </div>
  );
}
