import React from "react";
import Webcam from "react-webcam";
import HumanSilhouette from "../../assets/vton/human_silhouette.svg";
import Camera from "../../assets/vton/camera_white.png";
import CAM_DEMENSION from "../../constants/dimension";

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void;
}

const videoConstraints = {
  ...CAM_DEMENSION,
  // width: 1080,
  // height: 1440,
  facingMode: "user",
};

const WebcamCapture = ({ onCapture }: WebcamCaptureProps) => {
  const webcamRef = React.useRef<any>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef]);

  return (
    <div className="absolute z-10 flex-grow">
      <img
        src={HumanSilhouette}
        alt="silhouette"
        className="absolute left-1/2 top-1/2 h-[90%] -translate-x-1/2 -translate-y-1/2 opacity-25"
      />
      <Webcam
        audio={false}
        height={2160}
        width={1080}
        ref={webcamRef}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
      />
      <button
        onClick={capture}
        className="absolute bottom-10 left-[50%] h-[5rem] w-[5rem] -translate-x-[50%] rounded-full bg-blue-500 text-2xl text-white shadow-xl"
      >
        <img src={Camera} alt="camera icon" className="m-auto w-[70%]" />
      </button>
    </div>
  );
};

export default WebcamCapture;
