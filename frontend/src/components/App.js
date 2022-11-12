import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, useHistory } from 'react-router-dom';
import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {
  const hist = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [selectDelete, setSelectDelete] = React.useState(false);
  const [removedCardId, setRemovedCardId] = React.useState('');

  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  const handleUpdateUser = (newUserInfo) => {
    api
      .editUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  const handleUpdateAvatar = (newAvatar) => {
    api
      .editAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  const handleAddPlaceSubmit = (newData) => {
    api
      .addCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const openInfoTooltip = () => {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  };

  const handleCardClick = card => {
    setSelectedCard(card);
  };

  const handleRemoveClick = (cardId) => {
    setSelectDelete(!selectDelete);
    setRemovedCardId(cardId);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setSelectDelete(false);
    setIsInfoTooltipOpen(false);
  };


  const handleRegistration = (data) => {
    return auth
      .register(data)
      .then(() => {
        setIsRegistrationSuccessful(true);
        openInfoTooltip();
        hist.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccessful(false);
        openInfoTooltip();
      });
  }

  const handleAuthorization = (data) => {
    return auth
      .authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        handleTokenCheck();
        hist.push('/');
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccessful(false);
        openInfoTooltip();
      });
  }

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((data) => {
        setUserEmail(data.email);
        setCurrentUser(data);
        setIsLoggedIn(true);
        hist.push('/');
      })
      .catch((err) => console.log(err));
      api
      .getInitialCards(jwt)
      .then((initialCards) => {
        setCards(initialCards)
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn]);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    setUserEmail(" ");
    hist.push('/sign-in');
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
          <Header email={userEmail} loggedIn={isLoggedIn} onSignOut={handleSignOut} />
          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleAuthorization}/>
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegistration} />
            </Route>
            <ProtectedRoute
              path="/"
              component={Main}
              loggedIn={isLoggedIn}
              onTrashClick={handleRemoveClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
            />
          </Switch>
          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <ConfirmationPopup cardId={removedCardId} isOpen={selectDelete} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} onCardDelete={handleCardDelete} />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} isSuccess={isRegistrationSuccessful} />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
