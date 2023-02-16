import { atom } from "recoil";

export const PostsState = atom({
  key: "postsState",
  default: [],
});

export const usersState = atom({
  key: "usersState",
  default: [],
});
