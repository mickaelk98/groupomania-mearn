import style from "./ProfilCard.module.scss";

function ProfilCard() {
  return (
    <div className={style.profilcard}>
      <img
        className={style.image}
        src="https://groupomania.site/images/default.jpg"
        alt="profil"
      />
      <div className={style.name}>
        <h2>Nom - Pseudo</h2>
        <p>unser name</p>
      </div>
      <div className={style.email}>
        <h2>Email</h2>
        <p>test@mail.com</p>
      </div>
      <div className={style.description}>
        <h2>Description</h2>
        <p>description</p>
      </div>
    </div>
  );
}

export default ProfilCard;
