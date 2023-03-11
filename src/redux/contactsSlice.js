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
            .addCase(fetchContacts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.items = payload;
            })
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(fetchAddContact.pending, handlePending)
            .addCase(fetchAddContact.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                const contacts = state.items;
                console.log(contacts);
                if (contacts.find(contact => contact.name.toLowerCase() === payload.name.toLowerCase())) {
                    alert(`${payload.name} is already in contacts`)
                    return;
                } else contacts.push(payload);
            })
            .addCase(fetchAddContact.rejected, handleRejected)
            .addCase(fetchDeleteContact.pending, handlePending)
            .addCase(fetchDeleteContact.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                const contacts = state.items;
                const index = contacts.findIndex(contact => contact.id === payload);
                contacts.splice(index, 1);
            })
            .addCase(fetchDeleteContact.rejected, handleRejected)
    }
});

export const contactsReducer = contactsSlice.reducer;

