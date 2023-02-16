import Header from "components/Header/Header";
import ProfilCard from "components/ProfilCard/ProfilCard";

function Profil() {
  return (
    <div className="profil">
      <Header />
      <main className="profil__main container">
        <ProfilCard />
      </main>
    </div>
  );
}

export default Profil;
