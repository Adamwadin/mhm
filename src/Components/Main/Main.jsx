import styles from "./main.module.css";
import React from "react";
import Navbar from "../Navbar/Navbar";

const Main = () => {




  return (
   <div>
     <Navbar /> 
    <div className={styles.Body}>
          
      <h1 className={styles.MyHomeMarbella}>MyHomeMarbella</h1>
        <div className={styles.lineBreak}></div>




      <div className={styles.ButtonContainer}>


        <a href="/login" className={styles.LoginButton}>
            Login
        </a>
        <a href="/register" className={styles.RegisterButton}>
            Register
        </a>

      </div>
    </div>
    </div>
  );
};

export default Main;
