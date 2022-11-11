import { useEffect, useRef } from "react";
import PopupWithForm from './PopupWithForm';
import React from 'react';

const EditAvatarPopup = (props) => {
  const { isOpen, onClose, onUpdateAvatar } = props
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    onClose();
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }
    , [isOpen])

  return (<PopupWithForm
    isOpen={isOpen}
    name="avatar"
    onClose={onClose}
    formName="edit-avatar-form"
    title="Обновить аватар"
    buttonText="Сохранить"
    onSubmit={handleSubmit}
  >
    <fieldset className="form__set">
      <input ref={avatarRef} type="url" name="avatar" id="avatar" placeholder="Ссылка на картинку" className="form__input"
        required />
      <span className="form__input-error avatar-error"></span>
    </fieldset>
  </PopupWithForm>)
}

export default EditAvatarPopup;