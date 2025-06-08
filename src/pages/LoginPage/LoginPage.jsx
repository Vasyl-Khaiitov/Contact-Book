import { useSelector } from 'react-redux';
import PageTitle from '../../components/PageTitle/PageTitle';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import LogInForm from '../../components/LoginForm/LoginForm';

export default function LoginPage() {
  const loggdin = useSelector(selectIsLoggedIn);

  return (
    <div>
      {!loggdin && <PageTitle>Please log in</PageTitle>}
      {!loggdin && <LogInForm />}
    </div>
  );
}
