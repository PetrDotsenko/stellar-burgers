import React, { useEffect, useState } from 'react';
import { ProfileUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/slices/user-slice';

// компонент профиль
export const Profile: React.FC = () => {
  // получаем данные юзера из стора
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loading);

  // локальное состояние формы
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  // когда юзер загружается, вставляем данные в форму
  useEffect(() => {
    setForm({
      name: userData?.name || '',
      email: userData?.email || '',
      password: ''
    });
  }, [userData]);

  // проверяем изменена ли форма
  const formChanged =
    form.name !== userData?.name ||
    form.email !== userData?.email ||
    form.password.length > 0;

  // изменение инпутов
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  // сброс изменений
  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({
      name: userData.name,
      email: userData.email,
      password: ''
    });
  };

  // если грузится, показываем прелоадер
  if (isLoading) {
    return <Preloader />;
  }

  // рендер формы
  return (
    <ProfileUI
      formValue={form}
      isFormChanged={formChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleChange}
    />
  );
};
