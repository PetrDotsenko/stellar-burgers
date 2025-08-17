import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { forgotPasswordApi, resetPasswordApi } from '@api';
import { RootState } from '../root-reducer';

type PasswordState = {
  isSending: boolean;
  isResetting: boolean;
  successMessage?: string;
};

const passwordInitialState: PasswordState = {
  isSending: false,
  isResetting: false
};

export const sendForgotPassword = createAsyncThunk(
  'password/sendForgotPassword',
  forgotPasswordApi
);
export const sendResetPassword = createAsyncThunk(
  'password/sendResetPassword',
  resetPasswordApi
);

const passwordSlice = createSlice({
  name: 'password',
  initialState: passwordInitialState,
  reducers: {
    clearPasswordState(state) {
      state.isSending = false;
      state.isResetting = false;
      state.successMessage = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendForgotPassword.pending, (state) => {
        state.isSending = true;
      })
      .addCase(sendForgotPassword.fulfilled, (state) => {
        state.isSending = false;
        state.successMessage = 'Reset email sent';
      })

      .addCase(sendResetPassword.pending, (state) => {
        state.isResetting = true;
      })
      .addCase(sendResetPassword.fulfilled, (state) => {
        state.isResetting = false;
        state.successMessage = 'Password successfully reset';
      });
  }
});

export const { clearPasswordState } = passwordSlice.actions;
export default passwordSlice.reducer;

export const selectPasswordSending = (state: RootState) =>
  state.password.isSending;
export const selectPasswordResetting = (state: RootState) =>
  state.password.isResetting;
export const selectPasswordSuccess = (state: RootState) =>
  state.password.successMessage;
