import { Outlet, useOutletContext } from "react-router-dom";
import DefaultLayout from "../../layouts/default-layout";
import { Dispatch, SetStateAction, useState } from "react";

export interface VtonOutletContext {
  userImgSrc: string;
  setUserImgSrc: Dispatch<SetStateAction<string>>;
}

type VtonOutletContextType = string;

export default function Vton() {
  const [userImgSrc, setUserImgSrc] = useState<VtonOutletContextType>("asdf");

  return (
    <DefaultLayout>
      <Outlet context={{ userImgSrc, setUserImgSrc }} />
    </DefaultLayout>
  );
}

export function useUserImgSrc() {
  return useOutletContext<VtonOutletContext>();
}
