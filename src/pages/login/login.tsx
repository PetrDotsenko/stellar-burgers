import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { login, setLoginSuccess } from '../../services/slices/user-slice';
import { Preloader } from '@ui';

type LoginForm = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const isLoading = useSelector((state) => state.auth.loading);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        dispatch(setLoginSuccess(true));
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error('Ошибка входа:', error);
      });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={(e) => setEmail(e.target.value)}
      password={password}
      setPassword={(e) => setPassword(e.target.value)}
      handleSubmit={handleFormSubmit}
    />
  );
};
