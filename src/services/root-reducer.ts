import { combineReducers } from '@reduxjs/toolkit';
import constructorReducer from './slices/constructor-slice';
import feedsReducer from './slices/feeds-slice';
import ingredientsReducer from './slices/ingredients-slice';
import ordersReducer from './slices/orders-slice';
import userReducer from './slices/user-slice';

export const rootReducer = combineReducers({
  burgerConstructor: constructorReducer,
  feeds: feedsReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
