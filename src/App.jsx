import Container from "./components/Container/Container";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import ContactFilter from "./components/Filter/ContactFilter";

import "./App.css";

const App = () => {
  return (
    <>
      <Container>
        <h1 className="Title">Phonebook</h1>
        <ContactForm />

        <h2 className="SubTitle">Contacts</h2>
        <ContactFilter />

        <ContactList />
      </Container>
    </>
  );
};

export default App;
