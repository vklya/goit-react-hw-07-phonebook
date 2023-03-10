import { createAsyncThunk } from "@reduxjs/toolkit";

import { getContacts, addContact, deleteContact } from "services/api";

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, {rejectWithValue}) => {
        try {
            const result = await getContacts();
            return result;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAddContact = createAsyncThunk(
    'contacts/add',
    async (data, {rejectWithValue}) => {
        try {
            const result = await addContact(data);
            return result;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchDeleteContact = createAsyncThunk(
    'contacts/delete',
    async (id, {rejectWithValue}) => {
        try {
            const data = await deleteContact(id);
            return data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);