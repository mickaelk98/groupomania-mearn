import { NavLink } from "react-router-dom";
import style from "./FilteredUser.module.scss";

function FilteredUser({ user }) {
  return (
    <div className={style.user}>
      <NavLink to={`/profil/${user._id}`}>
        <img className={style.image} src={user.image} alt="profil" />
      </NavLink>
      <p className={style.name}>{user.userName}</p>
    </div>
  );
}

export default FilteredUser;
