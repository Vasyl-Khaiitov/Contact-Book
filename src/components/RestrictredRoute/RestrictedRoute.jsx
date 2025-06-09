import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export default function RestrictedRoute({ page, redirectTo }) {
  const isLoggdin = useSelector(selectIsLoggedIn);

  return isLoggdin ? <Navigate to={redirectTo} /> : page;
}
