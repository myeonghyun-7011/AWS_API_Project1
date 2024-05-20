import React from "react";

const ImageLogo = (props) => {
  return (
    <div className="imgLogo__inner container">
      <img
        src={require("../img/imgLogo_bg01.jpg")}
        alt="ADAPTER"
        className="imgLogo__img img1"
      ></img>
      <h3 id="LogoText">ADAPTER</h3>
    </div>
  );
};

export default ImageLogo;
