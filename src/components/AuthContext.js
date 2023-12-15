// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    cityId: null,
    token: null,
  });

  const setAuth = (cityId, token) => {
    setAuthData({ cityId, token });
  };

  return (
    <AuthContext.Provider value={{ authData, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
