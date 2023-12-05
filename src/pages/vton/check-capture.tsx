import { useUserImgSrc } from ".";
import { motion } from "framer-motion";
import { VtonDiv } from "../../components/vton";
import { Button } from "../../components/common";
import ButtonTo from "../../components/common/button-to";
import { PATH } from "../../constants";
import supabase from "../../supabase";
import useAuth from "../../hooks/useAuth";
import { base64toFile } from "../../utils/base64toFile";
import { useNavigate } from "react-router-dom";

export default function CheckCapture() {
  const { userImgSrc } = useUserImgSrc();
  const { getUserId } = useAuth();
  const navigate = useNavigate();

  const getId = async () => {
    const userId = await getUserId();

    if (!userId) throw new Error("유저 아이디가 없습니다.");
    return userId;
  };

  const uploadImage = async (userId: string) => {
    const bucket = await supabase.storage
      .from("user_img")
      .upload(
        `${userId}/original.jpeg`,
        base64toFile(userImgSrc, "original.jpeg"),
        {
          contentType: "image/jpeg",
          upsert: true,
        },
      );
    if (bucket.error) {
      throw bucket.error;
    }

    return bucket;
  };

  const uploadImagePathToDB = async (userId: string, img_path: string) => {
    const { data: _data, error: _error } = await supabase
      .from("user_img")
      .upsert({ user_id: userId, original: img_path })
      .select();

    if (_error) {
      throw _error;
    }
  };

  const onClick = async () => {
    try {
      const userId = await getId();
      const bucket = await uploadImage(userId);
      const img_path =
        "https://gjlvbikvkbtasqrcpsbf.supabase.co/storage/v1/object/public/user_img/" +
        bucket.data.path;
      await uploadImagePathToDB(userId, img_path);

      navigate(PATH.vton.height);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <div className="flex w-full flex-grow flex-col justify-end">
      <motion.img
        src={userImgSrc}
        className="absolute left-1/2 top-0 w-full"
        initial={{
          scale: 0.95,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: "0.75rem",
          borderBottomRightRadius: "0.75rem",
          translateX: "-50%",
          translateY: 0,
        }}
        animate={{
          scale: 0.87,
          borderTopLeftRadius: "0.75rem",
          borderTopRightRadius: "0.75rem",
          borderBottomLeftRadius: "0.75rem",
          borderBottomRightRadius: "0.75rem",
          translateX: "-50%",
          translateY: "10%",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
      />
      <div className="w-full pb-2">
        <VtonDiv delay={0.7} className="w-full">
          <Button onClick={onClick} className="font-base w-full text-sm">
            다음
          </Button>
        </VtonDiv>
        <VtonDiv delay={1.2} className="w-full">
          <ButtonTo
            to={PATH.vton.image.capture}
            color="secondary"
            className="font-base w-full text-sm"
          >
            다시 찍기
          </ButtonTo>
        </VtonDiv>
      </div>
    </div>
  );
}
