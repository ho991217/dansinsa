import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import DefaultLayout from "../../layouts/default-layout";
import { UserPreprocessType, UserSizeType } from "../../types/user.types";
import supabase from "../../supabase";
import { TABLE_NAME } from "../../constants";

export interface VtonOutletContext {
  userImgSrc: string;
  setUserImgSrc: Dispatch<SetStateAction<string>>;
}

interface UserSizeContext {
  userSize: UserSizeType;
  setUserSize: Dispatch<SetStateAction<UserSizeType>>;
}

interface UserPreprocessContext {
  userPreprocess: UserPreprocessType | null;
}

type VtonOutletContextType = string;

export default function Vton() {
  const [userImgSrc, setUserImgSrc] = useState<VtonOutletContextType>("");
  const [userSize, setUserSize] = useState<UserSizeType>({
    height: 0,
    width: 0,
    l_sleeve: 0,
    s_sleeve: 0,
  });
  const [userPreprocess, setUserPreprocess] =
    useState<UserPreprocessType | null>(null);

  const userSizeChannel = supabase
    .channel("user_size")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: TABLE_NAME.user_size,
      },
      (payload) => {
        console.log(payload.new);
        setUserSize(payload.new as UserSizeType);
      },
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: TABLE_NAME.b_user_height,
      },
      (payload) => {
        console.log(payload.new);
        const newPayload = payload.new as UserSizeType;
        if (newPayload.height === null) return;
        setUserSize((prev) => ({
          ...prev,
          height: newPayload.height,
        }));
      },
    );

  const preprocessChannel = supabase.channel("preprocess").on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: TABLE_NAME.user_preprocess,
    },
    (payload) => {
      console.log(payload.new);
      setUserPreprocess(payload.new as UserPreprocessType);
    },
  );

  useEffect(() => {
    userSizeChannel.subscribe();
    preprocessChannel.subscribe();
    return () => {
      userSizeChannel.unsubscribe();
      preprocessChannel.unsubscribe();
    };
  }, []);

  return (
    <DefaultLayout>
      <Outlet
        context={{
          userImgSrc,
          setUserImgSrc,
          userSize,
          setUserSize,
          userPreprocess,
        }}
      />
    </DefaultLayout>
  );
}

export function useUserImgSrc() {
  return useOutletContext<VtonOutletContext>();
}

export function useUserSize() {
  return useOutletContext<UserSizeContext>();
}

export function useUserPreprocess() {
  return useOutletContext<UserPreprocessContext>();
}
