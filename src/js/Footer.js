import React, { useEffect } from "react";
import "../css/Footer.css";

const Footer = () => {
  useEffect(() => {
    const checkFooterVisibility = () => {
      const footer = document.querySelector(".footer__right");
      const body = document.body;
      if (body.offsetHeight > window.innerHeight) {
        footer.classList.remove("show");
      } else {
        footer.classList.add("show");
      }
    };

    window.addEventListener("resize", checkFooterVisibility);
    checkFooterVisibility();

    return () => {
      window.removeEventListener("resize", checkFooterVisibility);
    };
  }, []);

  return (
    <footer id="footerType" className="footer__wrap">
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
