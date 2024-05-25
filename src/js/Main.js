import React from "react";
import Text from "./components/Text";
import Banner from "./components/Banner";
import Image from "./components/Image";
import MapText from "./components/MapText";
import Map from "./components/Map";
import VideoPlayer from "./components/VideoPlayer";

const Main = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <VideoPlayer />
      <br />
      <br />
      <Text />
      <Image />
      <MapText />
      <Map />
      <br />
      <Banner />
      <button className="scroll-button" onClick={scrollToTop}>
        <i className="fas fa-arrow-up"></i>
      </button>
      <button className="scroll-button" onClick={scrollToBottom}>
        <i className="fas fa-arrow-down"></i>
      </button>
    </div>
  );
};

export default Main;
