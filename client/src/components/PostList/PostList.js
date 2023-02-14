import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { PostsState } from "state";
import { getAllPosts as fetchPosts } from "api";
import PostItem from "../PostItem/PostItem";
import style from "./PostList.module.scss";

function PostList() {
  const [posts, setPosts] = useRecoilState(PostsState);

  // fonction pour recuperer tout les posts
  useEffect(() => {
    async function getAllPosts() {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (e) {
        console.log(e);
      }
    }
    getAllPosts();
  }, [setPosts]);

  // fonction pour afficher le template de modifivation d'un post
  function toogleEdit(postId) {
    const newPost = posts.map((p) =>
      p._id === postId ? { ...p, edit: !p.edit } : p
    );
    setPosts(newPost);
  }

  return (
    <div className={style.postlist}>
      <ul>
        {posts &&
          posts.map((post) => (
            <PostItem key={post._id} post={post} toogleEditPost={toogleEdit} />
          ))}
      </ul>
    </div>
  );
}

export default PostList;
