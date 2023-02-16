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

// useres selector
export const selectSortUsers = selectorFamily({
  key: "selectSortUsers",
  get:
    (userId) =>
    ({ get }) => {
      const users = get(usersState);
      return users.filter((user) => user._id === userId);
    },
});
