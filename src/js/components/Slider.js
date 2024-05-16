import React from "react";

const Slider = (props) => {
  return (
    <section id="sliderType" className={`slider__wrap ${props.element}`}>
      <h2 className="blind">슬라이드 유형</h2>
      <div className="slider__inner">
        <div className="slider">
          <div className="slider__img">
            <div className="desc">
              <span>Adapter</span>
              <h3>the best Team</h3>
              <p>
                우리조 무리하지 말아요! 이미 당신은 잘하고 있고!
                <br />
                앞으로도 잘 할 수 있어요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
