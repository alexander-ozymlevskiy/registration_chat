import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    password2: '',
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };
    setFormData(updatedFormData);
    validateField(name, value, updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Форма успешно отправлена', formData);
      setErrors({});
      navigate('/chat');
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.email) errors.email = 'Укажите E-Mail';
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Неверный формат E-Mail';

    if (!data.fullName) errors.fullName = 'Укажите полное имя';

    if (!data.password) errors.password = 'Укажите пароль';

    if (!data.password2) errors.password2 = 'Подтвердите пароль';
    else if (data.password !== data.password2) errors.password2 = 'Пароли не совпадают';

    return errors;
  };

  const validateField = (name, value, updatedFormData) => {
    let fieldError = '';
    switch (name) {
      case 'email':
        if (!value) fieldError = 'Укажите E-Mail';
        else if (!/\S+@\S+\.\S+/.test(value)) fieldError = 'Неверный формат E-Mail';
        break;
      case 'fullName':
        if (!value) fieldError = 'Укажите полное имя';
        break;
      case 'password':
        if (!value) fieldError = 'Укажите пароль';
        break;
      case 'password2':
        if (!value) fieldError = 'Подтвердите пароль';
        else if (value !== updatedFormData.password) fieldError = 'Пароли не совпадают';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldError }));
  };

  return (
    <div className="app">
      <div className="banner">
        <div className="banner__inner">
        <img src="/chat.png" alt="Chat logo" />
          <h2>Общайся с друзьями</h2>
          <p>Быстрый и удобный чат для общения с друзьями или коллегами по работе</p>
        </div>
      </div>
      <div className="form">
        <div className="form__content">
          <h2>Регистрация</h2>
          <p>Для того, чтобы войти в чат, необходимо авторизоваться</p>
          <form onSubmit={handleSubmit}>
            <div className={`form__field ${errors.email ? 'error' : ''}`}>
              <input
                type="text"
                name="email"
                placeholder="E-Mail"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span>{errors.email}</span>}
              {formData.email && !errors.email && (
                <svg className="check" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm5.707,8.707-7,7a1,1,0,0,1-1.414,0l-3-3a1,1,0,0,1,1.414-1.414L10,14.586l6.293-6.293a1,1,0,0,1,1.414,1.414Z" />
                </svg>
              )}
            </div>
            <div className={`form__field ${errors.fullName ? 'error' : ''}`}>
              <input
                type="text"
                name="fullName"
                placeholder="Полное имя"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <span>{errors.fullName}</span>}
              {formData.fullName && !errors.fullName && (
                <svg className="check" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm5.707,8.707-7,7a1,1,0,0,1-1.414,0l-3-3a1,1,0,0,1,1.414-1.414L10,14.586l6.293-6.293a1,1,0,0,1,1.414,1.414Z" />
                </svg>
              )}
            </div>
            <div className={`form__field ${errors.password ? 'error' : ''}`}>
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span>{errors.password}</span>}
            </div>
            <div className={`form__field ${errors.password2 ? 'error' : ''}`}>
              <input
                type="password"
                name="password2"
                placeholder="Подтверждение пароля"
                value={formData.password2}
                onChange={handleChange}
              />
              {errors.password2 && <span>{errors.password2}</span>}
            </div>
            <div className="form__additional">
              <div>
                <input
                  className="styled-checkbox"
                  id="checkbox"
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <label htmlFor="checkbox">Запомнить</label>
              </div>
              <a href="/">Забыл пароль?</a>
            </div>
            <button type="submit">Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
