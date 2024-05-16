import React from "react";
import Slider from "./components/Slider";
import Text from "./components/Text";
import Banner from "./components/Banner";
import Image from "./components/Image";
import ImageText from "./components/ImageText";

const Main = () => {
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
    </div>
  );
};

export default Main;
