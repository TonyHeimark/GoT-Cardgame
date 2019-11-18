import React, { useContext, useEffect, useState } from 'react';

import { Redirect } from 'react-router-dom';
import { PlayerContext } from '../contexts/playerContextProvider';

import spider from '../assets/images/SVG/spider-solid.svg';
import ladder from '../assets/images/SVG/ladder.svg';
import ironThrone from '../assets/images/SVG/iron-throne3.svg';
import winterfell from '../assets/images/SVG/winterfell.svg';

const Board = props => {
  const tiles = [];
  const [player1, setPlayer1, player2, setPlayer2] = useContext(PlayerContext);
  const [diceState, setDiceState] = useState(0);

  const player1Tile = player1.tile;
  const player2Tile = player2.tile;
  const trapTiles = [8, 16, 19, 24, 28];

  const ladderTiles = [5, 14, 23];

  let dice = 0;
  const handleDice = () => {
    dice = Math.floor(Math.random() * 6) + 1;
    handlePlayer();
  };
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
          <span className="board__tilenr">{i}</span>
          {i === trapTiles[0] ||
          i === trapTiles[1] ||
          i === trapTiles[2] ||
          i === trapTiles[3] ||
          i === trapTiles[4] ? (
            <img className="board__trap" src={spider} alt="trap" />
          ) : null}
          {i === ladderTiles[0] ||
          i === ladderTiles[1] ||
          i === ladderTiles[2] ||
          i === ladderTiles[3] ||
          i === ladderTiles[4] ? (
            <img className="board__ladder" src={ladder} alt="trap" />
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
          alert('trap1');
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile - 2
          }));
        } else if (player1Tile === trapTiles[1]) {
          alert('trap2');
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile - 3
          }));
        } else if (player1Tile === trapTiles[2]) {
          alert('trap3');
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile - 4
          }));
        } else if (player1Tile === trapTiles[3]) {
          alert('trap4');
          setPlayer1(prevState => ({
            ...prevState,
            tile: 1
          }));
        } else if (player1Tile === trapTiles[4]) {
          alert('trap5');
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile - 10
          }));
        } else if (player1Tile === ladderTiles[0]) {
          alert('ladder1');
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile + 12
          }));
        } else if (player1Tile === ladderTiles[1]) {
          alert('ladder2');
          setPlayer1(prevState => ({
            ...prevState,
            tile: player1.tile + 4
          }));
        } else if (player1Tile === ladderTiles[2]) {
          alert('ladder3');
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
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile - 2
          }));
          alert('trap1');
        } else if (player2Tile === trapTiles[1]) {
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile - 3
          }));
          alert('trap2');
        } else if (player2Tile === trapTiles[2]) {
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile - 4
          }));
          alert('trap3');
        } else if (player2Tile === trapTiles[3]) {
          setPlayer2(prevState => ({
            ...prevState,
            tile: 1
          }));
          alert('trap4');
        } else if (player2Tile === trapTiles[4]) {
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile - 10
          }));
          alert('trap5');
        } else if (player2Tile === ladderTiles[0]) {
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile + 12
          }));
          alert('ladder1');
        } else if (player2Tile === ladderTiles[1]) {
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile + 4
          }));
          alert('ladder2');
        } else if (player2Tile === ladderTiles[2]) {
          setPlayer2(prevState => ({
            ...prevState,
            tile: player2.tile + 6
          }));
          alert('ladder3');
        }
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
    }, 200);
  }, [player1Tile, player2Tile]);

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
            {player1.turn ? player1.player : player2.turn ? player2.player : ''}
          </button>
        </div>
        {player1.character || player2.character ? (
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
