import { FC, useMemo } from 'react';
import { TIngredient } from '../../utils/types';
import { BurgerConstructorUI } from '../ui';
import { useAppSelector, useAppDispatch } from '../../services/store';
import {
  clearCurrentOrder,
  selectCurrentOrder,
  selectOrderPosting,
  selectOrdersLoading
} from '../../services/slices/orders-slice';
import {
  selectConstructorBun,
  selectConstructorIngredients
} from '../../services/slices/constructor-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();

  const ingredients = useAppSelector(selectConstructorIngredients);
  const bun = useAppSelector(selectConstructorBun);
  const orderRequest = useAppSelector(selectOrdersLoading);
  const orderModalData = useAppSelector(selectCurrentOrder);

  // Оформление заказа (заглушка)
  const onOrderClick = () => {
    if (!bun || orderRequest) return;
    console.log('Оформление заказа...');
  };

  const closeOrderModal = () => {
    dispatch(clearCurrentOrder());
  };

  // Общая цена
  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce<number>(
        (sum: number, item: TIngredient) => sum + item.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
