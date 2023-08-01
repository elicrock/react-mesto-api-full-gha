import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card, onClose }) {
  usePopupClose(card?.link, onClose);
  return (
    <div className={`popup popup_type_view-image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container-image">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <img src={`${card ? card.link : ''}`} alt={`${card ? `${card.name} (фото)` : ''}`} className="popup__img" />
        <h2 className="popup__title-img">{`${card ? card.name : ''}`}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;