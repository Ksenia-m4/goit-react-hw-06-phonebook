import css from "./ContactFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../store/filter/filterSlice";

const ContactFilter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onChangeFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className={css.filter}>
      <label htmlFor="filter">Find contacts by name</label>
      <input id="filter" type="text" value={filter} onChange={onChangeFilter} />
    </div>
  );
};

export default ContactFilter;
