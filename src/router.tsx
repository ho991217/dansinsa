import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import MyPage from "./pages/mypage";
import Vton from "./pages/vton";
import ImageRegister from "./pages/vton/image-register";
import Introduction from "./pages/vton/introduction";

import { PATH } from "./constants";
import CheckCapture from "./pages/vton/check-capture";
import UserSize from "./pages/vton/user-size";
import UserHeight from "./pages/vton/user-height";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.main} element={<Home />} />
        <Route path={PATH.login} element={<Login />} />
        <Route path={PATH.mypage} element={<MyPage />} />
        <Route path={PATH.vton.root} element={<Vton />}>
          <Route path={PATH.vton.intro} element={<Introduction />} />
          <Route path={PATH.vton.image.capture} element={<ImageRegister />} />
          <Route path={PATH.vton.image.check} element={<CheckCapture />} />
          <Route path={PATH.vton.height} element={<UserHeight />} />
          <Route path={PATH.vton.size} element={<UserSize />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
