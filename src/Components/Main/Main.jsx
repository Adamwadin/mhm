import styles from "./main.module.css";
import React from "react";
import Navbar from "../Navbar/Navbar";
import React from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

const Main = () => {

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("Google login failed!");
    }
  };


  return (
   <div>
     <Navbar /> 
    <div className={styles.Body}>
          
      <h1 className={styles.MyHomeMarbella}>MyHomeMarbella</h1>
        <div className={styles.lineBreak}></div>




      <div className={styles.ButtonContainer}>


      <button onClick={handleGoogleLogin}>
      Login with Google
    </button>
        <a href="/register" className={styles.RegisterButton}>
            Register
        </a>

      </div>
    </div>
    </div>
  );
};

export default Main;
