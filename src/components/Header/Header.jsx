import { Link, NavLink } from 'react-router-dom';
import css from './Header.module.css';

export default function Header() {
  const getLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <header className={css.header}>
      <Link to="/" className={css.logo}>
        Travel<span className={css.logoHighlight}>Trucks</span>
      </Link>
      <nav className={css.nav}>
        <ul className={css.navList}>
          <li>
            <NavLink to="/" end className={getLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog" className={getLinkClass}>
              Catalog
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className={getLinkClass}>
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}