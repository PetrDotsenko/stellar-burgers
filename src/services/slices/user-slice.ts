import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUserApi, TRegisterData, updateUserApi } from '@api';
import { RootState } from '../root-reducer';
import { TUser } from '../../utils/types';

type UserState = {
  user?: TUser | null;
  isLoading: boolean;
  updateLoading?: boolean;
};

const userInitialState: UserState = {
  isLoading: false
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

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
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
      })

      .addCase(patchUser.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(patchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.updateLoading = false;
        state.user = action.payload;
      });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
