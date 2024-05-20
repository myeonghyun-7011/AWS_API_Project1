import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import ImageLogo from "./components/ImageLogo";

const HeaderNav = () => {
  return (
    <header className="header">
      <div>
        <ImageLogo />
      </div>
      <nav className="navigation">
        <Link to="/">HOME</Link>
        <Link to="/LoginForm">Access_Info</Link>
      </nav>
    </header>
  );
};

export default HeaderNav;
