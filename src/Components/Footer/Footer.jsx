import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.footerTop}>
                <div className={styles.companyInfo}>
                    <p className={styles.copyRight}>&copy; 2024 MyHomeMarbella. All rights reserved.</p>
                    <p className={styles.address}>C. Orion29649, Málaga, Spanien</p>
                </div>
    
                <div className={styles.contactInfo}>
                   
                    <p>Email: <a href="mailto:info@myhomemarbella.com">info@myhomemarbella.com</a></p>
                    <p>Phone: <a href="tel:+34952223344">+46 73 788 01 04</a></p>
                </div>
            </div>
    
            <div className={styles.footerNavContainer}>
                <nav className={styles.footerNav}>
                    <a href="/about" className={styles.footerLink}>About Us</a>
                    <a href="/contact" className={styles.footerLink}>Contact</a>
                    <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
                </nav>
            </div>
    
          
        </div>
    </footer>
    
    
    
    
    );
};

export default Footer;