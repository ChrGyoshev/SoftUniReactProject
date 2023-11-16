import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log("logged in");
      } else {
        console.log("logged out");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
