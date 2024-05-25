import React from "react";
import "../css/Recommend.css";

const Recommend = ({ responseData }) => {
  return (
    <div className="info">
      <h2>추천 리스트 TOP 10</h2>
      <div className="Recommend-container">
        <div>{/*<h2>TOP 10</h2>*/}</div>
        <div className="Recommend-con">
          {responseData ? (
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          ) : (
            <p>데이터를 불러오는 중...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
