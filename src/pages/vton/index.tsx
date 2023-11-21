import { Outlet } from "react-router-dom";
import DefaultLayout from "../../layouts/default-layout";

export default function Vton() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}
