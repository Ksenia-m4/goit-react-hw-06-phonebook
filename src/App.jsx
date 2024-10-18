import { useEffect, useMemo, useRef, useState } from "react";
import { nanoid } from "nanoid";

import "./App.css";
import Container from "./components/Container/Container";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import ContactFilter from "./components/Filter/ContactFilter";

const LS_KEY = "contacts_list";

const contactsList = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem(LS_KEY);
    return savedContacts ? JSON.parse(savedContacts) : contactsList;
  });

  const [filter, setFilter] = useState("");

  const isFirstRender = useRef(true);

  // componentDidUpdate (только после первого рендера)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (!name || !number) {
      return alert("Both name and number are required");
    }

    const duplicateContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicateContact) {
      return alert(`${name} is already in contacts`);
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts((prevContacts) => {
      return [newContact, ...prevContacts];
    });
  };

  const deleteContact = (contactId) => {
    setContacts((prevState) => {
      return prevState.filter((contact) => contact.id !== contactId);
    });
  };

  const onChangeFilter = (e) => {
    setFilter(e.target.value);
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
        <ContactForm onSubmit={addContact} />

        <h2 className="SubTitle">Contacts</h2>
        <ContactFilter value={filter} onChange={onChangeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDelete={deleteContact}
        ></ContactList>
      </Container>
    </>
  );
};

export default App;
