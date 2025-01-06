import React, { useContext } from "react";
import styles from "./main.module.css";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../../contexts/AuthContext"; 

const Main = () => {
  const { user, isAuthenticated, handleLogin, handleLogout } = useContext(AuthContext); 
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      <div className={styles.Body}>
        <h1 className={styles.MyHomeMarbella}>MyHomeMarbella</h1>
        <div className={styles.lineBreak}></div>
        <div className={styles.ButtonContainer}>
          <div>
            {isAuthenticated ? (
              <a className={styles.logoutButton} onClick={handleLogout}>Logout</a>
            ) : (
              <a className={styles.LoginButton} onClick={handleLogin}>
                Login with&nbsp;
                <span className={styles.blue}>G</span>
                <span className={styles.red}>o</span>
                <span className={styles.yellow}>o</span>
                <span className={styles.blue}>g</span>
                <span className={styles.green}>l</span>
                <span className={styles.red}>e</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
