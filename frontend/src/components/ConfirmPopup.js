import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ card, isOpen, onClose, onCardDelete }) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm title="Вы уверены?" name="confirmation" btnText="Да" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonStyles="popup__confirmation-btn" isValid={true} />
  )
}

export default ConfirmPopup;