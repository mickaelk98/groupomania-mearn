import style from "./CommentItem.module.scss";

function CommentItem({ comment }) {
  return (
    <li className={style.comment}>
      <div className={style.commenterinfo}>
        <img src={comment.commenterImage} alt="profil" />
        <p>{comment.commenterUsername}</p>
      </div>
      <p className={style.date}>{comment.timestamp}</p>
      <p className={style.text}>{comment.text}</p>
    </li>
  );
}

export default CommentItem;
