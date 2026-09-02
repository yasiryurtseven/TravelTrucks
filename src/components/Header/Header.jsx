import { Link, NavLink } from 'react-router-dom';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Link to="/" className={css.logo}>
        Travel<span className={css.logoHighlight}>Trucks</span>
      </Link>
      <nav className={css.nav}>
        <ul className={css.navList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }>Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }>Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}