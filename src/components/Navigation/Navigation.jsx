import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/" className={buildLinkClass}>
        <h2>Home</h2>
      </NavLink>
      <NavLink to="/contacts" className={buildLinkClass}>
        <h2>Contact</h2>
      </NavLink>
    </nav>
  );
}
