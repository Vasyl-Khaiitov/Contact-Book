import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import { selectContacts, selectLoading } from '../../redux/contacts/selectors';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';
import FilterContacts from '../../components/FilterContacts/FilterContacts';
import PageTitle from '../../components/PageTitle/PageTitle';
import Loader from '../../components/Loader/Loader';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js/';

export default function ContactPage() {
  const dispatch = useDispatch();
  const isloading = useSelector(selectLoading);
  const loggedin = useSelector(selectIsLoggedIn);
  const contacts = useSelector(selectContacts);

  const contactsLength = contacts.length === 0;

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      {isloading && <Loader />}
      <PageTitle>Your Contacts</PageTitle>
      {loggedin && (
        <>
          <ContactForm />
          {loggedin && !contactsLength && <FilterContacts />}
          <ContactList />
        </>
      )}
    </div>
  );
}
