import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../root-reducer';
import { postOrder } from './orders-slice';

export type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: {
      prepare(ingredient: TIngredient) {
        return {
          payload: { ...ingredient, id: nanoid() }
        };
      },
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.bun = action.payload;
      }
    },
    addIngredient: {
      prepare(ingredient: TIngredient) {
        return {
          payload: { ...ingredient, id: nanoid() }
        };
      },
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.ingredients.splice(action.payload, 1);
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const previous = state.ingredients.splice(action.payload, 1);
      state.ingredients.splice(action.payload - 1, 0, previous[0]);
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const previous = state.ingredients.splice(action.payload, 1);
      state.ingredients.splice(action.payload + 1, 0, previous[0]);
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  },
  extraReducers: (builder) =>
    builder.addCase(postOrder.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
    })
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;

export const selectConstructor = (state: RootState) => state.burgerConstructor;
export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;
export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;
