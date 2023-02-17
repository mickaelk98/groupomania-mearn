import { selector, selectorFamily } from "recoil";
import { PostsState, usersState } from "./atoms";

// posts selector
export const selectSortPosts = selector({
  key: "selectSortPosts",
  get: ({ get }) => {
    const posts = get(PostsState);
    const allPost = [...posts];

    return allPost.sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
  },
});

// users selector
export const selectSortUsers = selectorFamily({
  key: "selectSortUsers",
  get:
    (userId) =>
    ({ get }) => {
      const users = get(usersState)?.filter((user) => user._id === userId);
      const user = users[0];
      return user;
    },
});

export const selectFilteredUsers = selectorFamily({
  key: "selectFilteredUsers",
  get:
    (filter) =>
    ({ get }) => {
      const users = get(usersState)?.filter((user) =>
        user.userName.toLocaleLowerCase().startsWith(filter)
      );
      return users;
    },
});
