import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ page }) {
  const isLoggdin = useSelector(selectIsLoggedIn);

  return isLoggdin ? page : <Navigate to="/login" />;
}
