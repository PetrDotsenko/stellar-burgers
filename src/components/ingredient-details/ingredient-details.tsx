import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { selectIngredientsItems } from '../../services/slices/ingredients-slice';
import { useMatch, useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const { id: ingredientId } = useParams<{ id: string }>();

  const ingredients = useAppSelector(selectIngredientsItems);
  const areIngredientsLoading = useAppSelector(selectIngredientsItems);

  if (areIngredientsLoading) {
    return <Preloader />;
  }

  const targetIngredient = ingredients.find(
    (item) => item._id === ingredientId
  ) as TIngredient;

  return <IngredientDetailsUI ingredientData={targetIngredient} />;
};
