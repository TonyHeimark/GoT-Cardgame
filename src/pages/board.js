import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { PlayerContext } from '../contexts/playerContextProvider';
import BoardModal from '../components/boardModal';
import UIfx from 'uifx';
import diceAudio from '../assets/music/dice.mp3';

// dice svgs
import dice1 from '../assets/images/SVG/dice1.svg';
import dice2 from '../assets/images/SVG/dice2.svg';
import dice3 from '../assets/images/SVG/dice3.svg';
import dice4 from '../assets/images/SVG/dice4.svg';
import dice5 from '../assets/images/SVG/dice5.svg';
import dice6 from '../assets/images/SVG/dice6.svg';

// Button svgs
import buttonMain from '../assets/images/SVG/button_main.svg';
import buttonDisabled from '../assets/images/SVG/button_clicked.svg';

// Tile svgs
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
  const [buttonOneClicked, setButtonOneClicked] = useState(false);
  const [buttonTwoClicked, setButtonTwoClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setmodalContent] = useState({
    modalText: '',
    modalImg: null
  });
  const [confirmedTileEffect, setConfirmedTileEffect] = useState(false);

  const player1Tile = player1.tile;
  const player2Tile = player2.tile;

  const trapTiles = [8, 16, 19, 24, 28];
  const ladderTiles = [5, 14, 23];

  let dice = 0;
  const resetDice = e => {
    if (e.target.id === 'player1Button') {
      setButtonOneClicked(true);
    } else if (e.target.id === 'player2Button') {
      setButtonTwoClicked(true);
    }
    setDiceState(0);
    setTimeout(() => {
      handleDice();
    }, 300);
  };
  const handleDice = () => {
    dice = Math.floor(Math.random() * 6) + 1;
    diceSound.play();
    setDiceState(dice);
    setTimeout(() => {
      handlePlayer();
      setButtonOneClicked(false);
      setButtonTwoClicked(false);
    }, 1200);
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
  };

  //handle modal and confirmed tileEffect
  const handleModal = (modalText, modalImg) => {
    if (!isModalOpen) {
      setIsModalOpen(true);
      setmodalContent({ modalText: modalText, modalImg: modalImg });
    } else if (isModalOpen) {
      setIsModalOpen(false);
      setConfirmedTileEffect(true);
    }
    setTimeout(() => {
      setConfirmedTileEffect(false);
    }, 500);
  };

  // Tiles generator
  const tilesGenerator = () => {
    for (let i = 1; i <= 30; i++) {
      let tile = (
        <div
          className={`board__tile board__tile${i}`}
          style={{ gridArea: `tile${i}` }}
          key={i}
        >
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
          if (confirmedTileEffect) {
            setPlayer1(prevState => ({
              ...prevState,
              tile: player1.tile - 2
            }));
          } else {
            handleModal(
              `A dwarf bought your horse for a future favor and mentioned something about always paying his depts. Anyway, move back 2 steps player 1`,
              tyrionHead
            );
          }
        } else if (player1Tile === trapTiles[1]) {
          if (confirmedTileEffect) {
            setPlayer1(prevState => ({
              ...prevState,
              tile: player1.tile - 3
            }));
          } else {
            handleModal(
              `To cross the bridge you have to marry one of Walder Frey's daughters, during the wedding something bad happens and you run back 3 steps player 1`,
              bridge
            );
          }
        } else if (player1Tile === trapTiles[2]) {
          if (confirmedTileEffect) {
            setPlayer1(prevState => ({
              ...prevState,
              tile: player1.tile - 4
            }));
          } else {
            handleModal(
              `You spot a blue dragon in the distance, it's probably best to take a different route.. go back 4 steps player 1`,
              dragon
            );
          }
        } else if (player1Tile === trapTiles[3]) {
          if (confirmedTileEffect) {
            setPlayer1(prevState => ({
              ...prevState,
              tile: 1
            }));
          } else {
            handleModal(
              `You recieved an important raven from Winterfell, return at once player 1!`,
              raven
            );
          }
        } else if (player1Tile === trapTiles[4]) {
          if (confirmedTileEffect) {
            setPlayer1(prevState => ({
              ...prevState,
              tile: player1.tile - 10
            }));
          } else {
            handleModal(
              `Soldiers have spotted you trying to enter The Red Keep, they chased you back 10 steps player 1`,
              guard
            );
          }
        } else if (player1Tile === ladderTiles[0]) {
          if (confirmedTileEffect) {
            setPlayer1(prevState => ({
              ...prevState,
              tile: player1.tile + 12
            }));
          } else {
            handleModal(
              `You won some gold in a game of Cyvasse, you spent it all on transportation and can now move 12 steps forward player 1`,
              horse
            );
          }
        } else if (player1Tile === ladderTiles[1]) {
          if (confirmedTileEffect) {
            setPlayer1(prevState => ({
              ...prevState,
              tile: player1.tile + 4
            }));
          } else {
            handleModal(
              `You came across a wild dire wolf, turns out he's a good boy and he protects you while moving forward 4 steps player 1`,
              wolf
            );
          }
        } else if (player1Tile === ladderTiles[2]) {
          if (confirmedTileEffect) {
            setPlayer1(prevState => ({
              ...prevState,
              tile: player1.tile + 6
            }));
          } else {
            handleModal(
              `You meet the dwarf that owes you a favor, he sneakes you past the guards and into The Red Keep undetected, move forward 6 steps player 1`,
              tyrionHead
            );
          }
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
          if (confirmedTileEffect) {
            setPlayer2(prevState => ({
              ...prevState,
              tile: player2.tile - 2
            }));
          } else {
            handleModal(
              `A dwarf bought your horse for a future favor and mentioned something about always paying his depts. Anyway, move back 2 steps player 2`,
              tyrionHead
            );
          }
        } else if (player2Tile === trapTiles[1]) {
          if (confirmedTileEffect) {
            setPlayer2(prevState => ({
              ...prevState,
              tile: player2.tile - 3
            }));
          } else {
            handleModal(
              `To cross the bridge you have to marry one of Walder Frey's daughters, during the wedding something bad happens and you run back 3 steps player 2`,
              bridge
            );
          }
        } else if (player2Tile === trapTiles[2]) {
          if (confirmedTileEffect) {
            setPlayer2(prevState => ({
              ...prevState,
              tile: player2.tile - 4
            }));
          } else {
            handleModal(
              `You spot a blue dragon in the distance, it's probably best to take a different route.. go back 4 steps player 2`,
              dragon
            );
          }
        } else if (player2Tile === trapTiles[3]) {
          if (confirmedTileEffect) {
            setPlayer2(prevState => ({
              ...prevState,
              tile: 1
            }));
          } else {
            handleModal(
              `You recieved an important raven from Winterfell, return at once player 2!`,
              raven
            );
          }
        } else if (player2Tile === trapTiles[4]) {
          if (confirmedTileEffect) {
            setPlayer2(prevState => ({
              ...prevState,
              tile: player2.tile - 10
            }));
          } else {
            handleModal(
              `Soldiers have spotted you trying to enter The Red Keep, they chased you back 10 steps player 2`,
              guard
            );
          }
        } else if (player2Tile === ladderTiles[0]) {
          if (confirmedTileEffect) {
            setPlayer2(prevState => ({
              ...prevState,
              tile: player2.tile + 12
            }));
          } else {
            handleModal(
              `You won some gold in a game of Cyvasse, you spent it all on transportation and can now move 12 steps forward player 2`,
              horse
            );
          }
        } else if (player2Tile === ladderTiles[1]) {
          if (confirmedTileEffect) {
            setPlayer2(prevState => ({
              ...prevState,
              tile: player2.tile + 4
            }));
          } else {
            handleModal(
              `You came across a wild dire wolf, turns out he's a good boy and he protects you while moving forward 4 steps player 2`,
              wolf
            );
          }
        } else if (player2Tile === ladderTiles[2]) {
          if (confirmedTileEffect) {
            setPlayer2(prevState => ({
              ...prevState,
              tile: player2.tile + 6
            }));
          } else {
            handleModal(
              `You meet the dwarf that owes you a favor, he sneakes you past the guards and into The Red Keep undetected, move forward 6 steps player 2`,
              tyrionHead
            );
          }
        }
      }

      //victory handling
      if (player1Tile >= 30) {
        setPlayer1(prevState => ({
          ...prevState,
          victory: true
        }));

        setPlayer2(prevState => ({
          ...prevState,
          victory: false
        }));
      }

      if (player2Tile >= 30) {
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
  }, [player1Tile, player2Tile, confirmedTileEffect]);

  return (
    <>
      {isModalOpen ? (
        <BoardModal modalContent={modalContent} handleModal={handleModal} />
      ) : null}
      {player1.victory || player2.victory ? (
        <Redirect push to="/victory" />
      ) : null}
      {player1.character || player2.character ? (
        <div className="board">
          <div className="board__tiles">{tiles.map(tile => tile)}</div>
          <div>
            <div className="board__dice">
              {diceState === 1 ? (
                <img
                  className="board__dice-img"
                  style={{
                    animation: `bounce 1s`
                  }}
                  src={dice1}
                  alt="dice"
                />
              ) : null}
              {diceState === 2 ? (
                <img
                  className="board__dice-img"
                  style={{
                    animation: `bounce 1s`
                  }}
                  src={dice2}
                  alt="dice"
                />
              ) : null}
              {diceState === 3 ? (
                <img
                  className="board__dice-img"
                  style={{
                    animation: `bounce 1s`
                  }}
                  src={dice3}
                  alt="dice"
                />
              ) : null}
              {diceState === 4 ? (
                <img
                  className="board__dice-img"
                  style={{
                    animation: `bounce 1s`
                  }}
                  src={dice4}
                  alt="dice"
                />
              ) : null}
              {diceState === 5 ? (
                <img
                  className="board__dice-img"
                  style={{
                    animation: `bounce 1s`
                  }}
                  src={dice5}
                  alt="dice"
                />
              ) : null}
              {diceState === 6 ? (
                <img
                  className="board__dice-img"
                  style={{
                    animation: `bounce 1s`
                  }}
                  src={dice6}
                  alt="dice"
                />
              ) : null}
            </div>
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
              <button
                disabled={player2.turn || buttonOneClicked}
                className="board__button"
                onClick={resetDice}
              >
                <img
                  id="player1Button"
                  className="board__button-img board__button--player1"
                  src={player2.turn ? buttonDisabled : buttonMain}
                  alt="button"
                />
              </button>
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
              <button
                className="board__button board__button--player2"
                disabled={player1.turn || buttonTwoClicked}
                onClick={resetDice}
              >
                <img
                  id="player2Button"
                  className="board__button-img"
                  src={player1.turn ? buttonDisabled : buttonMain}
                  alt="button"
                />
              </button>
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
