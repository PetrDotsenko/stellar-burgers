import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSliceReducer } from './slices/ingridientsSlice';
import { burgerConstructorSliceReducer } from './slices/burgerConstructorSlice';
import { feedsSliceReducer } from './slices/feedsSlice';
import { userSliceReducer } from './slices/user-slice';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  constructorItems: burgerConstructorSliceReducer,
  feeds: feedsSliceReducer,
  auth: userSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
export { rootReducer };
