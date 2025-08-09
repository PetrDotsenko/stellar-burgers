import React, { SyntheticEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useForm } from '../../utils/useForm';
import { Preloader } from '@ui';
import { register } from '../../services/slices/user-slice';

// данные формы регистрации
type TRegisterForm = {
  name: string;
  email: string;
  password: string;
};

export const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // начальное состояние формы
  const { values, handleChange } = useForm<TRegisterForm>({
    name: '',
    email: '',
    password: ''
  });

  // получаем статус загрузки
  const isSending = useSelector((state) => state.auth.loading);

  // отправка формы
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    // отправляем данные
    dispatch(register(values)).then(() => {
      navigate(from, { replace: true });
    });
  };

  if (isSending) {
    return <Preloader />;
  }

  // отображаем форму
  return (
    <RegisterUI
      email={values.email}
      password={values.password}
      userName={values.name}
      setEmail={handleChange}
      setPassword={handleChange}
      setUserName={handleChange}
      handleSubmit={handleSubmit}
      errorText=''
    />
  );
};
