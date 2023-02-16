import { AuthContext } from "context";
import { useContext, useState } from "react";
import CommentItem from "./components/CommentItem/CommentItem";
import EditPostItem from "./components/EditPostItem/EditPostItem";
import { dateParser } from "helpers";
import { deleteOnePost, likeAndDislikePost } from "api";
import style from "./PostItem.module.scss";
import { useSetRecoilState } from "recoil";
import { PostsState } from "state";
import AddComment from "./components/AddComment/AddComment";
import { NavLink } from "react-router-dom";

function PostItem({ post, toogleEditPost }) {
  const [showComments, setShowComments] = useState(false);
  const { user } = useContext(AuthContext);
  const setPostState = useSetRecoilState(PostsState);

  const {
    posterUsername,
    posterImage,
    text,
    image,
    createdAt,
    comments,
    usersLiked,
    edit,
    _id,
    posterId,
  } = post;

  // fonction de suppression de post
  async function deletePost() {
    try {
      const post = await deleteOnePost(_id);
      setPostState((oldPosts) => {
        return oldPosts.filter((oldPost) => oldPost._id !== _id);
      });
      console.log(post);
    } catch (e) {
      console.log(e);
    }
  }

  // fonction pour liké et disliké un post
  async function likeAndDislike() {
    try {
      const post = await likeAndDislikePost(_id);
      setPostState((oldPosts) => {
        return oldPosts.map((oldPost) =>
          oldPost._id === post._id ? post : oldPost
        );
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={style.postitem}>
      {user._id === posterId && (
        <>
          <i
            onClick={() => toogleEditPost(_id)}
            className={`fa-solid fa-pen-to-square ${style.edititem}`}
          ></i>
          <i
            onClick={deletePost}
            className={`fa-sharp fa-solid fa-xmark ${style.deleteitem}`}
          ></i>
        </>
      )}
      <div className={style.userinfo}>
        <NavLink to={`/profil/${posterId}`}>
          <img src={posterImage} alt="profil" />
        </NavLink>
        <p>{posterUsername}</p>
      </div>
      <p className={style.date}>{dateParser(createdAt)}</p>
      {edit ? (
        <>
          <EditPostItem post={post} />
        </>
      ) : (
        <>
          {text && <p className={style.posttext}>{text}</p>}
          {image && <img className={style.postimage} src={image} alt="post" />}
        </>
      )}
      <div className={style.likecomment}>
        <div className={style.likes}>
          <span>
            <i
              onClick={likeAndDislike}
              className="fa-solid fa-heart"
              style={
                usersLiked.includes(user._id)
                  ? { color: "#fd2d01" }
                  : { color: "" }
              }
            ></i>
          </span>
          {usersLiked.length > 1 ? (
            <p>{usersLiked.length} likes</p>
          ) : (
            <p>{usersLiked.length} like</p>
          )}
        </div>
        <div className={style.comments}>
          <span>
            <i
              onClick={() => setShowComments(!showComments)}
              className="fa-solid fa-comment"
            ></i>
          </span>
          {comments.length > 1 ? (
            <p>{comments.length} commentaires</p>
          ) : (
            <p>{comments.length} commentaire</p>
          )}
        </div>
      </div>
      {showComments && (
        <>
          <AddComment postId={_id} />
          <ul className={style.allComment}>
            {comments.map((c) => (
              <CommentItem key={c._id} comment={c} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default PostItem;
