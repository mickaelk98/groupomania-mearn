import { NavLink } from "react-router-dom";
import styles from "./HeaderMenu.module.scss";

function HeaderMenu({ logout, user }) {
  async function handleClick() {
    await logout();
  }

  return (
    <nav className={styles.navlist}>
      <ul className={styles.user}>
        <li>
          <span className={styles.profil}>
            <NavLink end to={`/profil/${user._id}`}>
              <i className="fa-solid fa-user"></i>
              <p>Profil</p>
            </NavLink>
          </span>
        </li>
        <li>
          <span className={styles.settings}>
            <NavLink end to="/">
              <i className="fa-solid fa-gear"></i>
              <p>Paramètres</p>
            </NavLink>
          </span>
        </li>
        <li>
          <span onClick={handleClick} className={styles.logout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <p>Deconnexion</p>
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderMenu;
