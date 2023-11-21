import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import MyPage from "./pages/mypage";
import Vton from "./pages/vton";
import ImageRegister from "./pages/vton/image-register";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/vton" element={<Vton />}>
          <Route path="image/register" element={<ImageRegister />} />
          <Route path=":id" element={<div>Detail</div>} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
