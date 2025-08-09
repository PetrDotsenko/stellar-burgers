import {
  feedsSliceReducer,
  fetchFeeds,
  getOrderByNumber,
  initialState
} from '../slices/feedsSlice';

describe('Тесты для feedsSlice', () => {
  it('обрабатывает fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedsSliceReducer(initialState, action);

    expect(state.loadingData).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fetchFeeds.fulfilled', () => {
    const mockPayload = {
      orders: [{ _id: '1', name: 'Заказ' }],
      total: 100,
      totalToday: 5
    };

    const action = { type: fetchFeeds.fulfilled.type, payload: mockPayload };
    const state = feedsSliceReducer(initialState, action);

    expect(state.loadingData).toBe(false);
    expect(state.orders).toEqual(mockPayload.orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(5);
  });

  it('обрабатывает fetchFeeds.rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };

    const state = feedsSliceReducer(initialState, action);

    expect(state.loadingData).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });

  it('обрабатывает getOrderByNumber.fulfilled', () => {
    const order = { _id: '1', name: 'Заказ 1' };

    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [order] }
    };

    const state = feedsSliceReducer(initialState, action);

    expect(state.loadingData).toBe(false);
    expect(state.orderByNumber).toEqual(order);
  });
});
