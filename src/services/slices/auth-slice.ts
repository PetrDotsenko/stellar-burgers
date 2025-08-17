import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { registerUserApi, loginUserApi, logoutApi } from '@api';
import { setCookie } from '../../utils/cookie';
import { RootState } from '../root-reducer';
import { TUser } from '../../utils/types';

type AuthState = {
  user?: TUser | null;
  isAuth: boolean;
  isLoading: boolean;
  logoutLoading?: boolean;
};

const authInitialState: AuthState = {
  isAuth: false,
  isLoading: false
};

export const registerUser = createAsyncThunk<
  { refreshToken: string; accessToken: string; user: TUser },
  { email: string; name: string; password: string }
>('auth/registerUser', async (data) => {
  const res = await registerUserApi(data);
  if (res.refreshToken) localStorage.setItem('refreshToken', res.refreshToken);
  if (res.accessToken) setCookie('accessToken', res.accessToken);
  return res;
});

export const loginUser = createAsyncThunk<
  { refreshToken: string; accessToken: string; user: TUser },
  { email: string; password: string }
>('auth/loginUser', async (data) => {
  const res = await loginUserApi(data);
  if (res.refreshToken) localStorage.setItem('refreshToken', res.refreshToken);
  if (res.accessToken) setCookie('accessToken', res.accessToken);
  return res;
});

export const logoutUser = createAsyncThunk<void, void>(
  'auth/logoutUser',
  async () => {
    await logoutApi();
    localStorage.removeItem('refreshToken');
    setCookie('accessToken', '');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<TUser | null>) {
      state.user = action.payload;
      state.isAuth = !!action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            refreshToken: string;
            accessToken: string;
            user: TUser;
          }>
        ) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isAuth = true;
        }
      )

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            refreshToken: string;
            accessToken: string;
            user: TUser;
          }>
        ) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isAuth = true;
        }
      )

      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutLoading = false;
        state.user = null;
        state.isAuth = false;
      });
  }
});

export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
