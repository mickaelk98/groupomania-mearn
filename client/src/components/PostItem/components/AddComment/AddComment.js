import { commentOnePost } from "api";
import { AuthContext } from "context";
import { useContext, useState } from "react";
import { useSetRecoilState } from "recoil";
import { PostsState } from "state";
import style from "./AddComment.module.scss";

function AddComment({ postId }) {
  const { user } = useContext(AuthContext);
  const [commentValue, setCommentValue] = useState();
  const setPostsState = useSetRecoilState(PostsState);

  // recupere la saisie de l'utilisateur
  function handleChange(e) {
    setCommentValue(e.target.value);
  }

  async function handleKeyDown(e) {
    try {
      // envoie les données quand on appuie sur la touche entrez
      if (e.key === "Enter" && commentValue.length > 0) {
        console.log("envoyer : " + commentValue);
        const post = await commentOnePost(postId, commentValue);
        setPostsState((oldPosts) => {
          return oldPosts.map((oldPost) =>
            oldPost._id === postId ? post : oldPost
          );
        });
        setCommentValue("");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form className={style.addcomment}>
      <img src={user.image} alt="profil" />
      <textarea
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={commentValue}
        placeholder="Ajouter un commentaire"
      ></textarea>
    </form>
  );
}

export default AddComment;
