import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

type FormValues = {
  email: string;
};

export const ForgotPassword: React.FC = () => {
  // Состояние для email
  const [emailValue, setEmailValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  // Когда пользователь вводит email
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  // Обработка формы
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);

    forgotPasswordApi({ email: emailValue })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((error: any) => {
        setErrorMessage(error?.message || 'Произошла ошибка');
      });
  };

  return (
    <ForgotPasswordUI
      errorText={errorMessage || ''}
      email={emailValue}
      setEmail={onEmailChange}
      handleSubmit={onFormSubmit}
    />
  );
};
