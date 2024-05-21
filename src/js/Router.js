import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import Main from "./Main";
import SubMain from "./SubMain";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/LoginForm" element={<LoginForm />} />
      <Route path="/AccessInfo" element={<SubMain />} />
    </Routes>
  );
};

export default Router;
