import { FC } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const path = window.location.pathname;
  const idFromUrl = path.split('/ingredients/')[1];
  const allIngredients = useSelector((state) => state.ingredients.ingredients);
  const foundIngredient = allIngredients.find((item) => item._id === idFromUrl);

  if (!foundIngredient) {
    return <Preloader />;
  }

  // инФормация об ингредиенте
  return <IngredientDetailsUI ingredientData={foundIngredient} />;
};
