import React, { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm();
      setValues({
        name: currentUser.name,
        about: currentUser.about
      });
    }
  }, [isOpen, currentUser, setValues, resetForm])

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      btnText={isLoading ? 'Сохранение' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="popup__label">
        <input type="text" name="name" id="user-input" className={`popup__input popup__input_el_name ${errors.name && 'popup__input_type_error'}`} minLength="2" maxLength="40" placeholder="Имя" value={values.name || ''} onChange={handleChange} required />
        <span className={`popup__input-error user-input-error ${errors.name && 'popup__input-error_active'}`}>{errors.name}</span>
      </label>
      <label className="popup__label">
        <input type="text" name="about" id="about-input" className={`popup__input popup__input_el_about ${errors.about && 'popup__input_type_error'}`} minLength="2" maxLength="200" placeholder="О себе" value={values.about || ''} onChange={handleChange} required />
        <span className={`popup__input-error user-input-error ${errors.about && 'popup__input-error_active'}`}>{errors.about}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;