import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/contacts');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxContactState = thunkAPI.getState();
      return reduxContactState.auth.token !== null;
    },
  },
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const res = await axios.post('/contacts', newContact);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const res = await axios.delete(`/contacts/${contactId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

// export const updateContact = createAsyncThunk(
//   'auth/update',
//   async (contactId, thunkAPI) => {
//     try {
//       const resp = await axios.patch(`/contacts/${contactId}`);
//       return resp;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   },
// );
