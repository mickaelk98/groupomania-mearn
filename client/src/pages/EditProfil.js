import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "components/Header/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "context";
import { useNavigate } from "react-router-dom";

function EditProfil() {
  const { user, editProfil: editUser } = useContext(AuthContext);
  const [inputPasswordType, setInputPasswordType] = useState("password");
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState(user.image);
  const navigate = useNavigate();
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

  const schema = yup.object().shape(
    {
      userName: yup
        .string()
        .required("Ce champ est obligatoire")
        .min(2, "Votre nom doit faire au moin 2 caractères")
        .max(20, "Votre nom doit faire maximun 20 caractères"),
      email: yup
        .string()
        .email("Votre saisie ne correspond pas a une adresse email")
        .required("Ce champ est obligatoire"),
      password: yup.string().when("password", (value) => {
        if (value?.length > 0) {
          return yup
            .string()
            .required("Ce champ est obligatoire")
            .min(8, "Votre mot de pass doit faire minimun 8 caractères")
            .matches(
              ".*[A-Z].*",
              "Votre mot de passe doit contenir au moin une majuscule"
            )
            .matches(
              ".*[a-z].*",
              "Votre mot de passe doit contenir au moin une minuscule"
            )
            .matches(
              ".*\\d.*",
              "Votre mot de passe doit contenir au moin un nombre"
            )
            .matches(
              ".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*",
              "Votre mot de passe doit contenir au moin un caractere speciale"
            );
        } else {
          return yup.string().notRequired();
        }
      }),
      description: yup
        .string()
        .max(500, "Votre description doit faire maximun 500 caractères"),
    },
    [["password", "password"]]
  );

  // recupere l'image
  function handleChangeImage(e) {
    setFile(e.target.files[0]);
  }

  const defaultValues = {
    userName: user.userName,
    email: user.email,
    password: "",
    description: user.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  // envoi des données
  async function editProfil(formValue) {
    try {
      clearErrors();
      formValue.image = file;
      await editUser(user._id, formValue);
      reset();
      navigate(`/profil/${user._id}`);
    } catch (e) {
      console.log(e);
      setError("userName", { type: "userName", message: e.userName });
      setError("email", { type: "email", message: e.email });
      setError("password", { type: "password", message: e.password });
    }
  }

  return (
    <div className="editprofil">
      <Header />
      <main className="editprofil-main container">
        <form
          className="editprofil-main__form"
          onSubmit={handleSubmit(editProfil)}
        >
          <h2>Modifer son profil</h2>

          <div className="editprofil-main__form-item editprofil-main__form-name">
            <label htmlFor="name">Nom</label>
            <input {...register("userName")} type="text" id="name" />
            {errors.userName && (
              <small className="editprofil-main__form-error">
                {errors.userName.message}
              </small>
            )}
          </div>

          <div className="editprofil-main__form-item editprofil-main__form-email">
            <label htmlFor="email">Email</label>
            <input {...register("email")} type="email" id="email" />
            {errors.email && (
              <small className="editprofil-main__form-error">
                {errors.email.message}
              </small>
            )}
          </div>

          <div className="editprofil-main__form-item editprofil-main__form-password">
            <label htmlFor="password">Mot de passe</label>
            <input
              {...register("password")}
              type={inputPasswordType}
              id="password"
            />
            {errors.password && (
              <small className="editprofil-main__form-error">
                {errors.password.message}
              </small>
            )}
            {inputPasswordType === "text" ? (
              <i
                onClick={() => {
                  setInputPasswordType("password");
                }}
                className="fa-regular fa-eye editprofil-main__form-logo"
              ></i>
            ) : (
              <i
                onClick={() => {
                  setInputPasswordType("text");
                }}
                className="fa-regular fa-eye-slash editprofil-main__form-logo"
              ></i>
            )}
          </div>
          <div className="editprofil-main__form-item editprofil-main__form-description">
            <label htmlFor="description">Votre description</label>
            <textarea {...register("description")} id="description"></textarea>
            {errors.description && (
              <small className="editprofil-main__form-error">
                {errors.description.message}
              </small>
            )}
          </div>

          <div className="editprofil-main__form-item editprofil-main__form-image">
            <label htmlFor="image">Choissir une image</label>
            <i className="fa-solid fa-upload"></i>
          </div>
          <input onChange={handleChangeImage} type="file" id="image" />

          {imageUrl && <img src={imageUrl} alt="profil" />}

          <button disabled={isSubmitting}>Modifier</button>
        </form>
      </main>
    </div>
  );
}

export default EditProfil;
