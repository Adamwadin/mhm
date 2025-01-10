import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section id="contact"></section>
      <div className={styles.footerContent}>
        <div className={styles.footerTop}>
          <div className={styles.companyInfo}>
            <p className={styles.copyRight}>
              &copy; 2024 MyHomeMarbella. All rights reserved.
            </p>
            <p className={styles.address}>C. Orion29649, Málaga, Spanien</p>
          </div>

          <div className={styles.contactInfo}>
            <p>
              Email:{" "}
              <a href="mailto:info@myhomemarbella.com">
                info@myhomemarbella.com
              </a>
            </p>
            <p>
              Phone: <a href="tel:+46737880104">+46 73 788 01 04</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
