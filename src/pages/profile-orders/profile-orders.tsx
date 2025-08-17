import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  // Получаем заказы пользователя из стора
  const orders = useAppSelector((state) => state.orders.items) ?? [];

  return <ProfileOrdersUI orders={orders} />;
};
