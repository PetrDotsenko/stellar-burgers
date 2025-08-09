import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((order) => order.status === status)
    .map((order) => order.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const data = useSelector((state) => state.feeds);

  const ordersList = data.orders;

  const readyOrders = getOrders(ordersList, 'done');
  const pendingOrders = getOrders(ordersList, 'pending');

  const feed = {
    total: data.total,
    totalToday: data.totalToday
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
