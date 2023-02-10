import { AuthContext } from "context";
import { useContext, useEffect, useState } from "react";
import style from "./NewPost.module.scss";

function NewPost() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const { userName, image } = user;

  // recupere l'image
  function handleChange(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

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

  return (
    <div className={style.post}>
      <form encType="multipart-form-data">
        <div className={style.userinfo}>
          <img src={image} alt="profil" />
          <p>{userName}</p>
        </div>
        <textarea placeholder="Quoi de neuf aujourd'hui ?"></textarea>
        <div className={style.image}>
          <label htmlFor="image">Choissir une image</label>
          <i className="fa-solid fa-upload"></i>
          <input onChange={handleChange} type="file" id="image" />
        </div>
        {imageUrl && (
          <div className={style.preview}>
            <img onClick={() => setImageUrl(false)} src={imageUrl} alt="post" />
            <span>{file.name}</span>
          </div>
        )}
        <button>Poster</button>
      </form>
    </div>
  );
}

export default NewPost;
