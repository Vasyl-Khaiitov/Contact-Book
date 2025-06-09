import { useSelector } from 'react-redux';
import PageTitle from '../../components/PageTitle/PageTitle';
import { selectUser } from '../../redux/auth/selectors';
import Profile from '../../components/Profile/Profile';

export default function ProfilePage() {
  const user = useSelector(selectUser);

  return (
    <div>
      <PageTitle>Welcome to your profile, {user.name}!</PageTitle>
      <Profile />
    </div>
  );
}
