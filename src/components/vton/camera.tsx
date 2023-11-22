import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import HumanSilhouette from "../../assets/vton/human_silhouette.svg";
import CAM_DEMENSION from "../../constants/dimension";
import { MoonLoader } from "react-spinners";
import clsx from "clsx";
import Toggle from "../common/toggle";
import { motion } from "framer-motion";

type FacingMode = "user" | "environment";

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void;
}

const WebcamCapture = ({ onCapture }: WebcamCaptureProps) => {
  const [silhouetteOn, setSilhouetteOn] = useState(false);
  const [facingMode, setFacingMode] = useState<FacingMode>("user");
  const [isCamLoaded, setIsCamLoaded] = useState(false);
  const webcamRef = React.useRef<any>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef]);

  return (
    <div className="absolute top-0 h-screen min-w-full">
      <div
        className={clsx(
          "relative overflow-hidden rounded-b-xl shadow-xl",
          !isCamLoaded && "hidden",
        )}
      >
        {silhouetteOn && (
          <motion.img
            src={HumanSilhouette}
            alt="silhouette"
            className="absolute left-1/2 top-0 z-50 h-full -translate-x-1/2 opacity-40"
            initial={{
              filter: "blur(10px)",
            }}
            animate={{
              filter: "blur(2.5px)",
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
          />
        )}
        <Webcam
          audio={false}
          ref={webcamRef}
          videoConstraints={{
            ...CAM_DEMENSION,
            facingMode,
          }}
          screenshotFormat="image/jpeg"
          mirrored
          onLoadStart={() => setIsCamLoaded(false)}
          onLoadedData={() => setIsCamLoaded(true)}
        />
      </div>
      {!isCamLoaded && (
        <span className="mx-auto my-[200px] flex flex-col items-center justify-center gap-4">
          <MoonLoader color="#4E81EE" />
          카메라 로딩중...
        </span>
      )}
      <div className="mt-8 flex w-full items-center justify-between px-10">
        <button
          onClick={capture}
          className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-blue-500 text-2xl text-white shadow-xl ring-2 ring-blue-500 ring-offset-2 focus:outline-none"
        >
          <svg
            viewBox="0 0 24 24"
            width="32"
            height="32"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
        </button>
        <button
          className="grid h-[3rem] w-[3rem] place-items-center rounded-xl bg-gray-200"
          onClick={() => setSilhouetteOn((prev) => !prev)}
        >
          {silhouetteOn ? (
            <svg
              viewBox="0 0 24 24"
              width="32"
              height="32"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
              <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="32"
              height="32"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default WebcamCapture;
