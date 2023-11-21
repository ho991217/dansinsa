import WebcamCapture from "../../utils/camera";
import { useUserImgSrc } from ".";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants";

export default function ImageRegister() {
  const { setUserImgSrc } = useUserImgSrc();
  const navigate = useNavigate();

  const onCapture = (imageSrc: string) => {
    try {
      setUserImgSrc(imageSrc);
      navigate(PATH.vton.image.result);
    } catch (e) {
      console.log(e);
    }
  };

  return <WebcamCapture onCapture={onCapture} />;
}
