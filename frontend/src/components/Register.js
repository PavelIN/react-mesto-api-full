import { Link } from 'react-router-dom';
import React from 'react';

const Register = ({ onRegister }) => {

  const [enteredValues, setEnteredValues] = React.useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEnteredValues({
      ...enteredValues,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(enteredValues);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="form auth__form" onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={enteredValues.email || ""}
          onChange={handleChange}
        />
        <input
          id="password"
          name="password"
          type="password"
          minLength="8"
          placeholder="Пароль"
          value={enteredValues.password || ""}
          onChange={handleChange}
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="auth__login-hint">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
};

export default Register;