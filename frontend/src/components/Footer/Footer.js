import React from "react";
import './Footer.css';
import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaTwitter, FaLinkedin, FaStackOverflow, FaCodepen } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">

                    <div className="site-links">
                        <h3>Explore Gallery</h3>

                        <ul className="list-unstyled three-column">
                            <li>Home</li>
                            <li>Tools</li>
                            <li>Places</li>
                        </ul>
                        <ul className="list-unstyled three-column">
                            <li>Services</li>
                            <li>Source Code</li>
                            <li>Recommendations</li>
                        </ul>
                        <ul className="list-unstyled three-column">
                            <li>Our Team</li>
                            <li>About</li>
                            <li>Code</li>
                        </ul>

                        <ul className="list-unstyled socila-list">
                            <li><FaFacebook /></li>
                            <li><FaGithub /></li>
                            <li><FaInstagram /></li>
                            <li><FaYoutube /></li>
                            <li><FaTwitter /></li>
                            <li><FaLinkedin /></li>
                            <li><FaStackOverflow /></li>
                            <li><FaCodepen /></li>
                        </ul>
                    </div>

                    <div class="footer-images">
                        <img className="img-thumbnail" src={process.env.PUBLIC_URL + '/images/placeholder1.png'} alt="Placeholder 1" />
                    <img className="img-thumbnail" src={process.env.PUBLIC_URL + '/images/placeholder2.png'} alt="Placeholder 2" />
                    <img className="img-thumbnail" src={process.env.PUBLIC_URL + '/images/placeholder3.png'} alt="Placeholder 3" />
                    </div>


                </div>

                <div class="copyright text-center">
                    Copyright &copy; 2023 <span>Made with love 💘 by us</span>
                </div>
            </div>
        </footer>
    );
}