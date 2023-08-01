import React from "react";
import { Link } from "react-router-dom";

function AuthForm({ title, name, btnText, children, onSubmit, isValid, onRegister }) {

  return (
    <div className="login">
      <h2 className="login__title">{title}</h2>
      <form className="login__form" name={name} onSubmit={onSubmit} noValidate>
        {children &&
          <div className="login__inputs">
            {children}
          </div>
        }
        <button type="submit" className={`login__button ${!isValid && 'login__button_disabled'}`} disabled={!isValid}>{btnText}</button>
      </form>
      {onRegister &&
        <p className="login__sign-in">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link></p>
      }
    </div>
  );
}

export default AuthForm;