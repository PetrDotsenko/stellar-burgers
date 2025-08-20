import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi, getOrderByNumberApi } from '@api';
import { RootState } from '../root-reducer';
import { TOrder } from '../../utils/types';

type OrdersState = {
  items: TOrder[];
  currentOrder: TOrder | null;
  loadedOrder: TOrder | null;
  isLoading: boolean;
  isListLoading: boolean;
  orderPosting: boolean;
};

const ordersInitialState: OrdersState = {
  items: [],
  currentOrder: null,
  loadedOrder: null,
  isLoading: false,
  isListLoading: false,
  orderPosting: false
};

export const fetchOrders = createAsyncThunk<TOrder[]>(
  'orders/fetchOrders',
  getOrdersApi
);

export const postOrder = createAsyncThunk<
  { order: TOrder; name: string },
  string[]
>('orders/postOrder', orderBurgerApi);

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'orders/fetchOrderByNumber',
  async (number) => {
    const res = await getOrderByNumberApi(number);
    // API returns { success, orders }
    return res.orders[0];
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: ordersInitialState,
  reducers: {
    clearOrders(state) {
      state.items = [];
      state.currentOrder = null;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isListLoading = true;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isListLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state) => {
        state.isListLoading = false;
        alert('Произошла ошибка при загрузке заказов');
      })

      .addCase(postOrder.pending, (state) => {
        state.orderPosting = true;
      })
      .addCase(
        postOrder.fulfilled,
        (state, action: PayloadAction<{ order: TOrder; name: string }>) => {
          state.orderPosting = false;
          if (action.payload?.order) {
            state.items = state.items
              ? [action.payload.order, ...state.items]
              : [action.payload.order];
            state.currentOrder = action.payload.order;
          }
        }
      )
      .addCase(postOrder.rejected, (state) => {
        state.orderPosting = false;
        alert('Произошла ошибка при создании заказа');
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.loadedOrder = action.payload;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.isLoading = false;
        alert('Произошла ошибка при загрузке деталей заказа');
      });
  }
});

export const { clearOrders, clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;

export const selectUserOrders = (state: RootState) => state.orders.items;
export const selectOrdersListLoading = (state: RootState) =>
  state.orders.isListLoading;
export const selectOrderLoading = (state: RootState) => state.orders.isLoading;
export const selectOrderPosting = (state: RootState) =>
  state.orders.orderPosting;
export const selectCurrentOrder = (state: RootState) =>
  state.orders.currentOrder;
export const selectLoadedOrder = (state: RootState) => state.orders.loadedOrder;
