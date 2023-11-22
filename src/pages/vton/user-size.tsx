import clsx from "clsx";
import { useUserSize } from ".";
import { Button, Input } from "../../components/common";
import { HashLoader } from "react-spinners";
import { useEffect, useState } from "react";
import supabase from "../../supabase";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PATH, TABLE_NAME } from "../../constants";

export default function UserSize() {
  const { userSize, setUserSize } = useUserSize();
  const [width, setWidth] = useState(0);
  const [l_sleeve, setLSleeve] = useState(0);
  const [s_sleeve, setSSleeve] = useState(0);
  const [all, setAll] = useState(false);
  const { getUserId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userSize.width !== 0) setWidth(userSize.width);
    if (userSize.l_sleeve !== 0) setLSleeve(userSize.l_sleeve);
    if (userSize.s_sleeve !== 0) setSSleeve(userSize.s_sleeve);
  }, [userSize.width, userSize.l_sleeve, userSize.s_sleeve]);

  useEffect(() => {
    if (width && l_sleeve && s_sleeve) setAll(true);
  }, [width, l_sleeve, s_sleeve]);

  const onNext = async () => {
    if (!all) return;

    const user_id = await getUserId();
    if (!user_id) throw new Error("User ID is not defined");

    try {
      await supabase.from(TABLE_NAME.user_size).upsert({
        user_id,
        width,
        l_sleeve,
        s_sleeve,
      });
      navigate(PATH.vton.image.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="items-left flex w-full flex-grow flex-col justify-between">
      <div className="items-left flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-gray-400">
          신장
          <Input
            icon={<UserSize.Height />}
            value={userSize.height}
            unit="cm"
            className="bg-white"
            readOnly
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          어깨 너비
          {userSize.width ? (
            <Input
              type="number"
              icon={<UserSize.Width />}
              value={width}
              unit="cm"
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          ) : (
            <UserSize.Loader />
          )}
        </div>
        <div className="flex flex-col gap-2">
          짧은팔 소매 길이
          {userSize.s_sleeve ? (
            <Input
              type="number"
              unit="cm"
              icon={<UserSize.SSleeve />}
              value={s_sleeve}
              onChange={(e) => setSSleeve(Number(e.target.value))}
            />
          ) : (
            <UserSize.Loader />
          )}
        </div>
        <div className="flex flex-col gap-2">
          긴팔 소매 길이
          {userSize.l_sleeve ? (
            <Input
              type="number"
              unit="cm"
              icon={<UserSize.LSleeve />}
              value={l_sleeve}
              onChange={(e) => setLSleeve(Number(e.target.value))}
            />
          ) : (
            <UserSize.Loader />
          )}
        </div>
      </div>
      <Button disabled={!all} onClick={onNext}>
        완료
      </Button>
    </div>
  );
}

UserSize.Loader = function UserSizeLoader({
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "flex h-[50px] w-full animate-pulse items-center justify-center gap-3 rounded-md border-[1.5px] bg-white px-3 py-1 text-gray-300 transition-colors",
      )}
    >
      <HashLoader color="#3B82F6" size={20} />
      <span>인공지능이 추론중입니다...</span>
    </div>
  );
};

UserSize.Height = function UserSizeHeight() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="rgb(156,163,175)"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    </svg>
  );
};

UserSize.Width = function UserSizeWidth() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
};

UserSize.LSleeve = function UserSizeLSleeve() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="7 13 12 18 17 13"></polyline>
      <polyline points="7 6 12 11 17 6"></polyline>
    </svg>
  );
};

UserSize.SSleeve = function UserSizeSSleeve() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};
