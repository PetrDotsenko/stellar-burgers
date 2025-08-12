import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from '../../services/store';
import { BurgerIngredientsUI } from '@ui';
import { TTabMode } from '@utils-types';

export const BurgerIngredients: React.FC = () => {
  const allIngredients = useSelector((state) => state.ingredients.ingredients);

  const buns = useMemo(
    () => allIngredients.filter((item) => item.type === 'bun'),
    [allIngredients]
  );

  const sauces = useMemo(
    () => allIngredients.filter((item) => item.type === 'sauce'),
    [allIngredients]
  );

  const mains = useMemo(
    () => allIngredients.filter((item) => item.type === 'main'),
    [allIngredients]
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  const titleBun = useRef<HTMLHeadingElement>(null);
  const titleMain = useRef<HTMLHeadingElement>(null);
  const titleSauce = useRef<HTMLHeadingElement>(null);

  const [bunRef, bunInView] = useInView({ threshold: 0 });
  const [mainRef, mainInView] = useInView({ threshold: 0 });
  const [sauceRef, sauceInView] = useInView({ threshold: 0 });

  useEffect(() => {
    if (bunInView) {
      setCurrentTab('bun');
    } else if (sauceInView) {
      setCurrentTab('sauce');
    } else if (mainInView) {
      setCurrentTab('main');
    }
  }, [bunInView, mainInView, sauceInView]);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);

    if (tab === 'bun' && titleBun.current) {
      titleBun.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (tab === 'main' && titleMain.current) {
      titleMain.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (tab === 'sauce' && titleSauce.current) {
      titleSauce.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBun}
      titleMainRef={titleMain}
      titleSaucesRef={titleSauce}
      bunsRef={bunRef}
      mainsRef={mainRef}
      saucesRef={sauceRef}
      onTabClick={handleTabClick}
    />
  );
};
