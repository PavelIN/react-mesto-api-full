import React from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom'


const Header = (props) => {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      {location.pathname === '/sign-in' && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === '/sign-up' && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {props.loggedIn && (
        <div className="header__nav">
          <span>{props.email}</span>
          <button className="header__out" onClick={props.onSignOut}>
            Выйти
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;