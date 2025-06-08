import css from './App.module.css';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import { useSelector } from 'react-redux';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import FilterContacts from '../FilterContacts/FilterContacts';
import ResponsiveAppBar from '../Header/Header';
import { selectError, selectLoading } from '../../redux/contacts/selectors';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import CredentialsSignInPage from '../LoginForm/LoginForm';

export default function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <div className={css.container}>
      <ResponsiveAppBar />
      {!isLoggedIn && <CredentialsSignInPage />}
      {error && <Error />}
      {isLoggedIn && <ContactForm />}
      {isLoggedIn && !loading && !error && <FilterContacts />}
      {loading && <Loader />}
      {isLoggedIn && <ContactList />}
    </div>
  );
}
