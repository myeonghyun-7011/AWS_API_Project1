import React from "react";

const Footer = (props) => {
  return (
    <footer id="footerType" className={`footer__wrap ${props.element}`}>
      <h2 className="blind">푸터 영역</h2>
      <div className="footer__inner container">
        <div className="footer__right">
          ADAPTER ⓒ 2024 All Rights Reserved. Kakao Cloud Engineer 4th Final
          Project
        </div>
      </div>
    </footer>
  );
};

export default Footer;
