import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorElement, Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  closeOrderModal
}) => {
  const hasBun = Boolean(constructorItems.bun);
  const hasIngredients = constructorItems.ingredients.length > 0;

  return (
    <section className={styles.root} data-testid='burger-constructor'>
      {/* Верхняя булка */}
      {hasBun ? (
        <div className={`${styles.bunWrap} mb-4 mr-4`}>
          <ConstructorElement
            type='top'
            isLocked
            text={`${constructorItems.bun.name} (верх)`}
            price={constructorItems.bun.price}
            thumbnail={constructorItems.bun.image}
          />
        </div>
      ) : (
        <div
          className={`${styles.placeholder} ${styles.placeholderTop} ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Выберите булки
        </div>
      )}

      {/* Список начинок (дроп-зона) */}
      <ul className={styles.list} data-testid='constructor-drop-area'>
        {hasIngredients ? (
          constructorItems.ingredients.map(
            (ing: TConstructorIngredient, idx: number) => (
              <BurgerConstructorElement
                ingredient={ing}
                index={idx}
                totalItems={constructorItems.ingredients.length}
                key={ing.id}
              />
            )
          )
        ) : (
          <div
            className={`${styles.placeholder} ml-8 mb-4 mr-5 text text_type_main-default`}
          >
            Выберите начинку
          </div>
        )}
      </ul>

      {/* Нижняя булка */}
      {hasBun ? (
        <div className={`${styles.bunWrap} mt-4 mr-4`}>
          <ConstructorElement
            type='bottom'
            isLocked
            text={`${constructorItems.bun.name} (низ)`}
            price={constructorItems.bun.price}
            thumbnail={constructorItems.bun.image}
          />
        </div>
      ) : (
        <div
          className={`${styles.placeholder} ${styles.placeholderBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Выберите булки
        </div>
      )}

      {/* Итоговая панель - цена и кнопка */}
      <div className={`${styles.summary} mt-10 mr-4`}>
        <div className={`${styles.priceBox} mr-10`}>
          <p className={`text ${styles.priceText} mr-2`}>{price}</p>
          <CurrencyIcon type='primary' />
        </div>

        <Button
          htmlType='button'
          type='primary'
          size='large'
          onClick={onOrderClick}
        >
          Оформить заказ
        </Button>
      </div>

      {/* Модалки */}
      {orderRequest && (
        <Modal
          onClose={closeOrderModal}
          title='Оформляем заказ...'
          dataCy='modal'
          dataCyClose='modal-close'
        >
          <Preloader />
        </Modal>
      )}

      {orderModalData && !orderRequest && (
        <Modal
          onClose={closeOrderModal}
          title=''
          dataCy='modal'
          dataCyClose='modal-close'
        >
          <OrderDetailsUI orderNumber={orderModalData.number} />
        </Modal>
      )}
    </section>
  );
};
