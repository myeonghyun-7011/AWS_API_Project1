import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  return (
    <ReactPlayer
      url={process.env.PUBLIC_URL + "/videos/video1.mp4"}
      padding-left="5px"
      width="99%"
      height="70%"
      playing={true}
      muted={true}
      controls={false}
      loop={true}
    />
  );
};

export default VideoPlayer;
