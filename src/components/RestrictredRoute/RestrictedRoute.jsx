import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export default function RestrictedRoute({ page, redirectTo }) {
  const isLoggedin = useSelector(selectIsLoggedIn);

  return isLoggedin ? <Navigate to={redirectTo} /> : page;
}
