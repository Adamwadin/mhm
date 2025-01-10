import React, { useContext } from "react";
import styles from "./main.module.css";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../../contexts/AuthContext";
// import Registration from "../Registration/Registration";
// import GoogleLogin from "../GoogleLogin/GoogleLogin";
import Login from "../Login/Login";

const Main = () => {
  const {
    user,
    isAuthenticated,
    handleLogin,
    handleLogout,
    handleGoogleLogin,
  } = useContext(AuthContext);
  return (
    <div>
      <section id="Home"></section>
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      <div className={styles.Body}>
        <h1 className={styles.MyHomeMarbella}>MyHomeMarbella</h1>
        <div className={styles.lineBreak}></div>
        <div className={styles.ButtonContainer}>
          {/* <Registration /> */}
          <Login />
          {/* <GoogleLogin handleGoogleLogin={handleGoogleLogin} /> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
