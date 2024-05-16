import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const HeaderNav = () => {
  return (
    <header className="header">
      <h1 className="logo">ADAPOTR</h1>
      <nav className="navigation">
        <Link to="/">HOME</Link>
        <Link to="/LoginForm">Access_Info</Link>
      </nav>
    </header>
  );
};

export default HeaderNav;
