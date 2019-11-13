import React, { useState, createContext } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = props => {
  const [player1, setPlayer1] = useState({
    player: 1,
    turn: true
  });
  const [player2, setPlayer2] = useState({
    player: 2,
    turn: false
  });
  return (
    <PlayerContext.Provider value={[player1, setPlayer1, player2, setPlayer2]}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
