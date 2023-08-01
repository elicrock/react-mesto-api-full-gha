import React, { useEffect } from 'react';
import AuthForm from './AuthForm';
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const Login = ({ onLogin }) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <AuthForm
      title="Вход"
      name="login"
      btnText="Войти"
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input type="email" name="email" className="login__input" minLength="2" maxLength="30" placeholder="Email" value={values.email || ''} onChange={handleChange} required />
      <span className={`login__input-error email-error ${errors.email && 'login__input-error_active'}`}>{errors.email}</span>
      <input type="password" name="password" className="login__input" minLength="6" maxLength="18" placeholder="Пароль" value={values.password || ''} onChange={handleChange} required />
      <span className={`login__input-error password-error ${errors.password && 'login__input-error_active'}`}>{errors.password}</span>
    </AuthForm>
  );
};

export default Login;