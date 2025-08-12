import React, { FC, memo } from 'react';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

import styles from './order-info.module.css';

import { OrderInfoUIProps } from './type';

export const OrderInfoUI: FC<OrderInfoUIProps> = memo(
  ({ orderInfo, isInModal }) => {
    const getStatusText = (status: string) => {
      switch (status) {
        case 'done':
          return 'Выполнен';
        case 'pending':
          return 'Готовится';
        case 'created':
          return 'Создан';
        case 'canceled':
        case 'cancelled':
          return 'Отменён';
        default:
          return status;
      }
    };

    const statusText = getStatusText(orderInfo.status);

    return (
      <div className={styles.wrap}>
        {/* Заголовок — номер заказа */}
        <h3
          className={`${styles.header} text text_type_digits-default pb-3 ${isInModal ? 'pt-5' : styles.pageHeader}`}
        >
          #{orderInfo.number}
        </h3>

        {/* название бургера */}
        <h3
          className={`text text_type_main-medium pb-3 pt-10 ${styles.header}`}
        >
          {orderInfo.name}
        </h3>

        {/* статус */}
        <p
          className='text text_type_main-default'
          style={{ color: orderInfo.status === 'done' ? '#00CCCC' : 'inherit' }}
        >
          {statusText}
        </p>

        {/* состав */}
        <p className={`text text_type_main-medium pt-15 pb-6`}>Состав:</p>
        <ul className={`${styles.list} mb-8`}>
          {Object.values(orderInfo.ingredientsInfo).map((item, index) => (
            <li className={`pb-4 pr-6 ${styles.item}`} key={index}>
              <div className={styles.img_wrap}>
                <div className={styles.border}>
                  <img
                    className={styles.img}
                    src={item.image_mobile}
                    alt={item.name}
                  />
                </div>
              </div>
              <span className='text text_type_main-default pl-4'>
                {item.name}
              </span>
              <span
                className={`text text_type_digits-default pl-4 pr-4 ${styles.quantity}`}
              >
                {item.count} x {item.price}
              </span>
              <CurrencyIcon type={'primary'} />
            </li>
          ))}
        </ul>

        {/* нижняя строка */}
        <div className={styles.bottom}>
          <p className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={orderInfo.date} />
          </p>
          <span
            className={`text text_type_digits-default pr-4 ${styles.total}`}
          >
            {orderInfo.total}
          </span>
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
    );
  }
);
