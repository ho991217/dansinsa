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
  const { getUserInfo } = useAuth();
  const navigate = useNavigate();

  const onClick = async () => {
    const user = await getUserInfo();
    if (!user) return;

    const userId = user.data.session?.user.id;
    if (!userId) return;

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
    const img_path = bucket.data.path;

    const original_col = await supabase
      .from("user_img")
      .select("user_id, original", { count: "exact", head: true })
      .eq("user_id", userId);

    if (original_col.error) {
      throw original_col.error;
    }

    if (original_col.count && original_col.count < 1) {
      const { data: _data, error: _error } = await supabase
        .from("user_img")
        .insert({ user_id: userId, original: img_path })
        .select();

      if (_error) {
        throw _error;
      }
    }

    navigate(PATH.vton.image.size);
  };

  return (
    <div className="flex w-full flex-grow flex-col justify-end">
      <motion.img
        src={userImgSrc}
        className="absolute left-1/2 w-full"
        initial={{
          scale: 1,
          borderRadius: 0,
          translateX: "-50%",
          translateY: 0,
        }}
        animate={{
          scale: 0.87,
          borderRadius: "1rem",
          translateX: "-50%",
          translateY: "-12.5%",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
      />
      <div className="w-full pb-2">
        <VtonDiv delay={0.7} className="w-full">
          <Button onClick={onClick} className="font-base w-full text-sm">
            치수 측정
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
