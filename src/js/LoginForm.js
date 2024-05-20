import React, { useState } from "react";
import "../css/LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [accessKeyId, setAccessKeyId] = useState("");
  const [accessKeyPw, setAccessKeyPw] = useState("");
  const [showRegionList, setShowRegionList] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRegion) {
      alert("리전을 선택해주세요.");
      return;
    }

    // 서버로의 요청을 시뮬레이션하는 대신, 로그인 데이터를 콘솔에 출력합니다.
    console.log("Access Key ID:", accessKeyId);
    console.log("Access Key PW:", accessKeyPw);

    // 로그인이 성공하면 "/" 경로로 이동합니다.
    navigate("/AccessInfo");
  };

  const handleRegionSelect = (region) => {
    if (region === "ap-northeast-1") {
      setSelectedRegion(region);
      setShowRegionList(false);
      setAlertMessage("");
    } else {
      setSelectedRegion("");
      alert("도쿄만 선택이 가능합니다.");
    }
  };

  const toggleRegionList = () => {
    setShowRegionList((prevState) => !prevState);
  };

  const regions = [
    { name: "리전을 선택해주세요.", value: "null" },
    { name: "미국 동부 (버지니아 북부)", value: "us-east-1" },
    { name: "미국 동부 (오하이오)", value: "us-east-2" },
    { name: "미국 서부 (캘리포니아)", value: "us-west-1" },
    { name: "미국 서부 (오레곤)", value: "us-west-2" },
    { name: "아시아 태평양 (뭄바이)", value: "ap-south-1" },
    { name: "아시아 태평양 (오사카)", value: "ap-northeast-3" },
    { name: "아시아 태평양 (서울)", value: "ap-northeast-2" },
    { name: "아시아 태평양 (싱가포르)", value: "ap-southeast-1" },
    { name: "아시아 태평양 (시드니)", value: "ap-southeast-2" },
    { name: "아시아 태평양 (도쿄)", value: "ap-northeast-1" },
    { name: "캐나다 (중부)", value: "ca-central-1" },
    { name: "유럽 (프랑크푸르트)", value: "eu-central-1" },
    { name: "유럽 (아일랜드)", value: "eu-west-1" },
    { name: "유럽 (런던)", value: "eu-west-2" },
    { name: "유럽 (파리)", value: "eu-west-3" },
  ];

  return (
    <div className="login-container">
      <h2>LOGIN</h2>
      <div className={`region-select ${showRegionList ? "active" : ""}`}>
        {!selectedRegion && <p>리전을 선택해주세요</p>}
        <button onClick={toggleRegionList}>
          {selectedRegion ? `도쿄 (${selectedRegion})` : "리전 선택"} ▼
        </button>
        {!selectedRegion && <p>{alertMessage}</p>}
        <div className="region-list">
          {regions.map((region, index) => (
            <button
              key={index}
              onClick={() => handleRegionSelect(region.value)}
              disabled={
                selectedRegion === "ap-northeast-1" &&
                region.value !== "ap-northeast-1"
              }
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="custom-input">
          <label htmlFor="accessKeyId">
            <b>Access_Key_ID</b>
          </label>
          <input
            type="text"
            id="accessKeyId"
            placeholder="Access Key ID를 입력하세요"
            value={accessKeyId}
            onChange={(e) => setAccessKeyId(e.target.value)}
            required
          />

          <label htmlFor="accessKeyPw">
            <b>Access_Key_PW</b>
          </label>
          <input
            type="password"
            id="accessKeyPw"
            placeholder="Access Key PW를 입력하세요"
            value={accessKeyPw}
            onChange={(e) => setAccessKeyPw(e.target.value)}
            required
          />

          <button type="submit">Access</button>
        </div>

        <div className="forgot-password">
          <a>
            비밀번호를 잊어버리셨나요? <a href="#">here</a>
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
