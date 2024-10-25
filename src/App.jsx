import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "./components/Container/Container";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import ContactFilter from "./components/Filter/ContactFilter";
import { addContact, deleteContact } from "./store/contacts/contactsSlice";

import "./App.css";
import { setFilter } from "./store/filter/filterSlice";

const LS_KEY = "contacts_list";

const App = () => {
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    if (!name || !number) {
      return alert("Both name and number are required");
    }

    const duplicateContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicateContact) {
      return alert(`${name} is already in contacts`);
    }

    dispatch(addContact(name, number));
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const onChangeFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const filteredContacts = useMemo(() => {
    const normalizedName = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedName)
    );
  }, [contacts, filter]);

  return (
    <>
      <Container>
        <h1 className="Title">Phonebook</h1>
        <ContactForm onSubmit={handleAddContact} />

        <h2 className="SubTitle">Contacts</h2>
        <ContactFilter value={filter} onChange={onChangeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDelete={handleDeleteContact}
        ></ContactList>
      </Container>
    </>
  );
};

export default App;
