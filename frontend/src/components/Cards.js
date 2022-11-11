import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = (props) => {
  const сurrentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === сurrentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `${isOwn ? 'element__trash' : 'element__trash_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i === сurrentUser._id);
  const cardLikeButtonClassName = `${isLiked ? 'element__like-btn element__like-btn_active' : 'element__like-btn'}`;

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };

  const handleClick = () => {
    props.onCardClick(props.card);
  };

  const handleDeleteClick = () => {
    props.onTrashClick(props.card._id);
  };

  return (
    <div className="element">
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="element__container">
        <h2 className="element__text">{props.card.name}</h2>
        <div>
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="element__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;