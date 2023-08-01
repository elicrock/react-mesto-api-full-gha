import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i._id !== currentUser._id);

  const cardLikeButtonClassName = (
    `element__like-btn ${isLiked && 'element__like-btn_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="element">
      {isOwn && <button className="element__delete-btn" onClick={handleDeleteClick} />}
      <img src={card.link} alt={`${card.name} (фото)`} className="element__img" onClick={handleClick} />
      <div className="element__caption">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="element__likes-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;