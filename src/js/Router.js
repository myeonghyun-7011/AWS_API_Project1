import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import Slider from "./components/Slider";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Slider />} />
      <Route path="/LoginForm" element={<LoginForm />} />
    </Routes>
  );
};

export default Router;
