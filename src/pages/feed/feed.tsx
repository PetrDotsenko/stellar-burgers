import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { TOrder } from '../../utils/types';
import {
  fetchOrders,
  selectOrdersLoading,
  selectUserOrders
} from '../../services/slices/orders-slice';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();

  const orders: TOrder[] = useAppSelector(selectUserOrders);
  const isLoading = useAppSelector(selectOrdersLoading);

  // Загружаем заказы при монтировании
  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchOrders());
    }
  }, [dispatch, orders.length]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchOrders())} />
  );
};
