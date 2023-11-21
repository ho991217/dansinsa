import { Button } from "../components/common";
import useAuth from "../hooks/useAuth";
import DefaultLayout from "../layouts/default-layout";

export default function MyPage() {
  const { logout } = useAuth();

  return (
    <DefaultLayout>
      <Button onClick={logout} className="w-full py-3">
        로그아웃
      </Button>
    </DefaultLayout>
  );
}
