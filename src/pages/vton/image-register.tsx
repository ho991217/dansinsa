import Webcam from "react-webcam";
import WebcamCapture from "../../utils/camera";
import { useState } from "react";

export default function ImageRegister() {
  const [imgSrc, setImgSrc] = useState("");

  const onCapture = (imageSrc: string) => {
    setImgSrc(imageSrc);
  };

  return (
    <>
      {imgSrc && <img src={imgSrc} />}
      <WebcamCapture onCapture={onCapture} />
    </>
  );
}
