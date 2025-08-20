import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import {
  selectIngredientsItems,
  selectIngredientsLoading
} from '../../services/slices/ingredients-slice';
import { useMatch, useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { IngredientDetailsProps } from './type';

export const IngredientDetails: FC<IngredientDetailsProps> = ({ isPage }) => {
  const { id: ingredientId } = useParams<{ id: string }>();

  const ingredients = useAppSelector(selectIngredientsItems);
  const areIngredientsLoading = useAppSelector(selectIngredientsLoading);

  const targetIngredient = ingredients.find(
    (item) => item._id === ingredientId
  );

  if (areIngredientsLoading || !targetIngredient) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI ingredientData={targetIngredient} isPage={isPage} />
  );
};
