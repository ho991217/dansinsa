export default function SearchBar() {
  return (
    <form className="flex h-[45px] w-full items-center justify-between gap-4 rounded-lg border-[1.5px] border-gray-200 px-4 placeholder:text-sm ">
      <SearchBar.Icon />
      <input
        placeholder="검색어를 입력하세요..."
        className="h-full w-full bg-transparent outline-none"
      />
    </form>
  );
}

SearchBar.Icon = function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-search"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
};
