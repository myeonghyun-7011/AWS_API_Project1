import React from "react";
import { useLocation } from "react-router-dom";
import "../css/AccessInfo.css";

const AccessInfo = () => {
  const location = useLocation();
  const { accessKeyId, accessKeyPw, selectedRegion } = location.state || {};

  return (
    <div className="info">
      <h2>Access Information</h2>
      <div>
        <p>
          <b>Region:</b> {selectedRegion}
        </p>
        <p>
          <b>Access Key ID:</b> {accessKeyId}
        </p>
        <p>
          <b>Access Key PW:</b> {accessKeyPw}
        </p>
      </div>
    </div>
  );
};

export default AccessInfo;
