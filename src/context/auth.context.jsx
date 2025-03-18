import React, { useState, useEffect, useContext } from "react";
import authService from "../services/auth.service";
import { UserContext } from "../context/user.context"; 

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const updateUser = (updatedUser) => {
    setUser(updatedUser); // Actualiza en AuthContext
    setUserFromUserContext(updatedUser); // También en UserContext
  };
  
  

  const { setUser: setUserFromUserContext } = useContext(UserContext);

  const storeToken = (token) => {
    console.log("Token almacenado en localStorage: ", token); // Verificación del almacenamiento
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    console.log("Token almacenado en localStorage:", storedToken); // Verifica que el token está aquí

    if (storedToken) {
      authService
        .verify()
        .then((response) => {
          const user = response.data;
          console.log("Usuario autenticado:", user); // Verifica el usuario devuelto por verify()
          setIsLoggedIn(true); 
          setIsLoading(false);
          setUser(user);
          setUserFromUserContext(user);
        })
        .catch((error) => {
          console.error("Error en verify: ", error);
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      console.log("No hay token almacenado.");
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        setUser: setUserFromUserContext,
        updateUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
