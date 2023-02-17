import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../context";
import {
  editUser,
  login as connectUser,
  logout as disconnectUser,
  deleteUser,
} from "../api";

function AuthProvider({ children }) {
  const initialuser = useLoaderData();
  const [user, setUser] = useState(initialuser);

  async function login(credentials) {
    const newUser = await connectUser(credentials);
    setUser(newUser);
  }

  async function logout() {
    await disconnectUser();
    setUser(null);
  }

  async function editProfil(userId, data) {
    const newUser = await editUser(userId, data);
    setUser(newUser);
  }

  async function deleteCurrentUser(userId) {
    const newUser = await deleteUser(userId);
    setUser(newUser);
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, editProfil, deleteCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
