import React, { useContext, useEffect, useState } from "react";

import { PlayerContext } from "../contexts/playerContextProvider";

const Board = props => {
  const tiles = [];
  const [player1, setPlayer1, player2, setPlayer2] = useContext(PlayerContext);
  const [diceState, setDiceState] = useState(0);
  let dice = 0;
  const handleDice = () => {
    dice = Math.floor(Math.random() * 6) + 1;
    handlePlayer();
  };

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
  console.log(dice);
  // Tiles generator

  const tilesGenerator = () => {
    for (let i = 1; i <= 30; i++) {
      let tile = (
        <div className="board__tile" key={i}>
          {i}
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
