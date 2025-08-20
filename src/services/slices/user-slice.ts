import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { RootState } from '../root-reducer';
import { TUser } from '../../utils/types';
import { setCookie } from '../../utils/cookie';

type UserState = {
  user?: TUser | null;
  isLoading: boolean;
  updateLoading: boolean;
  isAuth: boolean;
  logoutLoading: boolean;
};

const userInitialState: UserState = {
  isLoading: true,
  updateLoading: false,
  isAuth: false,
  logoutLoading: false
};

export const fetchUser = createAsyncThunk<TUser, void>(
  'user/fetchUser',
  async () => {
    const res = await getUserApi();
    return res.user;
  }
);

export const patchUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/patchUser',
  async (data) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'auth/registerUser',
  async (data) => {
    const res = await registerUserApi(data);
    if (res.refreshToken)
      localStorage.setItem('refreshToken', res.refreshToken);
    if (res.accessToken) setCookie('accessToken', res.accessToken);
    return res;
  }
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'auth/loginUser',
  async (data) => {
    const res = await loginUserApi(data);
    if (res.refreshToken)
      localStorage.setItem('refreshToken', res.refreshToken);
    if (res.accessToken) setCookie('accessToken', res.accessToken);
    return res;
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  'auth/logoutUser',
  async () => {
    await logoutApi();
    localStorage.removeItem('refreshToken');
    setCookie('accessToken', '');
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<TUser | null>) {
      state.user = action.payload;
      state.isAuth = !!action.payload;
    },
    clearUser(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        alert('Произошла ошибка при загрузке данных пользователя');
      })

      .addCase(patchUser.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(patchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.updateLoading = false;
        state.user = action.payload;
      })
      .addCase(patchUser.rejected, (state) => {
        state.updateLoading = false;
        alert('Произошла ошибка при обновлении данных пользователя');
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isAuth = true;
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        alert('Произошла ошибка при регистрации');
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isAuth = true;
        }
      )
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        alert('Произошла ошибка при входе');
      })

      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutLoading = false;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.logoutLoading = false;
        alert('Произошла ошибка при выходе');
      });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const selectAuthLoading = (state: RootState) => state.user.isLoading;
