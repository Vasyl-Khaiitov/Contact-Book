import { useSelector } from 'react-redux';
import PageTitle from '../../components/PageTitle/PageTitle';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function RegisterPage() {
  const isLoggdin = useSelector(selectIsLoggedIn);

  return (
    <div>
      {!isLoggdin && <PageTitle>Register your account</PageTitle>}
      {!isLoggdin && <RegistrationForm />}
    </div>
  );
}
