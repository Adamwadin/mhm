import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-scroll";

const Navbar = ({ isAuthenticated, user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div className={`${styles.menu} ${isMenuOpen ? styles.show : ""}`}>
          <Link to="Home" smooth={true} className={styles.NavbarLink}>
            Home
          </Link>
          <Link to="pictures" smooth={true} className={styles.NavbarLink}>
            Pictures
          </Link>

          <Link to="info" smooth={true} className={styles.NavbarLink}>
            Info
          </Link>
          <Link to="booking" smooth={true} className={styles.NavbarLink}>
            Booking
          </Link>
          <Link to="contact" smooth={true} className={styles.NavbarLink}>
            Contact
          </Link>
          {isAuthenticated && (
            <p className={styles.greeting}>Welcome {user?.displayName}!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
