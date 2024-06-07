<<<<<<< HEAD
=======
/* Main Author: Angela Kim
User Context Provider - manages user authentication state using React Context API.
Defines a UserContext with initial value of null.
Provides 'login' and 'logout' functions to update user state.
*/
>>>>>>> 39fd6c4e60e9cf7860655055d81a598d20d967ab
import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
