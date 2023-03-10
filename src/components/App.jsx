import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Section from './Section';
import Form from './Form';
import Filter from './Filter';
import List from './List';

import { fetchContacts, fetchAddContact, fetchDeleteContact } from 'redux/contactsOperations';
import { getContacts } from 'redux/selectors';
import { getFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';

import css from './app.module.scss';

export function App() {
  const filteredContacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = ( name, number ) => {
    console.log('name ', name);
    dispatch(fetchAddContact({name, number}));
  };

  const handleDeleteContact = id => {
    dispatch(fetchDeleteContact(id));
  };

  const changeFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const isBooks = Boolean(filteredContacts.length);

  return (
    <div className={css.div}>
      <Section title="Phonebook">
        <Form onSubmit={handleAddContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        {isBooks ? (
          <List
            contacts={filteredContacts}
            onDeleteContact={handleDeleteContact}
          />
        ) : (
          <p className={css.message}>There are no contacts in the phonebook.</p>
        )}
      </Section>
    </div>
  );
}
