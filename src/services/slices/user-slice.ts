import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  updateUserApi
} from '@api';

import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';

// начальное состояние
const startState: {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  orders: Array<TOrder>;
  lastOrder: TOrder | null;
  orderRequestData: boolean;
  loading: boolean;
} = {
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

// асинхронные экшены
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const data = await getUserApi();
  return data;
});

export const login = createAsyncThunk(
  'user/login',
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await loginUserApi(userData);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (newUser: any) => {
    const result = await registerUserApi(newUser);
    return result;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updatedUser: any) => await updateUserApi(updatedUser)
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

export const fetchUserOrders = createAsyncThunk(
  'user/fetchOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

export const newUserOrder = createAsyncThunk(
  'user/makeOrder',
  async (orderData: string[]) => {
    const res = await orderBurgerApi(orderData);
    return res;
  }
);

// создание слайса
export const userSlice = createSlice({
  name: 'user',
  initialState: startState,
  reducers: {
    setLoginSuccess: (state, action) => {
      state.success = action.payload;
    },
    setLastOrder: (state, action) => {
      state.lastOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.success = action.payload.success;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.success = false;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.success = action.payload.success;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.success = action.payload.success;
        state.loading = false;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.success = action.payload.success;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { email: '', name: '' };
        state.success = false;
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.loading = false;
      })

      .addCase(newUserOrder.pending, (state) => {
        state.orderRequestData = true;
        state.loading = true;
      })
      .addCase(newUserOrder.fulfilled, (state, action) => {
        state.lastOrder = action.payload.order;
        state.orders.push(action.payload.order);
        state.orderRequestData = false;
        state.loading = false;
      })
      .addCase(newUserOrder.rejected, (state) => {
        state.orderRequestData = false;
        state.loading = false;
      });
  }
});

export const { setLoginSuccess, setLastOrder } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
