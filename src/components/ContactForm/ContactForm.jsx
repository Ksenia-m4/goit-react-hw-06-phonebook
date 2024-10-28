import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addContact } from "../../store/contacts/contactsSlice";

import css from "./ContactForm.module.css";

const ContactForm = () => {
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setContactName(value);
        break;
      case "number":
        setContactNumber(value);
        break;

      default:
        throw new Error(`Unsupported name type ${name}`);
    }
  };

  const reset = () => {
    setContactName("");
    setContactNumber("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const duplicateContact = contacts.find(
      (contact) => contact.name.toLowerCase() === contactName.toLowerCase()
    );

    if (duplicateContact) {
      return alert(`${contactName} is already in contacts`);
    }

    dispatch(addContact(contactName, contactNumber));

    reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor="name">Name</label>
      <input
        onChange={handleChange}
        type="text"
        name="name"
        id="name"
        value={contactName}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="number">Phone</label>
      <input
        onChange={handleChange}
        type="tel"
        name="number"
        id="number"
        value={contactNumber}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
