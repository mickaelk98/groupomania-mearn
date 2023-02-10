import { AuthContext } from "context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  const { logout, user } = useContext(AuthContext);

  async function handleClick() {
    await logout();
  }

  return (
    <>
      {user ? (
        <header className={styles.header}>
          <div className={`${styles.container} container`}>
            <h1 className={styles.title}>Groupomania</h1>
            <span className={styles.logoutLogo}>
              <i
                onClick={handleClick}
                className="fa-solid fa-right-from-bracket"
              ></i>
            </span>
          </div>
        </header>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Header;
