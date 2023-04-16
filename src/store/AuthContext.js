import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLogin: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthCtxProvider = (props) => {
  const [token, setToken] = useState(null);

  const userLogdIn = !!token;

  const logedInHandler = (token) => {
    setToken(token);
  };
  const logedOutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLogin: userLogdIn,
    login: logedInHandler,
    logout: logedOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
