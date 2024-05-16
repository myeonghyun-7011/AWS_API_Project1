import React from "react";
import "../css/Footer.css";

const Footer = (props) => {
  return (
    <footer id="footerType" className={`footer__wrap ${props.element}`}>
      <div className="footer__inner container">
        
        <div className="footer__right">
          2022 Webstoryboy. Portfolio is Power
          <br />
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
