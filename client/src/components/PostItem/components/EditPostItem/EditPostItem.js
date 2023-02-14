import { useEffect, useState } from "react";
import { editPost as newPost } from "api";
import style from "./EditPostItem.module.scss";
import { useRecoilState } from "recoil";
import { PostsState } from "state";

function EditPostItem({ post }) {
  const { _id, text, image } = post;
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState(image);
  const [postText, setPostText] = useState(text);
  const [posts, setPosts] = useRecoilState(PostsState);

  // affiche la preview de l'image
  useEffect(() => {
    if (file) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", () => {
        setImageUrl(fileReader.result);
      });
    }
  }, [file]);

  // recupere l'image
  function handleChangeImage(e) {
    setFile(e.target.files[0]);
  }

  // recupere la saisie de l'utilisateur
  function handleChangeText(e) {
    setPostText(e.target.value);
  }

  // fonction
  async function editPost() {
    try {
      const formValue = { text: postText, image: file };

      const editedPost = await newPost(formValue, _id);

      const newPostState = posts.map((p) =>
        p._id === _id ? { ...editedPost, edit: false } : p
      );

      setPosts(newPostState);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form className={style.editpostform}>
      <textarea onChange={handleChangeText} value={postText}></textarea>
      {imageUrl && (
        <img className={style.postimage} src={imageUrl} alt="post" />
      )}
      <div className={style.image}>
        <label htmlFor="editImage">Choissir une image</label>
        <i className="fa-solid fa-upload"></i>
        <input onChange={handleChangeImage} type="file" id="editImage" />
      </div>
      <button type="button" onClick={editPost}>
        Sauvegarder
      </button>
    </form>
  );
}

export default EditPostItem;
