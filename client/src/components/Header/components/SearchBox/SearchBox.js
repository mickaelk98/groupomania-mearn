import { useState } from "react";
import { useRecoilValue } from "recoil";
import { selectFilteredUsers } from "state";
import FilteresUser from "../FilteredUser/FilteredUser";
import style from "./SearchBox.module.scss";

function SearchBox() {
  const [filter, setFilter] = useState("");
  const sortedUsers = useRecoilValue(selectFilteredUsers(filter));

  console.log(sortedUsers);

  function handleInput(e) {
    setFilter(e.target.value.trim().toLowerCase());
  }
  return (
    <>
      <div className={style.serchbox}>
        <button className={style.btnsearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          onInput={handleInput}
          type="text"
          className={style.inputsearch}
          placeholder="Rechercher un autre utilisateur"
        />
      </div>
      <ul className={style.userlist}>
        {sortedUsers.map((user) => (
          <li key={user._id}>
            <FilteresUser user={user} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default SearchBox;
