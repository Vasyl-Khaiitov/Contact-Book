import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav>
      <NavLink to="/" className={buildLinkClass}>
        <h2>Home</h2>
      </NavLink>
      {isLoggedIn && (
        <>
          <NavLink to="/contacts" className={buildLinkClass}>
            <h2>Contact</h2>
          </NavLink>
          <NavLink to="/profile" className={buildLinkClass}>
            <h2>Profile</h2>
          </NavLink>
        </>
      )}
    </nav>
  );
}
