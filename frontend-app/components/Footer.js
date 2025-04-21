"use client";

import Link from "next/link";
import "../app/global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo">
                <div className="logo-icon">
                  <FontAwesomeIcon icon={faRocket} />
                </div>
                <h2>SocialScheduler</h2>
              </div>
              <p>Smart social media scheduling powered by AI</p>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/scheduler">Scheduler</Link>
                </li>
                <li>
                  <Link href="/scheduled">Scheduler</Link>
                </li>
                <li>
                  <Link href="/innovative">Innovation</Link>
                </li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3>Contact Us</h3>
              <p>Email: hello@socialscheduler.com</p>
              <div className="social-icons">
                <a href="#" aria-label="Twitter">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="#" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 SocialScheduler. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
