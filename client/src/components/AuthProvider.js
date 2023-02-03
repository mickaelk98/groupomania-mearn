import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../context";
import { login as connectUser } from "../api";

function AuthProvider({ children }) {
  const initialuser = useLoaderData();
  const [user, setUser] = useState(initialuser);

  async function login(credentials) {
    const newUser = await connectUser(credentials);
    setUser(newUser);
  }

  console.log(user);

  // async function logout() {}

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
