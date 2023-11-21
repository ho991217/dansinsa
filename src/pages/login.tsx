import { useState } from "react";
import useAuth from "../hooks/useAuth";
import DefaultLayout from "../layouts/default-layout";
import { Button, Input } from "../components/common";
import LoginPerson from "../assets/login/login_person.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, logout, isLoggedIn } = useAuth();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login({ email, password });
    } catch (error) {
      alert(error);
    }
  };

  const onClick = async () => {
    console.log(await isLoggedIn());
  };

  return (
    <DefaultLayout className="h-[70vh] justify-between pt-10" hasBackButton>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-bold text-white">LOGIN</h1>
        <h1 className="text-sm text-white">
          서비스 이용을 위해 로그인이 필요합니다.
        </h1>
      </div>
      <img
        src={LoginPerson}
        alt="img"
        className="fixed top-0 -z-10 h-[110%] object-cover brightness-[50%]"
      />
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col items-center gap-4"
      >
        <Input
          id="email"
          type="email"
          value={email}
          placeholder="이메일을 입력해주세요."
          onChange={(e) => setEmail(e.target.value)}
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33335 3.33333H16.6667C17.5834 3.33333 18.3334 4.08333 18.3334 5V15C18.3334 15.9167 17.5834 16.6667 16.6667 16.6667H3.33335C2.41669 16.6667 1.66669 15.9167 1.66669 15V5C1.66669 4.08333 2.41669 3.33333 3.33335 3.33333Z"
                stroke="#BABABA"
                strokeWidth="1.56522"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.3334 5L10 10.8333L1.66669 5"
                stroke="#BABABA"
                strokeWidth="1.56522"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <Input
          id="password"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요."
          onChange={(e) => setPassword(e.target.value)}
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 9.16666H4.16667C3.24619 9.16666 2.5 9.91286 2.5 10.8333V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V10.8333C17.5 9.91286 16.7538 9.16666 15.8333 9.16666Z"
                stroke="#BABABA"
                strokeWidth="1.56522"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.83331 9.16666V5.83333C5.83331 4.72826 6.2723 3.66845 7.0537 2.88705C7.8351 2.10565 8.89491 1.66666 9.99998 1.66666C11.105 1.66666 12.1649 2.10565 12.9463 2.88705C13.7277 3.66845 14.1666 4.72826 14.1666 5.83333V9.16666"
                stroke="#BABABA"
                strokeWidth="1.56522"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <Button onClick={onClick} type="submit" className="mt-10 w-full py-3">
          로그인
        </Button>
      </form>
    </DefaultLayout>
  );
}
