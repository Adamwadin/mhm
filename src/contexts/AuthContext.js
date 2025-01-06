import React, { createContext, useState, useEffect } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        getUserRole(user);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getUserRole = async (user) => {
    if (!user || !user.uid) {
      console.error("Invalid user object.");
      return null;
    }
    // Proceed if valid
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data().roles;
    } else {
      console.error("User role not found in Firestore.");
      return null;
    }
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      setIsAuthenticated(true);

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, { roles: ["user"] });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
