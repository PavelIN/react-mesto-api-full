import { useEffect, useRef } from "react";
import PopupWithForm from './PopupWithForm';
import React from 'react';

const AddPlacePopup = (props) => {
    const { isOpen, onClose, onAddPlace } = props
    const nameRef = useRef();
    const linkRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value,
        });
        onClose();
    }

    useEffect(() => {
        nameRef.current.value = "";
        linkRef.current.value = "";
    }
        , [isOpen])

    return (<PopupWithForm
        isOpen={isOpen}
        name="url"
        onClose={onClose}
        formName="add-form"
        title="Новое место"
        buttonText="Создать"
        onSubmit={handleSubmit}
    >
        <fieldset className="form__set">
            <input ref={nameRef} id="title" className="form__input form__input_item_target" type="text" name="name"
                placeholder="Название" required minLength="2" maxLength="30" />
            <span className="form__input-error title-error"></span>
            <input ref={linkRef} id="link" className="form__input form__input_item_url" type="url" name="link"
                placeholder="Ссылка на картинку" required />
            <span className="form__input-error link-error"></span>
        </fieldset>
    </PopupWithForm>)
}

export default AddPlacePopup;