import { createContext, useContext, useState } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ email: "", auth: false });

  // Login updates the user data with a name parameter
  const loginContext = (email, token) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      email: "",
      auth: false,
    }));
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
