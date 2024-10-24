import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
      ? localStorage.getItem("isLoggedIn") === "true"
      : false
  );

  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const login = async (username, password) => {
    const response = await fetch(
      `http://localhost:3000/users?username=${username}`
    );
    const data = await response.json();

    if (data.length === 0) {
      setIsLoggedIn(false);
      return false;
    }

    const user = data[0];

    if (user.password !== password) {
      setIsLoggedIn(false);
      return false;
    }

    setUser(user);
    setIsLoggedIn(true);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);