import {
  burgerConstructorSliceReducer,
  initialState,
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  ingredientUp,
  ingredientDown,
  resetConstructor
} from '../slices/burgerConstructorSlice';

describe('Тестирование burgerConstructorSlice', () => {
  const testIngredient = {
    _id: 'test123',
    name: 'Test Sauce',
    type: 'sauce' as const,
    proteins: 10,
    fat: 5,
    carbohydrates: 15,
    calories: 100,
    price: 50,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0,
    id: 'ingredient-id-1'
  };

  const bun = {
    _id: 'bun123',
    name: 'Test Bun',
    type: 'bun' as const,
    proteins: 5,
    fat: 3,
    carbohydrates: 20,
    calories: 150,
    price: 80,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0,
    id: 'bun-id-1'
  };

  it('вернуть начальное состояние по умолчанию', () => {
    const result = burgerConstructorSliceReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('добавление булки в конструктор', () => {
    const action = addIngredientToConstructor({ ...bun });
    const result = burgerConstructorSliceReducer(initialState, action);
    expect(result.constructorBun).toBeTruthy();
    expect(result.constructorBun?.type).toBe('bun');
  });

  it('добавление ингредиентов в конструктор', () => {
    const action = addIngredientToConstructor({ ...testIngredient });
    const result = burgerConstructorSliceReducer(initialState, action);
    expect(result.constructorIngredients.length).toBe(1);
    expect(result.constructorIngredients[0].name).toBe('Test Sauce');
  });

  it('удаление ингредиента из конструктора', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorIngredients: [testIngredient]
    };

    const action = removeIngredientFromConstructor(testIngredient.id);
    const result = burgerConstructorSliceReducer(stateWithIngredient, action);
    expect(result.constructorIngredients.length).toBe(0);
  });

  it('перемещение ингредиентов вверх', () => {
    const second = { ...testIngredient, id: '2', name: 'Second' };
    const third = { ...testIngredient, id: '3', name: 'Third' };

    const state = {
      ...initialState,
      constructorIngredients: [testIngredient, second, third]
    };

    const result = burgerConstructorSliceReducer(state, ingredientUp('3'));
    expect(result.constructorIngredients[1].id).toBe('3');
  });

  it('перемещение ингредиентов вниз', () => {
    const first = { ...testIngredient, id: '1', name: 'First' };
    const second = { ...testIngredient, id: '2', name: 'Second' };

    const state = {
      ...initialState,
      constructorIngredients: [first, second]
    };

    const result = burgerConstructorSliceReducer(state, ingredientDown('1'));
    expect(result.constructorIngredients[1].id).toBe('1');
  });

  it('сбрасывание конструктора', () => {
    const state = {
      constructorBun: bun,
      constructorIngredients: [testIngredient]
    };

    const result = burgerConstructorSliceReducer(state, resetConstructor());
    expect(result.constructorBun).toBeNull();
    expect(result.constructorIngredients.length).toBe(0);
  });
});
