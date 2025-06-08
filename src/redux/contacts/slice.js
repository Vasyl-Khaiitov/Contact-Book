import { createSelector, createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';
import { selectGlobalFilter } from '../filters/selectors';
import { selectContacts } from './selectors';
import { logOut } from '../auth/operations';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== payload.id,
        );
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items.push(payload);
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.error = null;
      }),
});

export default contactSlice.reducer;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectGlobalFilter],
  (contacts, filterValue) => {
    if (!contacts || contacts.length === 0) return [];
    if (!filterValue || filterValue.trim() === '') return contacts;

    const lowerFilter = filterValue.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowerFilter) ||
        contact.number.includes(filterValue),
    );
  },
);

// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectNameFilter, selectNumberFilter],
//   (contacts, filterContacts, filterNumber) => {
//     return contacts.filter(
//       (contact) =>
//         contact.name.toLowerCase().includes(filterContacts.toLowerCase()) ||
//         contact.number.includes(filterNumber),
//     );
//   },
// );
