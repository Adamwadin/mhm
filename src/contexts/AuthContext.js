import React, { createContext, useState, useEffect } from "react";
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setRoles(userDoc.data().roles || []);
        } else {
          setRoles(["user"]);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setRoles([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setUser(user);
      setIsAuthenticated(true);

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setRoles(userDoc.data().roles || []);
      } else {
        await setDoc(userDocRef, { roles: ["user"] });
        setRoles(["user"]);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUser(user);
      setIsAuthenticated(true);

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setRoles(userDoc.data().roles || []);
      } else {
        await setDoc(userDocRef, { roles: ["user"] });
        setRoles(["user"]);
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      setRoles([]);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const createUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        roles: ["user"],
      });

      console.log("User registered successfully:", user);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        roles,
        loading, // Pass loading state
        handleLogin,
        handleLogout,
        handleGoogleLogin,
        createUserWithEmailAndPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
