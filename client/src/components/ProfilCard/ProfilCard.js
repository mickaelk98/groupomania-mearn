import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectSortUsers, usersState } from "state";
import style from "./ProfilCard.module.scss";

function ProfilCard() {
  const setUsersState = useSetRecoilState(usersState);
  const params = useParams();
  const userId = params.id;
  const initialUsers = useLoaderData();
  const user = useRecoilValue(selectSortUsers(userId));

  useEffect(() => {
    setUsersState(initialUsers);
  }, [initialUsers, setUsersState]);

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
