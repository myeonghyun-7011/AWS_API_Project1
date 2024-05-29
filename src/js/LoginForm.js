import React, { useState } from "react";
import "../css/LoginForm.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const LoginForm = ({ setResponseData }) => {
  const [access_key_id, setAccessKeyId] = useState("");
  const [secret_access_key, setAccessKeyPw] = useState("");
  const [showRegionList, setShowRegionList] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRegion) {
      alert("리전을 선택해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://fastapi-service:8000/api/metrics",
        {
          access_key_id,
          secret_access_key,
          region_name: selectedRegion,
        }
      );

      setResponseData(response.data);
      navigate("/AccessInfo", {
        state: {
          accessKeyId: access_key_id,
          secretAccessKey: secret_access_key,
          currentRegion: selectedRegion,
        },
      });
    } catch (error) {
      console.error("Error submitting data", error);
      alert("Error submitting data");
    }
  };

  const handleRegionSelect = (region_name) => {
    if (region_name === "ap-northeast-1") {
      setSelectedRegion(region_name);
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

  const region_name = [
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
        {!selectedRegion && <p id="region_title_p">Please select a region.</p>}
        <button onClick={toggleRegionList}>
          {selectedRegion ? `도쿄 (${selectedRegion})` : "리전 선택"} ▼
        </button>
        {!selectedRegion && <p>{alertMessage}</p>}
        <div className="region-list">
          {region_name.map((region_name, index) => (
            <button
              key={index}
              onClick={() => handleRegionSelect(region_name.value)}
              disabled={
                selectedRegion === "ap-northeast-1" &&
                region_name.value !== "ap-northeast-1"
              }
            >
              {region_name.name}
            </button>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="custom-input">
          <label htmlFor="access_key_id">
            <p id="access_key_id">ACCESS_KEY_ID</p>
          </label>
          <input
            type="text"
            id="access_key_id"
            placeholder="Access Key ID를 입력하세요"
            value={access_key_id}
            onChange={(e) => setAccessKeyId(e.target.value)}
            required
          />

          <label htmlFor="secret_access_key">
            <p id="secret_access_key">ACCESS_KEY_PW</p>
          </label>
          <input
            type="password"
            id="secret_access_key"
            placeholder="Access Key PW를 입력하세요"
            value={secret_access_key}
            onChange={(e) => setAccessKeyPw(e.target.value)}
            required
          />

          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
