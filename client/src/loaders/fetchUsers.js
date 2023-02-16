import { getAllUsers } from "api";

export async function fetchUsers() {
  return getAllUsers();
}
