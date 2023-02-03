import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../assets/images/logo.png";
import { login as connectUser } from "../api";
import { NavLink } from "react-router-dom";

function Login() {
  const [passwordType, setPasswordType] = useState("password");

  const schema = yup.object({
    email: yup
      .string()
      .email("Votre saisie ne correspond pas a une adresse email")
      .required("Ce champ est obligatoire"),
    password: yup
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
      .matches(".*\\d.*", "Votre mot de passe doit contenir au moin un nombre")
      .matches(
        ".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*",
        "Votre mot de passe doit contenir au moin un caractere speciale"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  // envoi des données
  async function Login(formValue) {
    try {
      clearErrors();
      const user = await connectUser(formValue);
      console.log(user);
    } catch (e) {
      setError("email", { type: "email", message: e.email });
      setError("password", { type: "password", message: e.password });
    }
  }

  return (
    <div className="auth">
      <div className="auth__container  container">
        <div
          className="auth__logo"
          style={{ background: `url('${logo}') center/cover` }}
        ></div>
        <p className="auth__text">
          Avec Groupomania, restez en contact avec vos collegues et amis
        </p>

        <form className="auth__form" onSubmit={handleSubmit(Login)}>
          <input
            {...register("email")}
            className="auth__form__input"
            type="text"
            placeholder="Entrez votre email"
          />
          {errors?.email && (
            <small className="auth__form__input-error">
              {errors.email.message}
            </small>
          )}

          <div className="auth__form__password-container">
            <input
              {...register("password")}
              type={passwordType}
              placeholder="Entrez votre mot de passe"
            />

            {passwordType === "text" ? (
              <i
                onClick={() => {
                  setPasswordType("password");
                }}
                className="fa-regular fa-eye"
              ></i>
            ) : (
              <i
                onClick={() => {
                  setPasswordType("text");
                }}
                className="fa-regular fa-eye-slash"
              ></i>
            )}
          </div>
          {errors?.password && (
            <small className="auth__form__input-error">
              {errors.password.message}
            </small>
          )}

          <div className="auth__form__buttons">
            <button disabled={isSubmitting} type="submit">
              Se connecter
            </button>
            <NavLink to="/">Je n'ai pas de compte</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
