import NewPost from "components/NewPost/NewPost";
import PostList from "components/PostList/PostList";
import Header from "../components/Header/Header";

function Homepage() {
  return (
    <div className="home">
      <Header />
      <main className="home__main">
        <NewPost />
        <PostList />
      </main>
    </div>
  );
}

export default Homepage;
