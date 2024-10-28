import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import css from "./ContactListItem.module.css";
import { deleteContact } from "../../store/contacts/contactsSlice";

const ContactListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <li className={css.item}>
      {name}: {number}
      <button onClick={() => handleDeleteContact(id)}>Delete</button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactListItem;
