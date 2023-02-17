import style from "./FilteredUser.module.scss";

function FilteredUser({ user }) {
  return (
    <div className={style.user}>
      <img className={style.image} src={user.image} alt="profil" />
      <p className={style.name}>{user.userName}</p>
    </div>
  );
}

export default FilteredUser;
