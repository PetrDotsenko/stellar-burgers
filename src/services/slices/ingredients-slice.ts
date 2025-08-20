import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '@api';

type IngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
};

const initialState: IngredientsState = {
  items: [],
  isLoading: false
};

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/fetchIngredients', getIngredientsApi);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    clearIngredients(state) {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        alert('Произошла ошибка при загрузке ингридиентов');
      });
  }
});

export const { clearIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

export const selectIngredientsItems = (state: RootState) =>
  state.ingredients.items;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
