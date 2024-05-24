import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import scrollIcon from "../img/scroll_w.png";
import LoadingSpinner from "./LoadingSpinner";

const VideoPlayer = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollOffset((prevOffset) => (prevOffset === 10 ? 0 : 10));
    }, 10000);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleButtonClick = () => {
    window.location.href = "/LoginForm";
  };

  return (
    <div style={{ position: "relative" }}>
      {loading && <LoadingSpinner />}
      <ReactPlayer
        url="https://myvideo-1.s3.ap-northeast-1.amazonaws.com/video/video1.mp4"
        padding-left="10px"
        width="99%"
        height="65%"
        playing={true}
        muted={true}
        controls={false}
        loop={true}
      />
      <div
        className="scroll-icon-container"
        style={{ bottom: `${20 + scrollOffset}px` }}
      >
        <img src={scrollIcon} alt="Scroll Down" className="scroll-icon" />
      </div>
      <div className="text-on-the-button">
        <p className="intro-text">AWS Instance Optimization Service</p>
        <p className="sub-text">ADAPTER의 서비스를 무료로 체험해보세요</p>
      </div>
      <button className="get-started-button" onClick={handleButtonClick}>
        Get Started
      </button>
    </div>
  );
};

export default VideoPlayer;
