import React from 'react';
import Card from './Cards';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = (props) => {
    const сurrentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__container">
                    <img className="profile__avatar" src={сurrentUser.avatar} alt="фото профиля" />
                    <button className="profile__avatar-btn" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <div className="profile__info-container">
                        <h1 className="profile__subtitle">{сurrentUser.name}</h1>
                        <button className="profile__edit-btn" onClick={props.onEditProfile} type="button"></button>
                    </div>
                    <p className="profile__title">{сurrentUser.about}</p>
                </div>
                <button className="profile__image-btn" onClick={props.onAddPlace} type="button"></button>
            </section>
            <section className="elements">
                {props.cards.map((card) => {
                    return (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onTrashClick={props.onTrashClick} />
                    );
                })}
            </section>
        </main>
    );
};

export default Main;