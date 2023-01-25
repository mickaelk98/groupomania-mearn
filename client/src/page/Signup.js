import { useState } from "react";
import logo from "../assets/images/logo.png";

function Signup() {
  const [passwordType, setPasswordType] = useState("password");

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

        <form className="signup__form">
          <input
            className="signup__input"
            type="text"
            placeholder="Entrez votre nom ou pseudo"
          />

          <input
            className="signup__input"
            type="email"
            placeholder="Entrez votre email"
          />

          <div className="signup__password-container">
            <input
              type={passwordType}
              placeholder="Entrez votre mot de passe"
            />
            {passwordType === "text" ? (
              <i
                onClick={() => {
                  setPasswordType("password");
                }}
                class="fa-regular fa-eye"
              ></i>
            ) : (
              <i
                onClick={() => {
                  setPasswordType("text");
                }}
                class="fa-regular fa-eye-slash"
              ></i>
            )}
          </div>

          <div className="signup__buttons">
            <button>S'inscrire</button>
            <button type="button">j'ai déja un compte</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
