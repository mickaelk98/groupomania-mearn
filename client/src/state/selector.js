import { selector } from "recoil";
import { PostsState } from "./atoms";

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
