import { NavLink } from "react-router-dom";
import styles from "./HeaderMobileMenu.module.scss";

function HaederMobileMenu({ hideMobileMenu, user, logout }) {
  async function handleClick() {
    await logout();
  }
  return (
    <nav
      onClick={(e) => {
        e.stopPropagation();
        hideMobileMenu();
      }}
      className={styles.calc}
    >
      <div
        className={styles.userimage}
        style={{ background: `url('${user.image}') center/cover` }}
      ></div>
      <span className={styles.hidemenu}>
        <i
          onClick={(e) => {
            e.stopPropagation();
            hideMobileMenu();
          }}
          className={`fa-sharp fa-solid fa-xmark `}
        ></i>
      </span>
      <ul className={styles.user}>
        <li>
          <span className={styles.profil}>
            <NavLink to={`/profil/${user._id}`}>
              <i className="fa-solid fa-user"></i>
              <p>Profil</p>
            </NavLink>
          </span>
        </li>
        <li>
          <span className={styles.settings}>
            <NavLink>
              <i className="fa-solid fa-gear"></i>
              <p>Paramètres</p>
            </NavLink>
          </span>
        </li>
        <li>
          <span onClick={handleClick} className={styles.logoutLogo}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <p>Deconnexion</p>
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default HaederMobileMenu;
