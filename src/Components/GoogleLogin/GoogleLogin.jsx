import React, { useState, useEffect } from "react";
import styles from "./GoogleLogin.module.css";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../firebase";

const GoogleLogin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Logged in with Google:", result.user);
      setUser(result.user);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {user ? (
        <button onClick={handleLogout} className={styles.button}>
          Logout
        </button>
      ) : (
        <button onClick={handleGoogleLogin} className={styles.button}>
          Continue with Google
        </button>
      )}
    </div>
  );
};

export default GoogleLogin;
