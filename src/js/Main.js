import React from "react";
import Slider from "./components/Slider";
import Text from "./components/Text";
import Banner from "./components/Banner";
import Image from "./components/Image";
import ImageText from "./components/ImageText";

const Main = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <div>
      <hr />
      <br />
      <Slider />
      <hr />
      <br />
      <Image />
      <hr />
      <br />
      <ImageText />
      <hr />
      <br />
      <Banner />
      <hr />
      <br />
      <Text />
      <hr />
      <br />
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
