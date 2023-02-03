import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../assets/images/logo.png";
import { signup as createUser } from "../api";

function Signup() {
  const [passwordType, setPasswordType] = useState("password");

  const schema = yup.object({
    userName: yup
      .string()
      .required("Ce champ est obligatoire")
      .min(2, "Votre nom doit faire au moin 2 caractères")
      .max(20, "Votre nom doit faire maximun 20 caractères"),
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

  // console.log(errors);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  // envoi des données
  async function Signup(inputValue) {
    try {
      clearErrors();
      await createUser(inputValue);
    } catch (e) {
      setError("userName", { type: "userName", message: e.userName });
      setError("email", { type: "email", message: e.email });
      setError("password", { type: "password", message: e.password });
    }
  }

  return (
    <div className="signup">
      <div className="signup__container  container">
        <div
          className="signup__logo"
          style={{ background: `url('${logo}') center/cover` }}
        ></div>
        <p className="signup__text">
          Avec Groupomania, restez en contact avec vos collegues et amis
        </p>

        <form className="signup__form" onSubmit={handleSubmit(Signup)}>
          <input
            {...register("userName")}
            className="signup__input"
            type="text"
            placeholder="Entrez votre nom ou pseudo"
          />
          {errors?.userName && (
            <small className="signup__error">{errors.userName.message}</small>
          )}

          <input
            {...register("email")}
            className="signup__input"
            type="text"
            placeholder="Entrez votre email"
          />
          {errors?.email && (
            <small className="signup__error">{errors.email.message}</small>
          )}

          <div className="signup__password-container">
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
            <small className="signup__error">{errors.password.message}</small>
          )}

          <div className="signup__buttons">
            <button disabled={isSubmitting} type="submit">
              S'inscrire
            </button>
            <button type="button">j'ai déja un compte</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
