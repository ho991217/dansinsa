import { Outlet, useOutletContext } from "react-router-dom";
import DefaultLayout from "../../layouts/default-layout";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserSizeType } from "../../types/user.types";
import supabase from "../../supabase";

export interface VtonOutletContext {
  userImgSrc: string;
  setUserImgSrc: Dispatch<SetStateAction<string>>;
}

interface UserSizeContext {
  userSize: UserSizeType;
  setUserSize: Dispatch<SetStateAction<UserSizeType>>;
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

  const userSizeChannel = supabase.channel("user_size").on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "user_size",
    },
    (payload) => {
      console.log(payload.new);
      setUserSize(payload.new as UserSizeType);
    },
  );

  useEffect(() => {
    userSizeChannel.subscribe();
    return () => {
      userSizeChannel.unsubscribe();
    };
  }, []);

  return (
    <DefaultLayout>
      <Outlet context={{ userImgSrc, setUserImgSrc, userSize, setUserSize }} />
    </DefaultLayout>
  );
}

export function useUserImgSrc() {
  return useOutletContext<VtonOutletContext>();
}

export function useUserSize() {
  return useOutletContext<UserSizeContext>();
}
