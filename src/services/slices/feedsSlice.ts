import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFeedsApi, getOrderByNumberApi } from '@api';

export type TFeedsSlice = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loadingData: boolean;
  error: string | null | undefined;
  orderByNumber: TOrder | null;
  success: boolean;
};

export const initialState: TFeedsSlice = {
  orders: [],
  total: 0,
  totalToday: 0,
  loadingData: true,
  error: null,
  orderByNumber: null,
  success: false
};

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', getFeedsApi);

export const getOrderByNumber = createAsyncThunk(
  'feeds/getOrderById',
  getOrderByNumberApi
);

const feedsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loadingData = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loadingData = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loadingData = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loadingData = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loadingData = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loadingData = false;
        state.error = null;
        state.orderByNumber = action.payload.orders[0];
      });
  }
});

export const feedsSliceReducer = feedsSlice.reducer;
