import Header from "components/Header/Header";
import ProfilCard from "components/ProfilCard/ProfilCard";
import { AuthContext } from "context";
import { useContext } from "react";
import { useParams } from "react-router-dom";

function Profil() {
  const { user, deleteCurrentUser } = useContext(AuthContext);
  const params = useParams();
  const userId = params.id;

  async function handleClick() {
    try {
      const confirmation = window.confirm(
        "La suppression de votre profil vous empechera de vous connecter avec ce compte."
      );
      if (confirmation) {
        await deleteCurrentUser(user._id);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="profil">
      <Header />
      <main className="profil__main container">
        <ProfilCard />
        {user._id === userId && (
          <button onClick={handleClick} className="profil__main-btn">
            supprimer le profil
          </button>
        )}
      </main>
    </div>
  );
}

export default Profil;
