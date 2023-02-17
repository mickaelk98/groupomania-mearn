import style from "./SearchBox.module.scss";

function SearchBox() {
  return (
    <>
      <div className={style.serchbox}>
        <button className={style.btnsearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          type="text"
          className={style.inputsearch}
          placeholder="Rechercher un autre utilisateur"
        />
      </div>
    </>
  );
}

export default SearchBox;
