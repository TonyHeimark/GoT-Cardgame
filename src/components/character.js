import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { PlayerContext } from "../contexts/playerContextProvider";

import house1 from "../assets/images/SVG/house1.svg";
import house2 from "../assets/images/SVG/house2.svg";

const Character = props => {
  const character = props.item;
  const { firstName, lastName, charImg } = character;
  const fullName = `${firstName ? firstName : ""} ${lastName ? lastName : ""}`;

  const [redirect, setRedirect] = useState(false);

  const [player1, setPlayer1, player2, setPlayer2] = useContext(PlayerContext);

  const handleSelect = () => {
    if (player1.turn) {
      setPlayer1(prevState => ({
        ...prevState,
        turn: false,
        character,
        tile: 1,
        house: <img src={house1} alt="player 1" />
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
        house: <img src={house2} alt="player 2" />
      }));
      setPlayer1(prevState => ({
        ...prevState,
        turn: true
      }));
      setRedirect(true);
    }
  };

  const jsx = redirect ? <Redirect push to="/board" /> : null;

  return (
    <div className="character">
      {jsx}
      <div className="character__container">
        <span className="character__name">{fullName}</span>
        <img
          className="character__image"
          src={charImg ? charImg : ""}
          alt={fullName}
        />
      </div>
      <div className="character__buttons">
        <button className="character__button">See more</button>

        <button onClick={handleSelect} className="character__button">
          Select
        </button>
      </div>
    </div>
  );
};

export default Character;
