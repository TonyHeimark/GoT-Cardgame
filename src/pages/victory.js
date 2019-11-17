import React, { useContext, useState } from 'react';
import { PlayerContext } from '../contexts/playerContextProvider';
import IronThrone from '../components/ironThrone';

const Victory = () => {
  const [player1, setPlayer1, player2, setPlayer2] = useContext(PlayerContext);

  return (
    <div className="victory">
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
              <button className="victory__btn">Play again</button>
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
