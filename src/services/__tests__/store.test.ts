import { rootReducer } from '../store';

describe('Тестирование rootReducer', () => {
  it('должен возвращать начальное состояние, если тип действия неизвестен', () => {
    const fakeAction = { type: 'Неизвестное_действие' };
    const initialState = rootReducer(undefined, fakeAction);

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('constructorItems');
    expect(initialState).toHaveProperty('feeds');
    expect(initialState).toHaveProperty('auth');
  });
});
