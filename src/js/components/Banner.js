import React from "react";

const Banner = (props) => {
  return (
    <section id="bannerType" className={`banner__wrap ${props.element}`}>
      <h2 className="blind">{props.title}</h2>
      <div className="banner__inner">
        {/*<h3 className="title">ADAPTER GitHub</h3>*/}
        <p className="desc">
          <span>ADAPTER 팀에 대해 좀 더 알고 싶다면?</span>
          <br />
          <a
            href="https://github.com/myeonghyun-7011/AWS_API_Project1.git"
            title="깃허브 페이지 이동"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/myeonghyun-7011/AWS_API_Project1.git
          </a>
        </p>
        {/*<span className="small">배너 유형01</span>*/}
      </div>
    </section>
  );
};

export default Banner;
