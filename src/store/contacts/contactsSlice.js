import { createSlice, nanoid } from "@reduxjs/toolkit";
import { contactsInitialState } from "./contactsInitialState";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer: (state, action) => {
        state.unshift(action.payload);
      },
      prepare: (name, number) => ({
        payload: { id: nanoid(), name, number },
      }),
    },
    deleteContact: {
      reducer: (state, action) => {
        const updatedContacts = state.filter(
          (contact) => contact.id !== action.payload
        );
        return updatedContacts;
      },
    },
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { addContact, deleteContact } = contactsSlice.actions;
