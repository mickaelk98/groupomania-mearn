import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { useSetRecoilState } from "recoil";
import { usersState } from "state";
import Header from "../components/Header/Header";
import NewPost from "components/NewPost/NewPost";
import SearchBox from "../components/SearchBox/SearchBox";
import PostList from "components/PostList/PostList";

function Homepage() {
  const setUsersState = useSetRecoilState(usersState);
  const initialUsers = useLoaderData();

  useEffect(() => {
    setUsersState(initialUsers);
  }, [initialUsers, setUsersState]);

  return (
    <div className="home">
      <Header />
      <main className="home__main container">
        <NewPost />
        <aside>
          <SearchBox />
        </aside>
        <PostList />
      </main>
    </div>
  );
}

export default Homepage;
