import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import {
  fetchFeeds,
  selectFeedsLoading,
  selectFeedsOrders
} from '../../services/slices/feeds-slice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectFeedsOrders);
  const isLoading = useAppSelector(selectFeedsLoading);

  // Загружаем заказы при монтировании
  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchFeeds());
    }
  }, [dispatch, orders.length]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
