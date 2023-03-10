import axios from "axios";

const instance = axios.create({
    baseURL: 'https://640baf2ba3e07380e8e54896.mockapi.io'
});

export const getContacts = async () => {
    const { data } = await instance.get('/contacts');
    return data;
}

export const addContact = async (contact) => {
    const { data } = await instance.post('/contacts', contact);
    return data;
}

export const deleteContact = async (id) => {
    const { data } = await instance.delete(`/contacts/${id}`);
    return data;
}