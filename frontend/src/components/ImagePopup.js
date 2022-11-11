import React from "react";

const ImagePopup = (props) => {
  return (
    <div className={`popup popup_item-img  ${props.card.name ? "popup_visible" : ""}`}>
      <div className="popup__container popup__container_item_img ">
        <button className=" popup__close popup__close_item_img" type="button" onClick={props.onClose}></button>
        <img className="popup__img" src={props.card.link} alt={props.card.name} />
        <p className="popup__title-img">{props.card.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;