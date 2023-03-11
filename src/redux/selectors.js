export const getFilter = ({filter}) => filter;

export const getContacts = ({ contacts, filter }) => {
    const { items } = contacts;
    if (!filter) return items;
    const normalizedFilter = filter.toLowerCase();
    
    const result = items.filter(({ name }) =>
        name.toLowerCase().includes(normalizedFilter),
    );
    return result;
};