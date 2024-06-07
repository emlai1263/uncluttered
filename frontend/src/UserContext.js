<<<<<<< HEAD
=======
/* Main Author: Angela Kim
User Context Provider - manages user authentication state using React Context API.
Defines a UserContext with initial value of null.
Provides 'login' and 'logout' functions to update user state.
*/
>>>>>>> 9ddc871e8e4f02ab1318347dc6bc4835cda8c546
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
