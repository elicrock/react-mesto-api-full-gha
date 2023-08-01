import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const avatarRef = useRef();
  const { handleChange, errors, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  useEffect(() => {
    if (avatarRef.current) {
      resetForm();
      avatarRef.current.value = '';
    }
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      btnText={isLoading ? 'Сохранение' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="popup__label">
        <input ref={avatarRef} type="url" name="avatar" id="link-avatar" className="popup__input popup__input_el_url-avatar" placeholder="Ссылка на картинку" onChange={handleChange} required />
        <span className={`popup__input-error link-avatar-error ${errors.avatar && 'popup__input-error_active'}`}>{errors.avatar}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;