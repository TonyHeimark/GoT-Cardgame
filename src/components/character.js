import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PlayerContext } from '../contexts/playerContextProvider';
import UIfx from 'uifx';

import selectAudio from '../assets/music/select.mp3';

const Character = props => {
  const selectSound = new UIfx(selectAudio);
  const character = props.item;
  const { firstName, lastName, charImg } = character;
  const fullName = `${firstName ? firstName : ''} ${lastName ? lastName : ''}`;

  const [redirect, setRedirect] = useState(false);

  const [player1, setPlayer1, player2, setPlayer2] = useContext(PlayerContext);

  const handleSelect = () => {
    selectSound.play();
    selectSound.volume = 0.2;
    if (player1.turn) {
      setPlayer1(prevState => ({
        ...prevState,
        turn: false,
        character,
        tile: 1,
        house: (
          <img
            className="character__house1"
            src={character.charImg}
            alt="player 1"
          />
        )
      }));
      setPlayer2(prevState => ({
        ...prevState,
        turn: true
      }));
    } else if (player2.turn) {
      setPlayer2(prevState => ({
        ...prevState,
        turn: false,
        character,
        tile: 1,
        house: (
          <img
            className="character__house2"
            src={character.charImg}
            alt="player 2"
          />
        )
      }));
      setPlayer1(prevState => ({
        ...prevState,
        turn: true
      }));
      setRedirect(true);
    }
  };

  const jsxRedirect = redirect ? <Redirect push to="/board" /> : null;

  return (
    <div className="character">
      {jsxRedirect}
      <div className="character__container">
        <span className="character__name">{fullName}</span>
        <img
          className="character__image"
          src={charImg ? charImg : ''}
          alt={fullName}
        />
      </div>
      <div className="character__buttons">
        <button
          onClick={props.handleModalCharacter}
          className="character__button"
        >
          See more
        </button>

        <button onClick={handleSelect} className="character__button">
          Select
        </button>
      </div>
    </div>
  );
};

export default Character;
