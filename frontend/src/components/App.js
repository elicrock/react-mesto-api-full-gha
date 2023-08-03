import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import * as auth from "../utils/auth"

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterMessage, setIsRegisterMessage] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData.reverse());
      })
      .catch(err => {
        console.error(`Не удалось получить данные. ${err}`);
      });
    }
  }, [isLoggedIn])

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmClick(card) {
    setIsConfirmPopupOpen(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setIsInfoTooltip(true);
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function onLogin({ email, password }) {
    auth.authorize(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        setUserEmail(email);
        navigate('/', {replace: true});
      })
      .catch(err => {
        console.error(`Что-то пошло не так! ${err}`);
      })
  }

  function onRegister({ email, password }) {
    auth.register(email, password)
      .then(() => {
        setIsRegisterMessage(true);
        handleInfoTooltip();
        navigate('/sign-in', {replace: true});
      })
      .catch((err) => {
        setIsRegisterMessage(false);
        handleInfoTooltip();
        console.error('Произошла ошибка выполнения запроса:', err);
      })
  }

  function checkToken() {
    auth.getContent()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
          setUserEmail(res.email);
          navigate('/', {replace: true});
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.error('Произошла ошибка выполнения запроса:', err);
      })
  }

  function signOut() {
    auth.logout()
      .then(res => {
        if (res) {
          setIsLoggedIn(false);
          navigate('/sign-in', {replace: true});
          setCurrentUser({});
        }
      })
      .catch(err => {
        console.error('Произошла ошибка выполнения запроса:', err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    async function makeRequest() {
      const newCard = await api.changeLikeCardStatus(card._id, isLiked);
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }
    handleSubmit(makeRequest);
  }

  function handleCardDelete(card) {
    async function makeRequest() {
      await api.deleteCard(card._id);
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateUser({ name, about }) {
    function makeRequest() {
      return api.updateUserInfo(name, about).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar({ avatar }) {
    function makeRequest() {
      return api.updateUserAvatar(avatar).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit({ name, link }) {
    async function makeRequest() {
      const newCard = await api.addNewCard(name, link);
      setCards([newCard, ...cards]);
    }
    handleSubmit(makeRequest);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard(null);
    setIsConfirmPopupOpen(null);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} link="/sign-in" linkText="Выйти" email={userEmail} signOut={signOut}/>
                <ProtectedRoute
                  element={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmClick}
                  isLoggedIn={isLoggedIn}
                />
                <Footer />
              </>
            }
          />
          <Route path="/sign-up"
            element={
              <>
                <Header linkText="Войти" link="/sign-in" />
                <Register onRegister={onRegister} />
              </>
            }
          />
          <Route path="/sign-in"
            element={
              <>
                <Header linkText="Регистрация" link="/sign-up" />
                <Login onLogin={onLogin} />
              </>
            }
          />
          <Route path="*" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="sign-in" replace />} />
        </Routes>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmPopup
          card={isConfirmPopupOpen}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          isRegisterMessage={isRegisterMessage}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
