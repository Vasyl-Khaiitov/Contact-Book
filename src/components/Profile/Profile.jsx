import { useDispatch, useSelector } from 'react-redux';
import css from './Profile.module.css';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';

const defaultImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.profile_container}>
      {/* Фото профілю */}
      <div className={css.profile_info}>
        <img className={css.avatar} src={defaultImg} alt="User Avatar" />
        <div className={css.user_details}>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
      {/* Додаткові функції */}
      <div className={css.profile_actions}>
        <button className={css.edit_button}>Edit Profile</button>
        <button
          className={css.logout_button}
          type="button"
          onClick={handleClick}
        >
          Logout
        </button>
      </div>
      {/* Рекомендації або останні активності */}
      <div className={css.recommendations}>
        <h2>Latest Updates</h2>
        <p>Check out new features and personalized content!</p>
      </div>
    </div>
  );
}
