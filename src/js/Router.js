import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import Main from "./Main";
import SubMain from "./SubMain";

const Router = ({ setResponseData, responseData }) => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/LoginForm" element={<LoginForm setResponseData={setResponseData} />} />
      <Route path="/AccessInfo" element={<SubMain responseData={responseData} />} />
    </Routes>
  );
};

export default Router;
