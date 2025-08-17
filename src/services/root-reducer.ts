import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import constructorReducer from './slices/constructor-slice';
import feedsReducer from './slices/feeds-slice';
import ingredientsReducer from './slices/ingredients-slice';
import ordersReducer from './slices/orders-slice';
import passwordReducer from './slices/password-slice';
import userReducer from './slices/user-slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  burgerConstructor: constructorReducer,
  feeds: feedsReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  password: passwordReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
