import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { BurgerConstructorUI } from '@ui';
import { newUserOrder, setLastOrder } from '../../services/slices/user-slice';
import { resetConstructor } from '../../services/slices/burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // получаем нужные данные из стора
  const isLoggedIn = useSelector((state) => state.auth.success);
  const bun = useSelector((state) => state.constructorItems.constructorBun);
  const fillings = useSelector(
    (state) => state.constructorItems.constructorIngredients
  );
  const orderIsSending = useSelector((state) => state.auth.orderRequestData);
  const orderInfo = useSelector((state) => state.auth.lastOrder);

  // расчет цены
  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const fillingsPrice = fillings.reduce((sum, item) => sum + item.price, 0);
    return bunPrice + fillingsPrice;
  }, [bun, fillings]);

  // отправка заказа
  const handleOrderClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!bun || orderIsSending) {
      return;
    }

    const allIngredientIds = [
      bun._id,
      ...fillings.map((item: TConstructorIngredient) => item._id),
      bun._id
    ];

    dispatch(newUserOrder(allIngredientIds));
    dispatch(resetConstructor());
  };

  // закрытие модального окна
  const handleCloseModal = () => {
    dispatch(setLastOrder(null));
  };

  const constructorItems = {
    bun: bun,
    ingredients: fillings
  };

  // рендер компонента
  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderIsSending}
      constructorItems={constructorItems}
      orderModalData={orderInfo}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseModal}
    />
  );
};
