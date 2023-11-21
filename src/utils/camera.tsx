import React from "react";
import Webcam from "react-webcam";

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void;
}

const videoConstraints = {
  height: 1440,
  width: 1080,
  facingMode: "user",
};

const WebcamCapture = ({ onCapture }: WebcamCaptureProps) => {
  const webcamRef = React.useRef<any>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef]);

  return (
    <div className="relative">
      <Webcam
        audio={false}
        height={1440}
        width={1080}
        ref={webcamRef}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
      />
      <button
        onClick={capture}
        className="absolute bottom-10 left-[50%] z-20 flex h-10 w-10 translate-x-[-50%] items-center justify-center rounded-full border-black bg-gray-200 p-6"
      >
        0
      </button>
    </div>
  );
};

export default WebcamCapture;
