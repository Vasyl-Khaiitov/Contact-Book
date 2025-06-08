import { createSlice } from '@reduxjs/toolkit';
import { register } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },

  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.contacts.loading = false;
        state.user = payload;
        state.token = payload;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.contacts.error = payload;
      }),
});

export default authSlice.reducer;
