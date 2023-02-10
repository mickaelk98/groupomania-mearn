import NewPost from "components/NewPost/NewPost";
import Header from "../components/Header/Header";

function Homepage() {
  return (
    <div className="home">
      <Header />
      <main className="home__main">
        <NewPost />
      </main>
    </div>
  );
}

export default Homepage;
