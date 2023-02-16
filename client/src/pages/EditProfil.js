import Header from "components/Header/Header";

function EditProfil() {
  return (
    <div className="editprofil">
      <Header />
      <main className="editprofil-main container">
        <form className="editprofil-main__form">
          <h2>Modifer son profil</h2>

          <div className="editprofil-main__form-item editprofil-main__form-name">
            <label htmlFor="name">Nom</label>
            <input type="text" id="name" />
          </div>

          <div className="editprofil-main__form-item editprofil-main__form-email">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>

          <div className="editprofil-main__form-item editprofil-main__form-password">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" />
          </div>

          <div className="editprofil-main__form-item editprofil-main__form-image">
            <label htmlFor="image">Choissir une image</label>
            <i className="fa-solid fa-upload"></i>
          </div>
          <input type="file" id="image" />

          <img src="https://groupomania.site/images/default.jpg" alt="profil" />

          <button>Modifier</button>
        </form>
      </main>
    </div>
  );
}

export default EditProfil;
