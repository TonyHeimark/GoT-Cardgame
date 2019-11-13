import React, { useContext } from "react";
import Header from "../components/header";
import Layout from "../components/layout";
import Character from "../components/character";
import { PlayerContext } from "../contexts/playerContextProvider";

import arya from "../assets/images/SVG/arya.svg";
import daenerys from "../assets/images/SVG/daenerys.svg";
import drogo from "../assets/images/SVG/drogo.svg";
import margaery from "../assets/images/SVG/margaery.svg";
import worm from "../assets/images/SVG/worm.svg";
import varys from "../assets/images/SVG/varys.svg";
import oberyn from "../assets/images/SVG/oberyn.svg";
import petyr from "../assets/images/SVG/petyr.svg";
import melisandre from "../assets/images/SVG/melisandre.svg";
import syrio from "../assets/images/SVG/syrio.svg";
// import gregor from "./assets/images/SVG/gregor.svg";
// import jorah from "./assets/images/SVG/jorah.svg";
// import missandei from "./assets/images/SVG/missandei.svg";
// import sandor from "./assets/images/SVG/sandor.svg";

const CharSelect = props => {
  const characterList = [
    {
      firstName: "Grey",
      lastName: "Worm",
      charImg: worm
    },
    {
      firstName: "Daenerys",
      lastName: "Targaryen",
      charImg: daenerys
    },
    {
      firstName: "Arya",
      lastName: "Stark",
      charImg: arya
    },
    {
      firstName: "Oberyn",
      lastName: "Martell",
      charImg: oberyn
    },
    {
      firstName: "Drogo",
      charImg: drogo
    },
    {
      firstName: "Petyr",
      lastName: "Baelish",
      charImg: petyr
    },
    {
      firstName: "Melisandre",
      charImg: melisandre
    },
    {
      firstName: "Margaery",
      lastName: "Tyrell",
      charImg: margaery
    },
    {
      firstName: "Varys",
      charImg: varys
    },
    {
      firstName: "Syrio",
      lastName: "Forel",
      charImg: syrio
    }
  ];

  const [player1, setPlayer1, player2, setPlayer2] = useContext(PlayerContext);

  const characters = characterList.filter(char => {
    if (player1.character && player1.character.firstName) {
      return char.firstName !== player1.character.firstName;
    }
    return char;
  });
  console.log(characters);

  return (
    <>
      <Header />
      <Layout>
        <div>
          <h1>
            Choose your character player{" "}
            {player1.turn ? player1.player : player2.turn ? player2.player : ""}
          </h1>
        </div>
        <div className="characters">
          {characters.map(char => {
            return <Character item={char} key={char.firstName} />;
          })}
        </div>
      </Layout>
    </>
  );
};

export default CharSelect;
