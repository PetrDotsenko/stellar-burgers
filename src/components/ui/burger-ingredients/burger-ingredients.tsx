import React, { FC, memo } from 'react';
import { Tab } from '@zlden/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import { BurgerIngredientsUIProps } from './type';
import { IngredientsCategory } from '@components';

// Расширяем пропсы, чтобы поддержать опциональный loading
type ExtraProps = BurgerIngredientsUIProps & { loading?: boolean };

export const BurgerIngredientsUI: FC<ExtraProps> = memo(
  ({
    currentTab,
    buns,
    mains,
    sauces,
    titleBunRef,
    titleMainRef,
    titleSaucesRef,
    bunsRef,
    mainsRef,
    saucesRef,
    onTabClick,
    loading
  }) => (
    <>
      <section className={styles.burger_ingredients}>
        <nav>
          <ul className={styles.menu}>
            <Tab value='bun' active={currentTab === 'bun'} onClick={onTabClick}>
              Булки
            </Tab>
            <Tab
              value='main'
              active={currentTab === 'main'}
              onClick={onTabClick}
            >
              Начинки
            </Tab>
            <Tab
              value='sauce'
              active={currentTab === 'sauce'}
              onClick={onTabClick}
            >
              Соусы
            </Tab>
          </ul>
        </nav>

        <div className={styles.content}>
          {loading ? (
            <div className={styles.loader} aria-busy='true' role='status'>
              Загрузка ингредиентов...
            </div>
          ) : (
            <>
              <IngredientsCategory
                title='Булки'
                titleRef={titleBunRef}
                ingredients={buns}
                ref={bunsRef}
              />
              <IngredientsCategory
                title='Начинки'
                titleRef={titleMainRef}
                ingredients={mains}
                ref={mainsRef}
              />
              <IngredientsCategory
                title='Соусы'
                titleRef={titleSaucesRef}
                ingredients={sauces}
                ref={saucesRef}
              />
            </>
          )}
        </div>
      </section>
    </>
  )
);

export default BurgerIngredientsUI;
