import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global/';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = token;
};

export const register = createAsyncThunk(
  'auth/register',
  async (values, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', values);
      setAuthHeader(`Bearer ${res.data.token}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Unknown error');
    }
  },
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (values, thunkAPI) => {
    try {
      const res = await axios.post('/users/login', values);
      setAuthHeader(`Bearer ${res.data.token}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const logOut = createAsyncThunk('auth/logout', async () => {
  await axios.post('/users/logout');
  setAuthHeader('');
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(`Bearer ${reduxState.auth.token}`);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  },
);
