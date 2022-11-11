import React from 'react';


const Login = ({ onLogin}) => {

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
    if (!enteredValues.email || !enteredValues.password) {
      return;
    }
    onLogin(enteredValues);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" noValidate onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          value={enteredValues.email || ""}
          onChange={handleChange}
        />
        <input
          type="password"
          minLength="8"
          name="password"
          id="password"
          placeholder="Пароль"
          value={enteredValues.password || ""}
          onChange={handleChange}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;