


import styles from "./navbar.module.css";
import React from "react";

const Navbar = () => {
  return (
   <div>
    <div className={styles.Navbar}>
        <a href="/" className={styles.NavbarLink}>Booking</a>
        <div className={styles.lineBreakVertical}></div>
        <a href="/about" className={styles.NavbarLink}>Info</a>
        <div className={styles.lineBreakVertical}></div>
        <a href="/contact" className={styles.NavbarLink}>Pictures</a>
        <div className={styles.lineBreakVertical}></div>
        <a href="/contact" className={styles.NavbarLink}>Contact</a>
       

     
    </div>
   </div>
  );
};

export default Navbar;
