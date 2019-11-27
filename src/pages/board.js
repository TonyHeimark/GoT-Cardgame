import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UIfx from 'uifx';

import diceAudio from '../assets/music/dice.mp3';

import { Redirect } from 'react-router-dom';
import { PlayerContext } from '../contexts/playerContextProvider';

import dice1 from '../assets/images/SVG/dice1.svg';
import dice2 from '../assets/images/SVG/dice2.svg';
import dice3 from '../assets/images/SVG/dice3.svg';
import dice4 from '../assets/images/SVG/dice4.svg';
import dice5 from '../assets/images/SVG/dice5.svg';
import dice6 from '../assets/images/SVG/dice6.svg';

import buttonMain from '../assets/images/SVG/button_main.svg';
import buttonHover from '../assets/images/SVG/button_clicked.svg';

import ironThrone from '../assets/images/SVG/iron-throne3.svg';
import winterfell from '../assets/images/SVG/winterfell.svg';
import tyrionHead from '../assets/images/SVG/tyrionHead.svg';
import bridge from '../assets/images/SVG/bridge.svg';
import dragon from '../assets/images/SVG/dragon.svg';
import raven from '../assets/images/SVG/raven.svg';
import guard from '../assets/images/SVG/guard.svg';
import horse from '../assets/images/SVG/horse.svg';
import wolf from '../assets/images/SVG/wolf.svg';
import redArrow from '../assets/images/SVG/redArrow.svg';
import greenArrow from '../assets/images/SVG/greenArrow.svg';

const Board = props => {
  const diceSound = new UIfx(diceAudio);
  const tiles = [];
  const [player1, setPlayer1, player2, setPlayer2] = useContext(PlayerContext);
  const [diceState, setDiceState] = useState(0);

  const [buttonHovered, setButtonHovered] = useState(false);
  const [buttonClicked, setButton] = useState(false);

  const player1Tile = player1.tile;
  const player2Tile = player2.tile;
  const trapTiles = [8, 16, 19, 24, 28];

  const ladderTiles = [5, 14, 23];

  let dice = 0;
  const handleDice = () => {
    diceSound.play();
    dice = Math.floor(Math.random() * 6) + 1;
    handlePlayer();
  };
  // handle turn exchange and tile update
  const handlePlayer = () => {
    setDiceState(dice);
    setTimeout(() => {
      if (player1.turn) {
        setPlayer1(prevState => ({
          ...prevState,
          tile: player1.tile + dice,
          turn: dice === 6 ? true : false
        }));

        setPlayer2(prevState => ({
          ...prevState,

          turn: dice !== 6 ? true : false
        }));
      } else if (player2.turn) {
        setPlayer2(prevState => ({
          ...prevState,
          tile: player2.tile + dice,
          turn: dice === 6 ? true : false
        }));
        setPlayer1(prevState => ({
          ...prevState,
          turn: dice !== 6 ? true : false
        }));
      }
    }, 300);
  };

  // Tiles generator
  const tilesGenerator = () => {
    for (let i = 1; i <= 30; i++) {
      let tile = (
        <div className="board__tile" key={i}>
          <span className="board__tilenr">{i}</span>
          {i === trapTiles[0] ||
          i === trapTiles[1] ||
          i === trapTiles[2] ||
          i === trapTiles[3] ||
          i === trapTiles[4] ? (
            <>
              <img
                className="board__red-arrow"
                src={redArrow}
                alt="red arrow"
              />
              <img
                className={`board__trap${i}`}
                src={
                  i === trapTiles[0]
                    ? tyrionHead
                    : null || i === trapTiles[1]
                    ? bridge
                    : null || i === trapTiles[2]
                    ? dragon
                    : null || i === trapTiles[3]
                    ? raven
                    : null || i === trapTiles[4]
                    ? guard
                    : null
                }
                alt="trap"
              />
            </>
          ) : null}
          {i === ladderTiles[0] ||
          i === ladderTiles[1] ||
          i === ladderTiles[2] ? (
            <>
              <img
                className="board__green-arrow"
                src={greenArrow}
                alt="green arrow"
              />
              <img
                className={`board__ladder${i}`}
                src={
                  i === ladderTiles[0]
                    ? horse
                    : null || i === ladderTiles[1]
                    ? wolf
                    : null || i === ladderTiles[2]
                    ? tyrionHead
                    : null
                }
                alt="ladder"
              />
            </>
          ) : null}
          {i === 1 ? (
            <img
              className="board__winterfell"
              src={winterfell}
              alt="winterfell"
            />
          ) : null}
          {i === 30 ? (
            <img className="board__throne" src={ironThrone} alt="iron throne" />
          ) : null}
          {player1.tile === i ? player1.house : null}
          {player2.tile === i ? player2.house : null}
        </div>
      );
      tiles.push(tile);
    }
    tiles.reverse();
  };
  tilesGenerator();

  // handle tile effects
  useEffect(() => {
    setTimeout(() => {
      if (
        player1Tile === trapTiles[0] ||
        player1Tile === trapTiles[1] ||
        player1Tile === trapTiles[2] ||
        player1Tile === trapTiles[3] ||
        player1Tile === trapTiles[4] ||
        player1Tile === ladderTiles[0] ||
        player1Tile === ladderTiles[1] ||
        player1Tile === ladderTiles[2]
      ) {
        if (player1Tile === trapTiles[0]) {
          alert(
            `A dwarf bought your horse for a future favor and mentioned something about always paying his depts. Anyway, move back 2 steps player 1`
          );
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile - 2
          }));
        } else if (player1Tile === trapTiles[1]) {
          alert(
            `To cross the bridge you have to marry one of Walder Frey's daughters, during the wedding something bad happens and you run back 3 steps player 1`
          );
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile - 3
          }));
        } else if (player1Tile === trapTiles[2]) {
          alert(
            `You spot a blue dragon in the distance, it's probably best to take a different route.. go back 4 steps player 1`
          );
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile - 4
          }));
        } else if (player1Tile === trapTiles[3]) {
          alert(
            `You recieved an important raven from Winterfell, return at once player 1!`
          );
          setPlayer1(prevState => ({
            ...prevState,
            tile: 1
          }));
        } else if (player1Tile === trapTiles[4]) {
          alert(
            `Soldiers have spotted you trying to enter The Red Keep, they chased you back 10 steps player 1`
          );
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile - 10
          }));
        } else if (player1Tile === ladderTiles[0]) {
          alert(
            `You won some gold in a game of Cyvasse, you spent it all on transportation and can now move 12 steps forward player 1`
          );
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile + 12
          }));
        } else if (player1Tile === ladderTiles[1]) {
          alert(
            `You came across a wild dire wolf, turns out he's a good boy and he protects you while moving forward 4 steps player 1`
          );
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile + 4
          }));
        } else if (player1Tile === ladderTiles[2]) {
          alert(
            `You meet the dwarf that owes you a favor, he sneakes you past the guards and into The Red Keep undetected, move forward 6 steps player 1`
          );
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile + 6
          }));
        }
      }

      if (
        player2Tile === trapTiles[0] ||
        player2Tile === trapTiles[1] ||
        player2Tile === trapTiles[2] ||
        player2Tile === trapTiles[3] ||
        player2Tile === trapTiles[4] ||
        player2Tile === ladderTiles[0] ||
        player2Tile === ladderTiles[1] ||
        player2Tile === ladderTiles[2]
      ) {
        if (player2Tile === trapTiles[0]) {
          alert(
            `A dwarf bought your horse for a future favor and mentioned something about always paying his depts. Anyway, move back 2 steps player 2`
          );
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile - 2
          }));
        } else if (player2Tile === trapTiles[1]) {
          alert(
            `To cross the bridge you have to marry one of Walder Frey's daughters, during the wedding something bad happens and you run back 3 steps player 2`
          );
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile - 3
          }));
        } else if (player2Tile === trapTiles[2]) {
          alert(
            `You spot a blue dragon in the distance, it's probably best to take a different route.. go back 4 steps player 2`
          );
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile - 4
          }));
        } else if (player2Tile === trapTiles[3]) {
          alert(
            `You recieved an important raven from Winterfell, return at once player 2!`
          );
          setPlayer2(prevState => ({
            ...prevState,
            tile: 1
          }));
        } else if (player2Tile === trapTiles[4]) {
          alert(
            `Soldiers have spotted you trying to enter The Red Keep, they chased you back 10 steps player 2`
          );
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile - 10
          }));
        } else if (player2Tile === ladderTiles[0]) {
          alert(
            `You won some gold in a game of Cyvasse, you spent it all on transportation and can now move 12 steps forward player 2`
          );
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile + 12
          }));
        } else if (player2Tile === ladderTiles[1]) {
          alert(
            `You came across a wild dire wolf, turns out he's a good boy and he protects you while moving forward 4 steps player 2`
          );
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile + 4
          }));
        } else if (player2Tile === ladderTiles[2]) {
          alert(
            `You meet the dwarf that owes you a favor, he sneakes you past the guards and into The Red Keep undetected, move forward 6 steps player 2`
          );
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile + 6
          }));
        }
      }

      // must hit exactly 30 to win, not over. bounces back from 30 if rolling above.
      if (player1Tile > 30) {
        const setBack = player1Tile - 30;
        alert(
          `You can't seem to find your way to the throne, this moved you back ${setBack} steps player 1`
        );
        setPlayer1(prevState => ({
          ...prevState,
          tile: player1.tile - setBack - setBack
        }));
      }

      if (player2Tile > 30) {
        const setBack = player2Tile - 30;
        alert(
          `You can't seem to find your way to the throne, this moved you back ${setBack} steps player 2`
        );
        setPlayer2(prevState => ({
          ...prevState,
          tile: player2.tile - setBack - setBack
        }));
      }

      //victory handling
      if (player1Tile === 30) {
        setPlayer1(prevState => ({
          ...prevState,
          victory: true
        }));

        setPlayer2(prevState => ({
          ...prevState,
          victory: false
        }));
      }

      if (player2Tile === 30) {
        setPlayer2(prevState => ({
          ...prevState,
          victory: true
        }));

        setPlayer1(prevState => ({
          ...prevState,
          victory: false
        }));
      }
    }, 200);
  }, [player1Tile, player2Tile]);

  return (
    <>
      {player1.victory || player2.victory ? (
        <Redirect push to="/victory" />
      ) : null}
      {player1.character || player2.character ? (
        <div className="board">
          <div className="board__tiles">{tiles.map(tile => tile)}</div>
          <div>
            <div className="board__dice">
              {diceState === 1 ? (
                <img className="board__dice-img" src={dice1} alt="dice" />
              ) : null}
              {diceState === 2 ? (
                <img className="board__dice-img" src={dice2} alt="dice" />
              ) : null}
              {diceState === 3 ? (
                <img className="board__dice-img" src={dice3} alt="dice" />
              ) : null}
              {diceState === 4 ? (
                <img className="board__dice-img" src={dice4} alt="dice" />
              ) : null}
              {diceState === 5 ? (
                <img className="board__dice-img" src={dice5} alt="dice" />
              ) : null}
              {diceState === 6 ? (
                <img className="board__dice-img" src={dice6} alt="dice" />
              ) : null}
            </div>
            <button className="board__button" onClick={handleDice}>
              <img
                onMouseDown={() => {
                  setButtonHovered(true);
                }}
                onMouseUp={() => {
                  setButtonHovered(false);
                }}
                className="board__button-img"
                src={buttonHovered ? buttonHover : buttonMain}
                alt="button"
              />
            </button>
          </div>
          <div className="board__characters">
            <div className="character character--onboard">
              <div className="character__container">
                <span>Player 1</span>
                <span className="character__name">{`${
                  player1.character.firstName ? player1.character.firstName : ''
                } ${
                  player1.character.lastName ? player1.character.lastName : ''
                }`}</span>
                <img
                  className="character__image"
                  src={
                    player1.character.charImg ? player1.character.charImg : ''
                  }
                  alt={`${
                    player1.character.firstName
                      ? player1.character.firstName
                      : ''
                  } ${
                    player1.character.lastName ? player1.character.lastName : ''
                  }`}
                />
              </div>
            </div>
            <div className="character character--onboard">
              <div className="character__container">
                <span>Player 2</span>
                <span className="character__name">{`${
                  player2.character.firstName ? player2.character.firstName : ''
                } ${
                  player2.character.lastName ? player2.character.lastName : ''
                }`}</span>
                <img
                  className="character__image"
                  src={
                    player2.character.charImg ? player2.character.charImg : ''
                  }
                  alt={`${
                    player2.character.firstName
                      ? player2.character.firstName
                      : ''
                  } ${
                    player2.character.lastName ? player2.character.lastName : ''
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="board__shame-message">
          <p>
            Shame, shame, shame, shame...{' '}
            <Link to="/" className="board__shame-link">
              GO BACK
            </Link>{' '}
            and choose a character you halfwit.
          </p>
        </div>
      )}
    </>
  );
};

export default Board;
