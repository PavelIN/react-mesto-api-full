
import PopupWithForm from './PopupWithForm';
import React from 'react';

const ConfirmationPopup = (props) => {

  const handleDeleteClick = () => {
    props.onCardDelete(props.cardId);
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleDeleteClick();
    props.onClose();
  }

  return (<PopupWithForm
    name="delete-card"
    onClose={props.onClose}
    formName="add-form"
    title="Вы уверены?"
    buttonText="Да"
    onSubmit={handleSubmit}
    isOpen={props.isOpen}
  >
    <fieldset className="form__set">
    </fieldset>
  </PopupWithForm>)
}

export default ConfirmationPopup;