import React, { useContext, useState } from 'react';
import Character from '../components/character';
import CharModal from '../components/charModal';
import { PlayerContext } from '../contexts/playerContextProvider';

import arya from '../assets/images/SVG/arya.svg';
import daenerys from '../assets/images/SVG/daenerys.svg';
import drogo from '../assets/images/SVG/drogo.svg';
import margaery from '../assets/images/SVG/margaery.svg';
import worm from '../assets/images/SVG/worm.svg';
import varys from '../assets/images/SVG/varys.svg';
import petyr from '../assets/images/SVG/petyr.svg';
import melisandre from '../assets/images/SVG/melisandre.svg';
import syrio from '../assets/images/SVG/syrio.svg';

const CharSelect = props => {
  //initial list of characters to choose from
  const characterList = [
    {
      firstName: 'Grey',
      lastName: 'Worm',
      charImg: worm
    },
    {
      firstName: 'Daenerys',
      lastName: 'Targaryen',
      charImg: daenerys
    },
    {
      firstName: 'Arya',
      lastName: 'Stark',
      charImg: arya
    },
    {
      firstName: 'Drogo',
      charImg: drogo
    },
    {
      firstName: 'Petyr',
      lastName: 'Baelish',
      charImg: petyr
    },
    {
      firstName: 'Melisandre',
      charImg: melisandre
    },
    {
      firstName: 'Margaery',
      lastName: 'Tyrell',
      charImg: margaery
    },
    {
      firstName: 'Varys',
      charImg: varys
    },
    {
      firstName: 'Syrio',
      lastName: 'Forel',
      charImg: syrio
    }
  ];

  const [player1, setPlayer1, player2, setPlayer2] = useContext(PlayerContext);
  const [modalCharacter, setModalCharacter] = useState(null);

  const characters = characterList.filter(char => {
    if (player1.character && player1.character.firstName) {
      return char.firstName !== player1.character.firstName;
    }
    return char;
  });

  const handleModalCharacter = e => {
    if (!modalCharacter) {
      const name = e.target.parentNode.parentNode.children[0].children[0].innerHTML.split(
        ' '
      );
      const firstName = name[0];
      setModalCharacter(firstName);
    } else if (modalCharacter) {
      setModalCharacter(null);
    }
  };

  return (
    <>
      {modalCharacter ? (
        <CharModal
          item={characters.filter(char => char.firstName === modalCharacter)}
          handleModalCharacter={handleModalCharacter}
        />
      ) : null}
      <div className="character-select">
        <div className="character-select__heading">
          <h1>
            Choose your character player{' '}
            {player1.turn ? (
              <span className="character-select__player">1</span>
            ) : player2.turn ? (
              <span className="character-select__player">2</span>
            ) : null}
          </h1>
        </div>
        <div className="character-select__characters">
          {characters.map(char => {
            return (
              <Character
                item={char}
                key={char.firstName}
                handleModalCharacter={handleModalCharacter}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CharSelect;
