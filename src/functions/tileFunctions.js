import tyrionHead from '../assets/images/SVG/tyrionHead.svg';
import bridge from '../assets/images/SVG/bridge.svg';
import dragon from '../assets/images/SVG/dragon.svg';
import raven from '../assets/images/SVG/raven.svg';
import guard from '../assets/images/SVG/guard.svg';
import horse from '../assets/images/SVG/horse.svg';
import wolf from '../assets/images/SVG/wolf.svg';

export const handleTrapsAndLadders = (
  player1Tile,
  player2Tile,
  trapTiles,
  ladderTiles,
  setPlayer1,
  setPlayer2,
  player1,
  player2,
  handleModal,
  confirmedTileEffect
) => {
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
};

export const handleVictory = (
  player1Tile,
  player2Tile,
  setPlayer1,
  setPlayer2
) => {
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
};
