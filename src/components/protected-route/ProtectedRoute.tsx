import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  unAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const currentLocation = useLocation();
  const isUserLoggedIn = useSelector((state) => state.auth.success);

  // если пользователь не вошел
  if (!isUserLoggedIn && !props.unAuth) {
    return <Navigate replace to='/login' state={{ from: currentLocation }} />;
  }

  // если пользователь вошел
  if (isUserLoggedIn && props.unAuth) {
    const goTo = currentLocation.state?.from;
    const defaultPath = { pathname: '/' };

    return <Navigate to={goTo || defaultPath} replace />;
  }

  return props.children;
};
