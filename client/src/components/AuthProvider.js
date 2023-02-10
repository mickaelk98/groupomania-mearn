import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../context";
import { login as connectUser, logout as disconnectUser } from "../api";

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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
