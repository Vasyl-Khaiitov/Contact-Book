import css from './FilterContacts.module.css';
import { useDebouncedCallback } from 'use-debounce';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import { selectGlobalFilter } from '../../redux/filters/selectors';

export default function FilterContacts() {
  const filterValue = useSelector(selectGlobalFilter);

  const dispatch = useDispatch();

  const debounced = useDebouncedCallback((value) => {
    dispatch(changeFilter(value));
  }, 400);

  const handleChange = (event) => {
    debounced(event.target.value);
  };

  return (
    <div className={css.search_box}>
      <span>Find contacts by name and number</span>
      <input
        className={css.input_search}
        type="text"
        defaultValue={filterValue}
        onChange={handleChange}
      />
    </div>
  );
}
