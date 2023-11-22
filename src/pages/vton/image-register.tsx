import WebcamCapture from "../../components/vton/camera";
import { useUserImgSrc } from ".";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants";

export default function ImageRegister() {
  const { setUserImgSrc } = useUserImgSrc();
  const navigate = useNavigate();

  const onCapture = (imageSrc: string) => {
    try {
      setUserImgSrc(imageSrc);
      navigate(PATH.vton.image.check);
    } catch (e) {
      console.log(e);
    }
  };
  
  return <WebcamCapture onCapture={onCapture} />;
}
