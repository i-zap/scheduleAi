"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "../app/global.css";

// Font Awesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Scheduler", path: "/scheduler" },
  { name: "Scheduled", path: "/scheduled" },
  { name: "Innovation", path: "/innovative" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <div className="logo-icon">
            <FontAwesomeIcon icon={faRocket} />
          </div>
          <h1>SocialScheduler</h1>
        </div>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.path} className={pathname === link.path ? "active" : ""}>
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="#" className="btn-login">
              Login
            </Link>
          </li>
          <li>
            <button
              id="theme-toggle"
              className="theme-toggle"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
            >
              <FontAwesomeIcon icon={faSun} />
              <FontAwesomeIcon icon={faMoon} />
            </button>
          </li>
        </ul>

        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
