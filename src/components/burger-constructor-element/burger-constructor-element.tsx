import React, { FC } from 'react';
import { useDispatch } from '../../services/store';
import { BurgerConstructorElementUI } from '@ui';
import {
  removeIngredientFromConstructor,
  ingredientUp,
  ingredientDown
} from '../../services/slices/burgerConstructorSlice';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = (
  props
) => {
  const dispatch = useDispatch();

  const onMoveUp = () => {
    dispatch(ingredientUp(props.ingredient.id));
  };

  const onMoveDown = () => {
    dispatch(ingredientDown(props.ingredient.id));
  };

  const onRemove = () => {
    dispatch(removeIngredientFromConstructor(props.ingredient.id));
  };

  return (
    <BurgerConstructorElementUI
      ingredient={props.ingredient}
      index={props.index}
      totalItems={props.totalItems}
      handleMoveUp={onMoveUp}
      handleMoveDown={onMoveDown}
      handleClose={onRemove}
    />
  );
};
