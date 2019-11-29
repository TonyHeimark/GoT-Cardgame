import React, { useState, useEffect, useContext } from 'react';
import { PlayerContext } from '../contexts/playerContextProvider';
import { Redirect } from 'react-router-dom';
import UIfx from 'uifx';

import selectAudio from '../assets/music/select.mp3';

const CharModal = props => {
  const selectSound = new UIfx(selectAudio);
  const character = props.item[0];
  const [charData, setCharData] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const [player1, setPlayer1, player2, setPlayer2] = useContext(PlayerContext);

  const API = `https://anapioficeandfire.com/api/characters?name=${
    character && character.firstName ? character.firstName : ''
  }${character && character.lastName ? '+' : ''}${
    character && character.lastName ? character.lastName : ''
  }`;

  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(data => setCharData(data));
  }, []);

  const handleSelect = () => {
    selectSound.play();
    if (player1.turn) {
      setPlayer1(prevState => ({
        ...prevState,
        turn: false,
        character,
        tile: 1,
        house: (
          <img
            className="character__house1"
            src={character ? character.charImg : ''}
            alt="player 1"
          />
        )
      }));
      setPlayer2(prevState => ({
        ...prevState,
        turn: true
      }));
      props.handleModalCharacter();
    } else if (player2.turn) {
      setPlayer2(prevState => ({
        ...prevState,
        turn: false,
        character,
        tile: 1,
        house: (
          <img
            className="character__house2"
            src={character ? character.charImg : ''}
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

  console.log(charData);

  const jsxRedirect = redirect ? <Redirect push to="/board" /> : null;

  return (
    <div className="charModal">
      {jsxRedirect}
      <div
        className="charModal__background"
        onClick={props.handleModalCharacter}
      ></div>
      <div className="charModal__wrapper">
        <div className="charModal__close-wrapper">
          <button
            aria-label="closes modal"
            className="charModal__close"
            onClick={props.handleModalCharacter}
          >
            X
          </button>
        </div>
        <div className="charModal__content">
          <div className="charModal__heading">
            {character ? (
              <h2>
                {character.firstName} {character.lastName}
              </h2>
            ) : null}
          </div>
          {/*
          <div className="charModal__canvas">
              <Char3d />
          </div>
              */}
          <div className="charModal__image-container">
            <img
              className="charModal__image"
              src={character.charImg}
              alt="character"
            />
          </div>

          <div className="charModal__info">
            <div className="charModal__column">
              {charData && charData.length > 1 && charData[1].aliases ? (
                <>
                  <span className="charModal__info-heading">Aliases</span>
                  <ul className="charModal__list">
                    {charData[1].aliases.map(alias => (
                      <li className="charModal__list-item" key={alias}>
                        <span>{alias === '' ? 'No aliases' : alias}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : charData && charData.length === 1 && charData[0].aliases ? (
                <>
                  <span className="charModal__info-heading">Aliases</span>
                  <ul className="charModal__list">
                    {charData[0].aliases.map(alias => (
                      <li className="charModal__list-item" key={alias}>
                        <span>{alias === '' ? 'No aliases' : alias}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
            <div className="charModal__column">
              {charData && charData.length > 1 && charData[1].tvSeries ? (
                <>
                  <span className="charModal__info-heading">Seasons</span>
                  <ul className="charModal__list">
                    {charData[1].tvSeries.map(series => (
                      <li className="charModal__list-item" key={series}>
                        <span>{series === '' ? 'No series' : series}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : charData && charData.length === 1 && charData[0].tvSeries ? (
                <>
                  <span className="charModal__info-heading">Seasons</span>
                  <ul className="charModal__list">
                    {charData[0].tvSeries.map(series => (
                      <li className="charModal__list-item" key={series}>
                        <span>{series === '' ? 'No series' : series}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>

            <div className="charModal__button-container">
              <button onClick={handleSelect} className="character__button">
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharModal;
