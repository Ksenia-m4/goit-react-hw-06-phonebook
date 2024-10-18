import PropTypes from "prop-types";

import css from "./ContactListItem.module.css";

const ContactListItem = ({ id, name, number, onDelete }) => {
  return (
    <li className={css.item}>
      {name}: {number}
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactListItem;
