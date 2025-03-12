import { createContext, useContext, useState } from "react";

// Exporta el contexto
export const UserContext = createContext();

// UserProvider que envuelve a los hijos y proporciona el contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook para acceder al contexto
export const useUser = () => useContext(UserContext);
