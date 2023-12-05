import { DotLoader } from "react-spinners";
import { useUserPreprocess } from ".";
import { useEffect, useState } from "react";
import { UserPreprocessType } from "../../types/user.types";
import ButtonTo from "../../components/common/button-to";
import { PATH } from "../../constants";
import { VtonDiv } from "../../components/vton";
import clsx from "clsx";

type PreprocessStep = keyof UserPreprocessType | "waiting" | "complete";

export default function Preprocess() {
  const [step, setStep] = useState<PreprocessStep>("waiting");
  const { userPreprocess } = useUserPreprocess();

  const parseStep = (currentStep: PreprocessStep) => {
    switch (currentStep) {
      case "waiting":
        return "전처리 대기 중이에요.";
      case "cropped":
        return "이미지를 잘랐어요.";
      case "pose_json":
        return "포즈를 추출했어요.";
      case "segment":
        return "배경을 제거했어요.";
      case "image-parse-v3":
        return "이미지 분석을 완료했어요.";
      case "densepose":
        return "바디 파트를 추출했어요.";
      case "complete":
        return "완료!";
      default:
        return `알 수 없는 상태입니다. ${currentStep}`;
    }
  };

  const setCurrentStep = () => {
    if (userPreprocess) {
      const currentStep = Object.keys(userPreprocess).find(
        (key) => userPreprocess[key as keyof UserPreprocessType] === null,
      );

      if (currentStep) {
        setStep(currentStep as PreprocessStep);
      } else {
        setStep("complete");
      }
    }
  };

  useEffect(() => {
    setCurrentStep();
  }, [userPreprocess]);

  return (
    <div className="relative flex w-full flex-grow items-end">
      <div
        className={clsx(
          "fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4",
          step !== "complete" && "animate-pulse",
        )}
      >
        {step !== "complete" ? (
          <DotLoader color="#4E81EE" />
        ) : (
          <svg
            width="36"
            height="36"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 8L9.5 13.5L7 11M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
              stroke="#4E81EE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {parseStep(step)}
      </div>
      {step === "complete" && (
        <VtonDiv className="flex h-min w-full">
          <ButtonTo to={PATH.main} className="w-full text-base">
            홈으로
          </ButtonTo>
        </VtonDiv>
      )}
    </div>
  );
}
