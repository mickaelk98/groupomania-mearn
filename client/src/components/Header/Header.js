import { AuthContext } from "context";
import { useContext, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import HaederMobileMenu from "./components/HeaderMobileMenu/HeaderMobileMenu";
import styles from "./Header.module.scss";

function Header() {
  const { logout, user } = useContext(AuthContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      {user ? (
        <header className={styles.header}>
          <div className={`${styles.container} container`}>
            <NavLink to="/">
              <h1 className={styles.title}>Groupomania</h1>
            </NavLink>
            <span className={styles.navbar}>
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMobileMenu(true);
                }}
                className="fa-solid fa-bars"
              ></i>
            </span>
            <HeaderMenu logout={logout} user={user} />
            {showMobileMenu && (
              <HaederMobileMenu
                hideMobileMenu={() => setShowMobileMenu(false)}
                user={user}
                logout={logout}
              />
            )}
          </div>
        </header>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Header;
