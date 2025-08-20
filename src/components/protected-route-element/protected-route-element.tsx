import { FC } from 'react';
import { ProtectedRouteElementProps } from './type';
import { useAppSelector } from '../../services/store';
import {
  selectIsAuth,
  selectUserLoading
} from '../../services/slices/user-slice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

export const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({
  element,
  onlyUnAuth = false
}) => {
  const isAuth = useAppSelector(selectIsAuth);
  const location = useLocation();
  const isUserLoading = useAppSelector(selectUserLoading);

  if (isUserLoading) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuth) {
    return <Navigate to='/' replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    // Передаём текущую локацию в state, чтобы после логина вернуть пользователя
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return element;
};
