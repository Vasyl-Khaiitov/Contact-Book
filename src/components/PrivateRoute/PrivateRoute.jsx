import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectisRefreshing,
  selectToken,
} from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ page }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectisRefreshing);
  const token = useSelector(selectToken);

  if (isRefreshing) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn && token) {
    return <p>Loading...</p>;
  }

  return isLoggedIn ? page : <Navigate to="/login" />;
}
