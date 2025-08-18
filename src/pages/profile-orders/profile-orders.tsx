import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import {
  fetchOrders,
  selectOrdersListLoading,
  selectUserOrders
} from '../../services/slices/orders-slice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  // Получаем заказы пользователя из стора
  const orders = useAppSelector(selectUserOrders);
  const isLoading = useAppSelector(selectOrdersListLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
