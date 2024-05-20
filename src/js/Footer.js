import React from "react";

const Footer = (props) => {
  return (
    <footer id="footerType" className={`footer__wrap ${props.element}`}>
      <h2 className="blind">푸터 영역</h2>
      <div className="footer__inner container">
        <div className="footer__right">
          KAKAO CLOUD ENGINEER 4th FINAL PROJECT <br />
          ADAPTER ⓒ 2024 All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
