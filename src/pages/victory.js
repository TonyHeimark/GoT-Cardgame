import React, { useContext, useState } from "react";
import { PlayerContext } from "../contexts/playerContextProvider";

const Victory = () => {
  const [player1, setPlayer1, player2, setPlayer2] = useContext(PlayerContext);

  return (
    <div>
      <div>
        <h1>
          VICTORYYY! Congratulations Player{" "}
          {player1.victory
            ? player1.player
            : player2.victory
            ? player2.player
            : null}
        </h1>
      </div>
    </div>
  );
};

export default Victory;
