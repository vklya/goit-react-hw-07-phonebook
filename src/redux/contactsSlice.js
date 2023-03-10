import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, fetchAddContact, fetchDeleteContact } from "./contactsOperations";

const handlePending = state => {
    state.isLoading = true;
};

const handleRejected = (state, {payload}) => {
    state.isLoading = false;
    state.error = payload;
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (store, { payload }) => {
                store.isLoading = false;
                store.items = payload;
            })
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(fetchAddContact.pending, handlePending)
            .addCase(fetchAddContact.fulfilled, (store, { payload }) => {
                store.isLoading = false;
                const contacts = store.items;
                if (contacts.some(contact => contact.name.toLowerCase() === payload.name.toLowerCase()))
                    return alert(`${payload.name} is already in contacts`);
                contacts.push(payload);
            })
            .addCase(fetchAddContact.rejected, handleRejected)
            .addCase(fetchDeleteContact.pending, handlePending)
            .addCase(fetchDeleteContact.fulfilled, (store, { payload }) => {
                store.isLoading = false;
                const contacts = store.items;
                const index = contacts.findIndex(contact => contact.id === payload);
                contacts.splice(index, 1);
            })
            .addCase(fetchDeleteContact.rejected, handleRejected)
    }
});

export const contactsReducer = contactsSlice.reducer;

