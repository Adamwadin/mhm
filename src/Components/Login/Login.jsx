import React, { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import Spinner from "../Spinner/Spinner";
import styles from "./Login.module.css";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsModalOpen(false);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setError(null);
      console.log("User signed in:", userCredential.user);
    } catch (error) {
      setError(error.message);
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsModalOpen(false);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
      setIsModalOpen(false);
    } catch (error) {
      setError("Sign up failed. Please try again.");
      console.error("Sign up failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {!user ? (
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.mainLoginButton}
          >
            Login or Sign up
          </button>

          {isModalOpen && (
            <div className={styles.overlay}>
              <div className={styles.modal}>
                <div className={styles.container}>
                  <div
                    className={`${styles.leftSide} ${
                      isSignUp ? styles.signUpText : styles.loginText
                    }`}
                  >
                    <h1>Create your account</h1>
                    <span className={styles.lineBreak}></span>
                    <p>Book your dream holiday on the sunny Costa del Sol</p>
                  </div>

                  <form
                    className={styles.form}
                    onSubmit={isSignUp ? handleSignUp : handleLogin}
                  >
                    <button
                      className={`${styles.closeButton} ${
                        isSignUp
                          ? styles.signUpBackground
                          : styles.loginBackground
                      }`}
                      onClick={() => setIsModalOpen(false)}
                    >
                      &times;
                    </button>
                    <div
                      className={`${styles.rightSide} ${
                        isSignUp
                          ? styles.signUpBackground
                          : styles.loginBackground
                      }`}
                    >
                      <div className={styles.switchContainer}>
                        <h3
                          className={`${styles.switchText} ${
                            isSignUp ? styles.fadeOut : styles.fadeIn
                          }`}
                        >
                          Login
                        </h3>
                        <h3
                          className={`${styles.switchText} ${
                            isSignUp ? styles.fadeIn : styles.fadeOut
                          }`}
                        >
                          Register
                        </h3>
                      </div>

                      <div className={styles.inputContainer}>
                        <input
                          type="email"
                          placeholder=""
                          className={styles.input}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label htmlFor="email" className={styles.label}>
                          Email
                        </label>
                      </div>
                      <div className={styles.inputContainer}>
                        <input
                          type="password"
                          placeholder=""
                          className={styles.input}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label htmlFor="password" className={styles.label}>
                          Password
                        </label>
                      </div>
                      {error && <p className={styles.error}>{error}</p>}
                      <div className={styles.signInbuttonContainer}>
                        <button type="submit" className={styles.button}>
                          {isSignUp ? "Register" : "Login"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsSignUp((prev) => !prev)}
                          className={styles.signUpbutton}
                        >
                          {isSignUp ? "Login" : "Register"}
                        </button>
                      </div>
                      <div className={styles.orContainer}>
                        <span className={styles.lineBreak}></span>
                        <span className={styles.or}>or</span>
                        <span className={styles.lineBreak}></span>
                      </div>
                      <GoogleLogin />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {isLoading ? (
            <Spinner />
          ) : (
            <div>
              <button onClick={handleLogout} className={styles.button}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
