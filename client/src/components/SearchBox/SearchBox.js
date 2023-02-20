import { useState } from "react";
import { useRecoilValue } from "recoil";
import { selectFilteredUsers } from "state";
import FilteresUser from "../FilteredUser/FilteredUser";
import style from "./SearchBox.module.scss";

function SearchBox() {
  const [filter, setFilter] = useState("");
  const sortedUsers = useRecoilValue(selectFilteredUsers(filter));
  // const [showSortedUsers, setShowSortedUser] = useState(false);

  console.log(sortedUsers);

  function handleInput(e) {
    setFilter(e.target.value.trim().toLowerCase());
  }
  return (
    <div className={style.searchbox}>
      <form className={style.form}>
        <input
          onInput={handleInput}
          type="text"
          placeholder="Rechercher un utilisateur"
        />
        <button type="button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <ul className={style.userlist}>
        {sortedUsers &&
          sortedUsers.map((user) => (
            <li key={user._id}>
              <FilteresUser user={user} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchBox;
