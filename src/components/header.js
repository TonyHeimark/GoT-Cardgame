import React, { useContext, useState } from 'react';
import { PlayerContext } from '../contexts/playerContextProvider';
import logo from '../assets/images/SVG/logo-white.svg';

const Header = props => {
  const [player1, setPlayer1, player2, setPlayer2] = useContext(PlayerContext);

  return (
    <header className="header">
      <div className="header__logo-wrapper">
        <img className="header__logo" alt="logo" src={logo} />
      </div>
      {player1.turn ? (
        <span className="header__turn">
          Your turn Player <span> {player1.player}</span>
        </span>
      ) : (
        <span className="header__turn">
          Your turn Player <span> {player2.player}</span>
        </span>
      )}
      <div className="header__copyright">&copy; 2019 Tony Heimark</div>
    </header>
  );
};

export default Header;
