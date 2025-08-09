import {
  ingredientsSliceReducer,
  fetchIngredients
} from '../slices/ingridientsSlice';
import { UnknownAction } from 'redux';

const initialState = {
  ingredients: [],
  isLoading: false,
  errorText: null
};

describe('ingredientsSlice', () => {
  it('вернуть начальное состояние по умолчанию', () => {
    const state = ingredientsSliceReducer(undefined, {} as UnknownAction);
    expect(state).toEqual(initialState);
  });

  it('обрабатывает fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const result = ingredientsSliceReducer(initialState, action);
    expect(result).toEqual({
      ingredients: [],
      isLoading: true,
      errorText: null
    });
  });

  it('обрабатывает fetchIngredients.fulfilled', () => {
    const mockData = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 200,
        price: 100,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0
      }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: { data: mockData }
    };

    const result = ingredientsSliceReducer(initialState, action);
    expect(result).toEqual({
      ingredients: mockData,
      isLoading: false,
      errorText: null
    });
  });

  it('обрабатывает fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const result = ingredientsSliceReducer(initialState, action);
    expect(result).toEqual({
      ingredients: [],
      isLoading: false,
      errorText: 'Ошибка загрузки'
    });
  });
});
