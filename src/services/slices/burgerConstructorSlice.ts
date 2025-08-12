import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorSlice = {
  constructorBun: TConstructorIngredient | null;
  constructorIngredients: TConstructorIngredient[];
};

export const initialState: TBurgerConstructorSlice = {
  constructorBun: null,
  constructorIngredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientToConstructor: {
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...item } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorBun = action.payload)
          : state.constructorIngredients.push(action.payload);
      }
    },

    removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      state.constructorIngredients = state.constructorIngredients.filter(
        (item) => item.id !== action.payload
      );
    },
    ingredientUp: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.constructorIngredients.findIndex(
        (item) => item.id === action.payload
      );
      const [ingredient] = state.constructorIngredients.splice(
        ingredientIndex,
        1
      );

      state.constructorIngredients.splice(ingredientIndex - 1, 0, ingredient);
    },
    ingredientDown: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.constructorIngredients.findIndex(
        (item) => item.id === action.payload
      );
      const [ingredient] = state.constructorIngredients.splice(
        ingredientIndex,
        1
      );

      state.constructorIngredients.splice(ingredientIndex + 1, 0, ingredient);
    },
    resetConstructor: (state: TBurgerConstructorSlice) => {
      state.constructorIngredients = [];
      state.constructorBun = null;
    }
  }
});

export const {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  ingredientUp,
  ingredientDown,
  resetConstructor
} = burgerConstructorSlice.actions;
export const burgerConstructorSliceReducer = burgerConstructorSlice.reducer;
