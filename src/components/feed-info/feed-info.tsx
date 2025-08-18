import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { selectUserOrders } from '../../services/slices/orders-slice';
import {
  selectFeeds,
  selectFeedsLoading,
  selectFeedsOrders,
  selectFeedsTotal
} from '../../services/slices/feeds-slice';
import { Preloader } from '@ui';

const getOrders = (orders: TOrder[] = [], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useAppSelector(selectFeedsOrders);
  const feed = useAppSelector(selectFeeds);
  const feedsLoading = useAppSelector(selectFeedsLoading);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  if (feedsLoading) {
    return <Preloader />;
  }

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
