import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { RootState } from '../root-reducer';
import { TOrder } from '../../utils/types';

type FeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
};

const feedsInitialState: FeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', getFeedsApi);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: feedsInitialState,
  reducers: {
    clearFeeds(state) {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.isLoading = false;
        alert('Произошла ошибка при загрузке заказов');
      });
  }
});

export const { clearFeeds } = feedsSlice.actions;
export default feedsSlice.reducer;

export const selectFeeds = (state: RootState) => state.feeds;
export const selectFeedsOrders = (state: RootState) => state.feeds.orders;
export const selectFeedsTotal = (state: RootState) => state.feeds.total;
export const selectFeedsTotalToday = (state: RootState) =>
  state.feeds.totalToday;
export const selectFeedsLoading = (state: RootState) => state.feeds.isLoading;
