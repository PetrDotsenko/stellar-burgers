import React, { FC } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';
import styles from '../ui/ingredient-details/ingredient-details.module.css';

type Props = {
  showTitle?: boolean;
};

export const IngredientDetails: FC<Props> = ({ showTitle = true }) => {
  const path = window.location.pathname;
  const idFromUrl = path.split('/ingredients/')[1];
  const allIngredients = useSelector((state) => state.ingredients.ingredients);
  const foundIngredient = allIngredients.find((item) => item._id === idFromUrl);

  if (!foundIngredient) {
    return <Preloader />;
  }

  return (
    <main className={styles.page}>
      {showTitle && (
        <h3 className={`${styles.title} text text_type_main-large`}>
          Детали ингредиента
        </h3>
      )}
      <div className={styles.center}>
        <IngredientDetailsUI ingredientData={foundIngredient} />
      </div>
    </main>
  );
};
