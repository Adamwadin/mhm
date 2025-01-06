import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";

const Navbar = ({ isAuthenticated, user }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.body}>
      <div className={`${styles.Navbar} ${isScrolled ? styles.shrink : ""}`}>
        <a href="/" className={styles.NavbarLink}>Booking</a>
        <div className={styles.lineBreakVertical}></div>
        <a href="/about" className={styles.NavbarLink}>Info</a>
        <div className={styles.lineBreakVertical}></div>
        <a href="/contact" className={styles.NavbarLink}>Pictures</a>
        <div className={styles.lineBreakVertical}></div>
        <a href="/contact" className={styles.NavbarLink}>Contact</a>
        <div className={styles.lineBreakVertical}></div>
        {isAuthenticated && <p className={styles.greeting}>Welcome {user?.displayName}!</p>}
       
      </div>
      
    </div>
  );
};

export default Navbar;
