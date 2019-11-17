import React from 'react';
import logo from '../assets/images/SVG/logo-white.svg';

const Header = props => {
  return (
    <header className="header">
      <div className="header__logo-wrapper">
        <img className="header__logo" alt="logo" src={logo} />
      </div>
      <div className="header__copyright">&copy; 2019 Tony Heimark</div>
    </header>
  );
};

export default Header;
