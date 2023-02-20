import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { selectSortUsers } from "state";
import style from "./ProfilCard.module.scss";

function ProfilCard() {
  const params = useParams();
  const userId = params.id;
  const user = useRecoilValue(selectSortUsers(userId));

  return (
    <>
      {user && (
        <div className={style.profilcard}>
          <img className={style.image} src={user.image} alt="profil" />
          <div className={style.name}>
            <h2>Nom - Pseudo</h2>
            <p>{user.userName}</p>
          </div>
          <div className={style.email}>
            <h2>Email</h2>
            <p>{user.email}</p>
          </div>
          <div className={style.description}>
            <h2>Description</h2>
            <p>{user.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilCard;
