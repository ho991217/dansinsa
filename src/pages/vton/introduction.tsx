import { Button } from "../../components/common";

import Camera from "../../assets/vton/camera.png";
import { VtonDiv } from "../../components/vton";
import ButtonTo from "../../components/common/button-to";
import { PATH } from "../../constants";

export default function Introduction() {
  return (
    <main className="flex w-full flex-grow flex-col justify-between">
      <div className="flex w-full flex-col gap-3">
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
