// Footer.js

import React from "react";
import styles from './Footer.module.css';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaStackOverflow,
  FaCodepen
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div >
        <div className={styles.row}>

          <div className={styles.siteLinks}>
            <h3>Explore Gallery</h3>

            <ul className={`${styles.listUnstyled} ${styles.threeColumn}`}>
              <li>Home</li>
              <li>Tools</li>
              <li>Places</li>
            </ul>
            <ul className={`${styles.listUnstyled} ${styles.threeColumn}`}>
              <li>Services</li>
              <li>Source Code</li>
              <li>Recommendations</li>
            </ul>
            <ul className={`${styles.listUnstyled} ${styles.threeColumn}`}>
              <li>Our Team</li>
              <li>About</li>
              <li>Code</li>
            </ul>

            <ul className={`${styles.listUnstyled} ${styles.socialList}`}>
              {/* <li><FaFacebook /></li> */}
              <li><FaGithub /></li>
              <li><FaInstagram /></li>
              <li><FaYoutube /></li>
              {/* <li><FaTwitter /></li> */}
              <li><FaLinkedin /></li>
              <li><FaStackOverflow /></li>
            </ul>
          </div>

          {/* <div className={styles.footerImages}>
            <img className={styles.imgThumbnail} src={process.env.PUBLIC_URL + '/images/placeholder1.png'} alt="Placeholder 1" />
            <img className={styles.imgThumbnail} src={process.env.PUBLIC_URL + '/images/placeholder2.png'} alt="Placeholder 2" />
            <img className={styles.imgThumbnail} src={process.env.PUBLIC_URL + '/images/placeholder3.png'} alt="Placeholder 3" />
          </div> */}

        </div>

        <div className={styles.copyright}>
          Copyright &copy; 2023 <span>Made with love 💘 by us</span>
        </div>
      </div>
    </footer>
  );
}