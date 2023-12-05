import Camera from "../../assets/vton/camera.png";
import { VtonDiv } from "../../components/vton";
import ButtonTo from "../../components/common/button-to";
import { PATH, TABLE_NAME } from "../../constants";
import supabase from "../../supabase";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

export default function Introduction() {
  const { getUserId } = useAuth();

  const deleteOldUserData = async () => {
    const userId = await getUserId();

    await supabase.from(TABLE_NAME.user_img).delete().eq("user_id", userId);
    await supabase.from(TABLE_NAME.user_size).delete().eq("user_id", userId);
    await supabase
      .from(TABLE_NAME.user_preprocess)
      .delete()
      .eq("user_id", userId);
    await supabase
      .from(TABLE_NAME.b_user_height)
      .delete()
      .eq("user_id", userId);
  };

  useEffect(() => {
    deleteOldUserData();
  }, []);

  return (
    <main className="flex w-full flex-grow flex-col justify-between">
      <div className="flex w-full flex-col gap-1">
        <VtonDiv delay={0.5}>
          <img
            src={Camera}
            alt="camera"
            className="mx-auto my-[3.5rem] w-1/2"
          />
        </VtonDiv>
        <VtonDiv delay={1.2}>가상 피팅을 이용하려면</VtonDiv>
        <VtonDiv delay={1.7}>전신 사진이 필요해요.</VtonDiv>
      </div>
      <VtonDiv delay={2.2}>
        <ButtonTo to={PATH.vton.image.capture} className="w-full text-base">
          사진 찍기
        </ButtonTo>
      </VtonDiv>
    </main>
  );
}
