import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

// Типизация состояния
type IngredientsState = {
  ingredients: Array<TIngredient>;
  isLoading: boolean;
  errorText: string | null;
};

// Начальное значение
const defaultState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  errorText: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

// Создание слайса
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.errorText = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload.data;
        state.errorText = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.errorText = action.error.message || 'Что-то пошло не так';
      });
  }
});

// Экспорт редьюсера
export const ingredientsSliceReducer = ingredientsSlice.reducer;
