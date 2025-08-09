import React, { useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/user-slice';
import { Preloader } from '@ui';

// компонент показывает заказы в профиле
export const ProfileOrders: React.FC = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector((state) => state.auth.orders);
  const isLoading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
