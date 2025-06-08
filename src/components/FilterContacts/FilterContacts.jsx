import css from './FilterContacts.module.css';
import { useDebouncedCallback } from 'use-debounce';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import { selectNameFilter } from '../../redux/filters/selectors';

export default function FilterContacts() {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectNameFilter);

  const debounced = useDebouncedCallback((value) => {
    dispatch(changeFilter(value));
  }, 400);

  const handleChange = (event) => {
    debounced(event.target.value);
  };

  return (
    <div className={css.search_box}>
      <span>Find contacts by name</span>
      <input
        className={css.input_search}
        type="text"
        defaultValue={filterValue}
        onChange={handleChange}
      />
    </div>
  );
}
