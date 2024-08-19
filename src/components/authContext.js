"use client";
import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../app/firebase.js";
export const AuthContext = createContext();

export const AuthContextProvide = ({ children }) => {
  const [user, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
