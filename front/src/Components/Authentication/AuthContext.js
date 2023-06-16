import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInPerson, setLoggedInPerson] = useState(null);

  const login = (person) => {
    setLoggedInPerson(person);
    console.log("Heree")

  };

  const logout = () => {
    setLoggedInPerson(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInPerson, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
