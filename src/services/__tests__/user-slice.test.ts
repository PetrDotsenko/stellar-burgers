import {
  userSliceReducer,
  login,
  logout,
  register,
  updateUser,
  fetchUser,
  fetchUserOrders,
  newUserOrder
} from '../../services/slices/user-slice';

const startState = {
  success: false,
  user: {
    email: '',
    name: ''
  },
  orders: [],
  lastOrder: null,
  orderRequestData: false,
  loading: false
};

describe('userSliceReducer', () => {
  it('проверка login.pending', () => {
    const action = { type: login.pending.type };
    const state = userSliceReducer(startState, action);
    expect(state.loading).toBe(true);
  });

  it('проверка login.fulfilled', () => {
    const payload = {
      user: { email: 'test@mail.ru', name: 'Test' },
      success: true
    };
    const action = { type: login.fulfilled.type, payload };
    const state = userSliceReducer(startState, action);
    expect(state.user).toEqual(payload.user);
    expect(state.success).toBe(true);
    expect(state.loading).toBe(false);
  });

  it('проверка login.rejected', () => {
    const action = { type: login.rejected.type };
    const state = userSliceReducer(startState, action);
    expect(state.loading).toBe(false);
  });

  it('проверка logout.fulfilled', () => {
    const action = { type: logout.fulfilled.type };
    const state = userSliceReducer({
        ...startState,
        user: { email: 'user@mail.ru', name: 'User' },
        success: true
      },
      action
    );
    expect(state.user).toEqual({ email: '', name: '' });
    expect(state.success).toBe(false);
    expect(state.loading).toBe(false);
  });

  it('проверка register.fulfilled', () => {
    const action = {
      type: register.fulfilled.type,
      payload: {
        user: { email: 'new@mail.ru', name: 'New' },
        success: true
      }
    };
    const state = userSliceReducer(startState, action);
    expect(state.user).toEqual(action.payload.user);
    expect(state.success).toBe(true);
  });

  it('проверка updateUser.fulfilled', () => {
    const updatedUser = { email: 'upd@mail.ru', name: 'Updated' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: updatedUser, success: true }
    };
    const state = userSliceReducer(startState, action);
    expect(state.user).toEqual(updatedUser);
    expect(state.success).toBe(true);
  });

  it('проверка fetchUserOrders.fulfilled', () => {
    const orders = [{ number: '123' }, { number: '456' }];
    const action = { type: fetchUserOrders.fulfilled.type, payload: orders };
    const state = userSliceReducer(startState, action);
    expect(state.orders).toEqual(orders);
  });

  it('проверка newUserOrder.fulfilled', () => {
    const newOrder = { order: { number: '789' } };
    const action = { type: newUserOrder.fulfilled.type, payload: newOrder };
    const state = userSliceReducer(startState, action);
    expect(state.lastOrder).toEqual(newOrder.order);
    expect(state.orders).toContainEqual(newOrder.order);
    expect(state.orderRequestData).toBe(false);
  });
});
