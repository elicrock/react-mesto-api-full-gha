import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      btnText={isLoading ? 'Сохранение' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="popup__label">
        <input type="text" name="name" id="place-input" className={`popup__input popup__input_el_name-place ${errors.name && 'popup__input_type_error'}`} minLength="2" maxLength="30" placeholder="Название" value={values.name || ''} onChange={handleChange} required />
        <span className={`popup__input-error place-input-error ${errors.name && 'popup__input-error_active'}`}>{errors.name}</span>
      </label>
      <label className="popup__label">
        <input type="url" name="link" id="link-place" className={`popup__input popup__input_el_url-place ${errors.link && 'popup__input_type_error'}`} placeholder="Ссылка на картинку" value={values.link || ''} onChange={handleChange} required />
        <span className={`popup__input-error link-place-error ${errors.link && 'popup__input-error_active'}`}>{errors.link}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;