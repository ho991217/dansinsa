import clsx from "clsx";
import { ComponentPropsWithoutRef, useState } from "react";

const categories = ["All", "Shirt", "Jeans", "Outer", "Shoes", "Acc", "Hat"];

export default function Filter() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="scrollbar-hide flex h-[33px] w-screen max-w-lg justify-start gap-3 overflow-auto px-6">
      {categories.map((category, index) => (
        <Filter.Cell
          key={category}
          selected={selected === index}
          onClick={() => {
            setSelected(index);
          }}
        >
          {category}
        </Filter.Cell>
      ))}
    </div>
  );
}

Filter.Cell = function FilterCell({
  children,
  selected,
  ...props
}: ComponentPropsWithoutRef<"div"> & { selected: boolean }) {
  return (
    <div
      className={clsx(
        "flex h-full w-[70px] flex-shrink-0 flex-col items-center justify-center rounded-full",
        selected ? "bg-gray-900" : "bg-gray-200",
      )}
      {...props}
    >
      <div
        className={clsx("text-sm", selected ? "text-white" : "text-gray-900")}
      >
        {children}
      </div>
    </div>
  );
};
