import NewPost from "components/NewPost/NewPost";
import PostList from "components/PostList/PostList";
import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { useSetRecoilState } from "recoil";
import { usersState } from "state";
import Header from "../components/Header/Header";

function Homepage() {
  const setUsersState = useSetRecoilState(usersState);
  const initialUsers = useLoaderData();

  useEffect(() => {
    setUsersState(initialUsers);
  }, [initialUsers, setUsersState]);

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
