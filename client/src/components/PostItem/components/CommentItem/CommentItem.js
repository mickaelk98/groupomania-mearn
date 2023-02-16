import { dateParser } from "helpers";
import { NavLink } from "react-router-dom";
import style from "./CommentItem.module.scss";

function CommentItem({ comment }) {
  return (
    <li className={style.comment}>
      <div className={style.commenterinfo}>
        <NavLink to={`/profil/${comment.commenterId}`}>
          <img src={comment.commenterImage} alt="profil" />
        </NavLink>
        <p>{comment.commenterUsername}</p>
      </div>
      <p className={style.date}>{dateParser(comment.timestamp)}</p>
      <p className={style.text}>{comment.text}</p>
    </li>
  );
}

export default CommentItem;
