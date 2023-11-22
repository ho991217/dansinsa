import { useEffect, useState } from "react";
import { Button } from "../components/common";
import useAuth from "../hooks/useAuth";
import DefaultLayout from "../layouts/default-layout";

const URL = `${import.meta.env.VITE_SUPABASE_BUCKET_URL}/user_img`;

export default function MyPage() {
  const [userImgSrc, setUserImgSrc] = useState("");
  const { logout, getUserId } = useAuth();

  const getUserImage = async () => {
    try {
      const userId = await getUserId();
      setUserImgSrc(`${URL}/${userId}/original.jpeg`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserImage();
  }, []);

  return (
    <DefaultLayout>
      <img src={userImgSrc} alt="user" className="w-1/2" />
      <Button onClick={logout} className="w-full py-3">
        로그아웃
      </Button>
    </DefaultLayout>
  );
}
