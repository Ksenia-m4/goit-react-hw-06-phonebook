import PropTypes from "prop-types";

import css from "./ContactFilter.module.css";

const ContactFilter = ({ value, onChange }) => {
  return (
    <div className={css.filter}>
      <label htmlFor="filter">Find contacts by name</label>
      <input id="filter" type="text" value={value} onChange={onChange} />
    </div>
  );
};

ContactFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContactFilter;
