import React from 'react';

const boardModal = props => {
  return (
    <div className="board-modal">
      <div className="board-modal__background">
        <div className="board-modal__wrapper">
          <div className="board-modal__content">
            <p className="board-modal__text">{props.modalText}</p>
            <button onClick={props.handleModal}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default boardModal;
