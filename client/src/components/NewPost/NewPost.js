import { AuthContext } from "context";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { createPost as addPost } from "api";
import style from "./NewPost.module.scss";
import { useSetRecoilState } from "recoil";
import { PostsState } from "state";

function NewPost() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const setPostsState = useSetRecoilState(PostsState);
  const { userName, image } = user;

  const schema = yup.object({
    text: yup
      .string()
      .max(500, "Votre post doit faire un maximun de 500 caractères"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
    },
    resolver: yupResolver(schema),
  });

  // recupere l'image
  function handleChange(e) {
    setFile(e.target.files[0]);
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

  // fonction de creation de post
  async function createPost(formValue) {
    try {
      if (file) {
        formValue.image = file;
      }
      const newPost = await addPost(formValue);
      setPostsState((oldPosts) => {
        // ajout de la clé edit au post pour le modifier facilement
        return [...oldPosts, { ...newPost, edit: false }];
      });
      reset();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={style.post}>
      <form encType="multipart-form-data" onSubmit={handleSubmit(createPost)}>
        <div className={style.userinfo}>
          <img src={image} alt="profil" />
          <p>{userName}</p>
        </div>
        <textarea
          {...register("text")}
          placeholder="Quoi de neuf aujourd'hui ?"
        ></textarea>
        {errors.text && <small>{errors.text.message}</small>}
        <div className={style.image}>
          <label htmlFor="image">Choissir une image</label>
          <i className="fa-solid fa-upload"></i>
          <input onChange={handleChange} type="file" id="image" />
        </div>
        {imageUrl && (
          <div className={style.preview}>
            <img
              onClick={() => {
                setImageUrl(false);
                setFile(null);
              }}
              src={imageUrl}
              alt="post"
            />
            <span>{file.name}</span>
          </div>
        )}
        <button>Poster</button>
      </form>
    </div>
  );
}

export default NewPost;
