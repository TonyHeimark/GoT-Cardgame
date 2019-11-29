import React from 'react';
import buttonMain from '../assets/images/SVG/button_main.svg';

const boardModal = props => {
  return (
    <div className="board-modal">
      <div className="board-modal__background">
        <div className="board-modal__wrapper">
          <div className="board-modal__content">
            <img
              className="board-modal__img"
              src={props.modalContent.modalImg}
              alt="modal image"
            />
            <p className="board-modal__text">{props.modalContent.modalText}</p>
            <button className="board-modal__button" onClick={props.handleModal}>
              <img
                className="board-modal__btn-img"
                src={buttonMain}
                alt="button"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default boardModal;
