import React, { FC, useEffect, useMemo } from 'react';
import { Preloader, OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getOrderByNumber } from '../../services/slices/feedsSlice';
import { fetchIngredients } from '../../services/slices/ingridientsSlice';

type TOrderInfo = {
  isInModal: boolean;
};

export const OrderInfo: FC<TOrderInfo> = ({ isInModal }) => {
  const routeParams = useParams();
  const currentNumber = parseInt(routeParams.number || '0', 10);
  const dispatch = useDispatch();

  const ingredients = useSelector((store) => store.ingredients.ingredients);

  useEffect(() => {
    // запрашиваем заказ по номеру
    if (!Number.isNaN(currentNumber) && currentNumber > 0) {
      dispatch(getOrderByNumber(currentNumber));
    }
    // если ингредиенты ещё не загружены — подтянем их
    if (!ingredients || ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, currentNumber, ingredients.length]);

  const orderData = useSelector((state) => state.feeds.orderByNumber);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

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
      {}
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

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI isInModal={isInModal} orderInfo={orderInfo} />;
};
