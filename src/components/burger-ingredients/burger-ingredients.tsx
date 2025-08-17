import React, { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchIngredients,
  selectIngredientsItems,
  selectIngredientsLoading
} from '../../services/slices/ingredients-slice';
import { TIngredient } from '../../utils/types';

export const BurgerIngredients: FC = () => {
  // const dispatch = useAppDispatch();
  const ingredients = useAppSelector(selectIngredientsItems);
  const areIngredientsLoading = useAppSelector(selectIngredientsLoading);

  const buns: TIngredient[] = ingredients.filter((i) => i.type === 'bun');
  const mains: TIngredient[] = ingredients.filter((i) => i.type === 'main');
  const sauces: TIngredient[] = ingredients.filter((i) => i.type === 'sauce');

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  // useEffect(() => {
  //   dispatch(fetchIngredients());
  // }, [dispatch]);

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  // BurgerIngredientsUI ожидает onTabClick: (val: string) => void — даём такую сигнатуру
  const onTabClick = (tab: string) => {
    const t = tab as TTabMode;
    setCurrentTab(t);
    if (t === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (t === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (t === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
      loading={areIngredientsLoading}
    />
  );
};

export default BurgerIngredients;
