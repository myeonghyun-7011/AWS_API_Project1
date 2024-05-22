import React, { useState } from "react";
import "../css/LoginForm.css";
import { useNavigate } from "react-router-dom";
import { awsConfig } from "./aws-exports";

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

    // AWS 자격 증명과 입력된 값을 비교하여 검증합니다.
    if (
      accessKeyId === awsConfig.credentials.accessKeyId &&
      accessKeyPw === awsConfig.credentials.secretAccessKey
    ) {
      console.log("로그인 성공");
      navigate("/AccessInfo");
    } else {
      alert("Access 정보가 틀립니다.");
    }
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
      <div className={`region-select ${showRegionList ? "active" : ""}`}>
        {!selectedRegion && <p id="region_title_p">리전을 선택해주세요</p>}
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
            <p id="accesskey">Access_Key_ID</p>
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
            <p id="accesskey">Access_Key_PW</p>
          </label>
          <input
            type="password"
            id="accessKeyPw"
            placeholder="Access Key PW를 입력하세요"
            value={accessKeyPw}
            onChange={(e) => setAccessKeyPw(e.target.value)}
            required
          />

          <button type="submit">Search</button>
        </div>

        {/*<div className="forgot-password">
          비밀번호를 잊어버리셨나요? <a href="#">here</a>
        </div>*/}
      </form>
    </div>
  );
};

export default LoginForm;
