import Header from "components/Header/Header";
import ProfilCard from "components/ProfilCard/ProfilCard";
import { AuthContext } from "context";
import { useContext } from "react";
import { useParams } from "react-router-dom";

function Profil() {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const userId = params.id;

  return (
    <div className="profil">
      <Header />
      <main className="profil__main container">
        <ProfilCard />
        {user._id === userId && (
          <button className="profil__main-btn">supprimer le profil</button>
        )}
      </main>
    </div>
  );
}

export default Profil;
