import React from "react";

const Text = (props) => {
  return (
    <section id="textType" className={`text__wrap ${props.element}`}>
      <span>{props.title}</span>
      <div className="map-title-container">
        <img
          src="https://img.icons8.com/ios/250/000000/waypoint-map.png"
          alt="icon"
          className="map-small-icon"
        />
        <span className="map-title">AWS 리전</span>
      </div>

      {/*<h2 className="map_text_sub_title">AWS 리전</h2>*/}
    </section>
  );
};

export default Text;
