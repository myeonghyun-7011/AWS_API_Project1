import React from "react";
import AccessInfo from "./AccessInfo";

const SubMain = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <AccessInfo />
      <button className="scroll-button" onClick={scrollToTop}>
        <i className="fas fa-arrow-up"></i>
      </button>
      <button className="scroll-button" onClick={scrollToBottom}>
        <i className="fas fa-arrow-down"></i>
      </button>
    </div>
  );
};

export default SubMain;