import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/contacts/slice';

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.contact_list}>
      {contacts.map(({ id, name, number, userCountry }) => (
        <li className={css.contact_list_item} key={id}>
          <Contact name={name} number={number} id={id} country={userCountry} />
        </li>
      ))}
    </ul>
  );
}
