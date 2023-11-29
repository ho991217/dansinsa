import { VtonDiv } from "../../components/vton";
import Button from "../../components/common/button";
import { PATH } from "../../constants";
import { Input } from "../../components/common";
import { useState } from "react";
import supabase from "../../supabase";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function UserHeight() {
  const [height, setHeight] = useState("");
  const navigate = useNavigate();
  const { getUserId } = useAuth();

  const onNext = async () => {
    const userId = await getUserId();
    if (!userId) return;
    if (!height) return;

    try {
      await supabase.from("b_user_height").upsert({
        user_id: userId,
        b_height: parseInt(height),
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
    navigate(PATH.vton.size);
  };

  return (
    <main className="flex w-full flex-grow flex-col justify-between">
      <div className="flex w-full flex-col gap-1">
        <VtonDiv delay={0.5}>이제 사용자님의</VtonDiv>
        <VtonDiv delay={1.2}>신체 사이즈를 예상해볼게요.</VtonDiv>
        <VtonDiv delay={2} className="mb-10">
          먼저, 키를 입력해주세요.
        </VtonDiv>
        <VtonDiv delay={2.7}>
          <Input
            className="text-base font-normal outline-none"
            placeholder="키를 입력해주세요."
            unit="cm"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </VtonDiv>
      </div>
      <VtonDiv delay={2.7}>
        <Button
          onClick={onNext}
          className="w-full text-base"
          disabled={!height}
        >
          치수 측정하기
        </Button>
      </VtonDiv>
    </main>
  );
}
