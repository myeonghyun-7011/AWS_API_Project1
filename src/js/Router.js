import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import Main from "./Main";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/LoginForm" element={<LoginForm />} />
    </Routes>
  );
};

export default Router;
