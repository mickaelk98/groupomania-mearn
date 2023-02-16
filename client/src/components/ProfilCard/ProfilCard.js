import { getAllUsers } from "api";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectSortUsers, usersState } from "state";
import style from "./ProfilCard.module.scss";

function ProfilCard() {
  const setUsersState = useSetRecoilState(usersState);
  const params = useParams();
  const userId = params.id;
  const arrayOfUsers = useRecoilValue(selectSortUsers(userId));
  const { ...userProfilInfo } = arrayOfUsers[0];

  console.log(userProfilInfo, userId);

  useEffect(() => {
    async function fetchAllUseres() {
      try {
        const users = await getAllUsers();

        setUsersState(users);
      } catch (e) {}
    }

    fetchAllUseres();
  }, [setUsersState]);

  return (
    <div className={style.profilcard}>
      <img className={style.image} src={userProfilInfo.image} alt="profil" />
      <div className={style.name}>
        <h2>Nom - Pseudo</h2>
        <p>{userProfilInfo.userName}</p>
      </div>
      <div className={style.email}>
        <h2>Email</h2>
        <p>{userProfilInfo.email}</p>
      </div>
      <div className={style.description}>
        <h2>Description</h2>
        <p>{userProfilInfo.description}</p>
      </div>
    </div>
  );
}

export default ProfilCard;
