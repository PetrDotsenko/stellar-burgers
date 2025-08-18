import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchOrderByNumber,
  selectCurrentOrder,
  selectLoadedOrder,
  selectOrderLoading
} from '../../services/slices/orders-slice';
import { selectIngredientsItems } from '../../services/slices/ingredients-slice';
import { useParams } from 'react-router-dom';
import { OrderInfoProps } from './type';

export const OrderInfo: FC<OrderInfoProps> = ({ isPage }) => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const orderNumber = params.number;

  const orderData = useAppSelector(selectLoadedOrder);
  const ingredients: TIngredient[] = useAppSelector(selectIngredientsItems);
  const isLoading = useAppSelector(selectOrderLoading);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients?.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  useEffect(() => {
    dispatch(fetchOrderByNumber(Number(orderNumber)));
  }, []);

  if (!orderInfo || isLoading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} isPage={isPage} />;
};
