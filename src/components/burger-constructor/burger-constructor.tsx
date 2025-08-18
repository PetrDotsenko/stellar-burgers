import { FC, useMemo } from 'react';
import { TIngredient } from '../../utils/types';
import { BurgerConstructorUI } from '../ui';
import { useAppSelector, useAppDispatch } from '../../services/store';
import {
  clearCurrentOrder,
  postOrder,
  selectCurrentOrder,
  selectOrderPosting
} from '../../services/slices/orders-slice';
import { selectConstructor } from '../../services/slices/constructor-slice';
import { selectIsAuth } from '../../services/slices/user-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const burgerConstructor = useAppSelector(selectConstructor);
  const orderRequest = useAppSelector(selectOrderPosting);
  const orderModalData = useAppSelector(selectCurrentOrder);
  const isAuth = useAppSelector(selectIsAuth);

  const { bun, ingredients } = burgerConstructor;

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
    }

    if (!bun || orderRequest) return;
    const ids = ingredients.map((item) => item._id);
    ids.push(bun._id);
    dispatch(postOrder(ids));
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
      constructorItems={burgerConstructor}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
