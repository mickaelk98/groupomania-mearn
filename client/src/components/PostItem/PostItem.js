import { useState } from "react";
import CommentItem from "./components/CommentItem/CommentItem";
import EditPostItem from "./components/EditPostItem/EditPostItem";
import style from "./PostItem.module.scss";

function PostItem({ post, toogleEditPost }) {
  const [showComments, setShowComments] = useState(false);
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
  } = post;

  return (
    <div className={style.postitem}>
      <i
        onClick={() => toogleEditPost(_id)}
        className={`fa-solid fa-pen-to-square ${style.edititem}`}
      ></i>
      <i className={`fa-sharp fa-solid fa-xmark ${style.deleteitem}`}></i>
      <div className={style.userinfo}>
        <img src={posterImage} alt="profil" />
        <p>{posterUsername}</p>
      </div>
      <p className={style.date}>{createdAt}</p>
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
            <i className="fa-regular fa-heart"></i>
          </span>
          {usersLiked.length > 0 ? (
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
          {comments.length > 0 ? (
            <p>{comments.length} commentaires</p>
          ) : (
            <p>{comments.length} commentaire</p>
          )}
        </div>
      </div>
      {showComments && (
        <ul className={style.allComment}>
          {comments.map((c) => (
            <CommentItem key={c._id} comment={c} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostItem;
