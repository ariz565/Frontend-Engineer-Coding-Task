import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { showToastMessage } from "../utils/helpers";

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactState {
  items: Contact[];
}

const initialState: ContactState = {
  items: [],
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.items.push(action.payload);
      showToastMessage("Contact created.", "success");
      // Update local storage
      localStorage.setItem("contacts", JSON.stringify(state.items));
    },
    removeContact: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (contact) => contact.id !== String(action.payload)
      );
      showToastMessage("Contact deleted.", "error");
      // Update local storage
      localStorage.setItem("contacts", JSON.stringify(state.items));
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.items.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      showToastMessage("Contact details updated.", "success");
      // Update local storage
      localStorage.setItem("contacts", JSON.stringify(state.items));
    },
  },
});

export const { addContact, removeContact, updateContact } =
  contactSlice.actions;

const rootReducer = combineReducers({
  contacts: contactSlice.reducer,
});

const storedContacts = localStorage.getItem("contacts");
const preloadedState = storedContacts
  ? { contacts: { items: JSON.parse(storedContacts) } }
  : {};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState,
});
