import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import scrollIcon from "../img/scroll_w.png";

const VideoPlayer = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollOffset((prevOffset) => (prevOffset === 10 ? 0 : 10));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <ReactPlayer
        url={process.env.PUBLIC_URL + "/videos/video1.mp4"}
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
    </div>
  );
};

export default VideoPlayer;
