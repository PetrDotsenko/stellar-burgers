import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addIngredientToConstructor } from '../../services/slices/burgerConstructorSlice';

export const BurgerIngredient: React.FC<TBurgerIngredientProps> = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const onAddIngredient = () => {
    dispatch(addIngredientToConstructor(props.ingredient));
  };

  return (
    <BurgerIngredientUI
      ingredient={props.ingredient}
      count={props.count}
      locationState={{ background: location }}
      handleAdd={onAddIngredient}
      dataCy={props.dataCy}
    />
  );
};
