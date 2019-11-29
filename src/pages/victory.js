import React, { useContext, useState } from 'react';
import { PlayerContext } from '../contexts/playerContextProvider';
import { Redirect } from 'react-router-dom';

import IronThrone from '../components/ironThrone';

import buttonMainPlay from '../assets/images/SVG/button__main_play.svg';

const Victory = props => {
  const [player1, setPlayer1, player2, setPlayer2] = useContext(PlayerContext);

  const [redirect, setRedirect] = useState(false);

  const jsxRedirect = redirect ? <Redirect push to="/" /> : null;

  return (
    <div className="victory">
      {jsxRedirect}
      <div className="victory__overlay">
        <div className="victory__wrapper">
          <div className="victory__text">
            <h1>
              Take your place on the iron throne Player{' '}
              {player1.victory
                ? player1.player
                : player2.victory
                ? player2.player
                : null}
              {'. '}
              you have deserved it.
            </h1>
            <div className="victory__btn-wrapper">
              <button
                className="victory__btn"
                onClick={() => {
                  setPlayer2(prevState => ({
                    ...prevState,
                    tile: 1,
                    turn: false,
                    victory: false,
                    character: null
                  }));

                  setPlayer1(prevState => ({
                    ...prevState,
                    tile: 1,
                    turn: true,
                    victory: false,
                    character: null
                  }));
                  setRedirect(true);
                }}
              >
                <img
                  className="victory__btn-img"
                  src={buttonMainPlay}
                  alt="button"
                />
              </button>
            </div>
          </div>
          <div className="victory__canvas">
            <IronThrone />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Victory;
