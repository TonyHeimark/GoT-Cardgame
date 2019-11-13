import React, { useContext, useEffect, useState } from "react";

import { Redirect } from "react-router-dom";
import { PlayerContext } from "../contexts/playerContextProvider";

import spider from "../assets/images/SVG/spider-solid.svg";

const Board = props => {
  const tiles = [];
  const [player1, setPlayer1, player2, setPlayer2] = useContext(PlayerContext);
  const [diceState, setDiceState] = useState(0);

  const player1Tile = player1.tile;
  const player2Tile = player2.tile;

  let dice = 0;
  const handleDice = () => {
    dice = Math.floor(Math.random() * 6) + 1;
    handlePlayer();
  };

  // handle tile effects
  useEffect(() => {
    if (
      player1Tile === 7 ||
      player1Tile === 11 ||
      player1Tile === 16 ||
      player1Tile === 22 ||
      player1Tile === 28
    ) {
      alert("ahh sorry player 1, back you go");
      setTimeout(() => {
        if (player1Tile === 7) {
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile - 3
          }));
        } else if (player1Tile === 11) {
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile - 3
          }));
        } else if (player1Tile === 16) {
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile - 7
          }));
        } else if (player1Tile === 22) {
          setPlayer1(prevState => ({
            ...prevState,
            tile: 1
          }));
        } else if (player1Tile === 28) {
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile - 10
          }));
        } else {
        }
      }, 500);
    }

    if (
      player2Tile === 7 ||
      player2Tile === 11 ||
      player2Tile === 16 ||
      player2Tile === 22 ||
      player2Tile === 28
    ) {
      alert("aww player 2, step back 3 steps");
      setTimeout(() => {
        if (player2Tile === 7) {
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile - 3
          }));
        } else if (player2Tile === 11) {
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile - 3
          }));
        } else if (player2Tile === 16) {
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile - 7
          }));
        } else if (player2Tile === 22) {
          setPlayer2(prevState => ({
            ...prevState,
            tile: 1
          }));
        } else if (player2Tile === 28) {
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile - 10
          }));
        } else {
        }
      });
    }

    // must hit exactly 30 to win, not over. bounces back from 30 if rolling above.
    if (player1Tile > 30) {
      const setBack = player1Tile - 30;
      setPlayer1(prevState => ({
        ...prevState,
        tile: player1.tile - setBack - setBack
      }));
    }

    if (player2Tile > 30) {
      const setBack = player2Tile - 30;
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
  }, [player1Tile, player2Tile]);

  // handle turn exchange and tile update
  const handlePlayer = () => {
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
    setDiceState(dice);
  };

  // Tiles generator
  const tilesGenerator = () => {
    for (let i = 1; i <= 30; i++) {
      let tile = (
        <div className="board__tile" key={i}>
          {i}
          {i === 7 || i === 11 || i === 16 || i === 22 || i === 28 ? (
            <img src={spider} alt="trap" />
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

  return (
    <>
      {player1.victory || player2.victory ? (
        <Redirect push to="/victory" />
      ) : null}
      <div className="board">
        <div className="board__tiles">{tiles.map(tile => tile)}</div>
        <div>
          <div className="board__dice">{diceState}</div>
          <button className="board__button" onClick={handleDice}>
            Roll the dice player
            {player1.turn ? player1.player : player2.turn ? player2.player : ""}
          </button>
        </div>
        {player1.character || player2.character ? (
          <div className="board__characters">
            <div className="character character--onboard">
              <div className="character__container">
                <span>Player 1</span>
                <span className="character__name">{`${
                  player1.character.firstName ? player1.character.firstName : ""
                } ${
                  player1.character.lastName ? player1.character.lastName : ""
                }`}</span>
                <img
                  className="character__image"
                  src={
                    player1.character.charImg ? player1.character.charImg : ""
                  }
                  alt={`${
                    player1.character.firstName
                      ? player1.character.firstName
                      : ""
                  } ${
                    player1.character.lastName ? player1.character.lastName : ""
                  }`}
                />
              </div>
            </div>
            <div className="character character--onboard">
              <div className="character__container">
                <span>Player 2</span>
                <span className="character__name">{`${
                  player2.character.firstName ? player2.character.firstName : ""
                } ${
                  player2.character.lastName ? player2.character.lastName : ""
                }`}</span>
                <img
                  className="character__image"
                  src={
                    player2.character.charImg ? player2.character.charImg : ""
                  }
                  alt={`${
                    player2.character.firstName
                      ? player2.character.firstName
                      : ""
                  } ${
                    player2.character.lastName ? player2.character.lastName : ""
                  }`}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            Shame, shame, shame, shame... GO BACK and choose a character dammit.
          </div>
        )}
      </div>
    </>
  );
};

export default Board;
