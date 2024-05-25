import React from "react";

const Banner = (props) => {
  return (
    <section id="bannerType" className={`banner__wrap ${props.element}`}>
      <h2 className="blind">{props.title}</h2>
      <div className="banner__inner">
        {/*<h3 className="title">ADAPTER GitHub</h3>*/}
        <p className="desc">
          {/*<span className="banner-logo-container">
            <img
              src={require("../img/imgLogo_bg01.jpg")}
              alt="Logo"
              className="banner-logo-icon"
            />
            ADAPTER
          </span>*/}
          <br />
          <div className="banner-icon-container">
            <a
              href="https://github.com/myeonghyun-7011/AWS_API_Project1.git"
              title="깃허브 페이지 이동"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={require("../img/icon_github1.png")}
                alt="GitHub Icon"
                className="banner-small-icon"
              />
            </a>
            <a
              href="/"
              title="노션 페이지 이동"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={require("../img/icon_notion.jpg")}
                alt="Notion Icon"
                className="banner-small-icon"
              />
            </a>
          </div>
        </p>
      </div>
    </section>
  );
};

export default Banner;
