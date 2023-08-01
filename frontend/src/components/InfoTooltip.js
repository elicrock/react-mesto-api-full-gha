import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";
import successfullIcon from "../images/successfull-icon.svg"
import notSuccessfullIcon from "../images/notsuccessfull-icon.svg"

function InfoTooltip({ isOpen, onClose, isRegisterMessage }) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup popup_type_info-tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container-tooltip">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <img
          src={isRegisterMessage ? successfullIcon : notSuccessfullIcon}
          alt={isRegisterMessage ? 'Успешная регистрация' : 'Ошибка регистрации'} className="popup__img-tooltip"
        />
        <h2 className="popup__title-tooltip">
          {isRegisterMessage ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;