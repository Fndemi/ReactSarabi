import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isDesktopMenuHovered, setIsDesktopMenuHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // --- Dark Mode Logic ---
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // --- Mobile Menu Logic ---
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsMobileDropdownOpen(false);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileDropdownOpen(false);
  };

  const toggleMobileDropdown = (e) => {
    e.stopPropagation();
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Smooth Scrolling Logic ---
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault(); // Prevent default anchor link behavior
    closeMenu(); // Close mobile menu after clicking a link

    // Check if we are already on the home page
    if (location.pathname === "/") {
      // If on home page, directly scroll after a small delay
      // This delay helps ensure the element is rendered if it's dynamic
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, isMenuOpen ? 300 : 0); // Delay if mobile menu is closing
    } else {
      // If not on home page, navigate to home and pass the targetId in state
      // This avoids a full page reload and allows Home.jsx to handle the scroll
      navigate("/", { state: { scrollToId: targetId } });
    }
  };

  return (
    <>
      {/* Menu Overlay - visible only on mobile when menu is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-all duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      {/* Header */}
      <header
        className="bg-[#836262] text-white fixed top-0 left-0 w-full z-50 shadow-md
                   dark:bg-[#3a2e2e] dark:text-[#f0d6d6] transition-colors duration-300"
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          {/* Logo + Name */}
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <img
              src={logo}
              alt="Sarabi Logo"
              className="w-10 h-10 object-cover rounded-full pl-0"
            />
            <span className="text-lg font-semibold">The Sarabi Restaurant</span>
          </Link>

          {/* Hamburger Icon (mobile only) */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-50"
            aria-label="Toggle Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 origin-center ${
                isMenuOpen ? "rotate-45 translate-x-1.5 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 origin-center ${
                isMenuOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                isMenuOpen ? "-rotate-45 translate-x-1.5 -translate-y-1.5" : ""
              }`}
            />
          </button>

          {/* Combined Navigation Menu (Mobile & Desktop) */}
          <div
            className={`
              fixed inset-0 bg-[#836262] flex-col justify-start items-start gap-0 px-6 py-8 z-40 transform transition-transform duration-300 ease-in-out
              md:relative md:inset-auto md:w-auto md:h-auto md:bg-transparent md:flex md:flex-row md:items-center md:gap-3 md:p-0 md:translate-x-0
              ${isMenuOpen ? "translate-x-0 flex" : "translate-x-full"}
              dark:bg-[#3a2e2e]
            `}
            onClick={(e) => {
              if (window.innerWidth < 768 && e.target === e.currentTarget) {
                closeMenu();
              }
            }}
          >
            <ul className="w-full space-y-2 md:w-auto md:space-y-0 md:flex md:items-center md:gap-2 md:-ml-3">
              {/* Home Link */}
              <li>
                <Link
                  to="/"
                  className={`
                    text-white text-lg hover:text-[#f0d6d6] block py-3 transition-colors
                    md:bg-white md:text-[#836262] md:font-medium md:px-4 md:py-2 md:rounded-full md:hover:bg-gray-100 md:transition-all md:duration-300
                    dark:text-[#f0d6d6] dark:hover:text-white md:dark:bg-[#f0d6d6] md:dark:text-[#3a2e2e] md:dark:hover:bg-[#e6cbcb]
                    ${location.pathname === "/" && location.hash === "" && !location.state?.scrollToId ? "font-bold" : ""}
                  `}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              {/* Our Story Link - Uses smooth scrolling */}
              <li>
                <a
                  href="/#our-story" // Still use anchor for href for semantic correctness and browser fallback
                  className={`
                    text-white text-lg hover:text-[#f0d6d6] block py-3 transition-colors
                    md:bg-white md:text-[#836262] md:font-medium md:px-4 md:py-2 md:rounded-full md:hover:bg-gray-100 md:transition-all md:duration-300
                    dark:text-[#f0d6d6] dark:hover:text-white md:dark:bg-[#f0d6d6] md:dark:text-[#3a2e2e] md:dark:hover:bg-[#e6cbcb]
                    ${location.hash === "#our-story" || (location.pathname === "/" && location.state?.scrollToId === "our-story") ? "font-bold" : ""}
                  `}
                  onClick={(e) => handleSmoothScroll(e, "our-story")}
                >
                  Our Story
                </a>
              </li>

              {/* Menu Dropdown - Desktop hover state and ORIGINAL paths */}
              <li
                className="w-full md:w-auto md:relative"
                onMouseEnter={() => setIsDesktopMenuHovered(true)}
                onMouseLeave={() => setIsDesktopMenuHovered(false)}
              >
                <button
                  onClick={toggleMobileDropdown}
                  className="
                    text-white text-lg hover:text-[#f0d6d6] py-3 transition-colors w-full text-left flex justify-between items-center
                    md:bg-white md:text-[#836262] md:font-medium md:px-4 md:py-2 md:rounded-full md:hover:bg-gray-100 md:transition-all md:duration-300
                    md:w-auto md:justify-start
                    dark:text-[#f0d6d6] dark:hover:text-white md:dark:bg-[#f0d6d6] md:dark:text-[#3a2e2e] md:dark:hover:bg-[#e6cbcb]
                  "
                >
                  Menu
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform duration-200
                      ${isMobileDropdownOpen || isDesktopMenuHovered ? "rotate-180" : ""}
                    `}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <ul
                  className={`
                  pl-4 space-y-1 ${isMobileDropdownOpen ? "block" : "hidden"}
                  md:absolute md:left-0 md:top-full md:mt-1
                  md:bg-white md:text-[#836262] md:rounded-lg md:shadow-lg md:min-w-[160px] md:z-50 md:border md:border-gray-200
                  dark:bg-[#3a2e2e] dark:text-[#f0d6d6] md:dark:bg-[#f0d6d6] md:dark:text-[#3a2e2e] md:dark:border-[#d9b8b8]
                  ${isDesktopMenuHovered ? "md:block" : "md:hidden"}
                `}
                >
                  <li>
                    <Link
                      to="/appetizers"
                      className={`
                        text-[#B08D8D] text-base hover:text-white block py-2 transition-colors
                        md:block md:px-4 md:py-2 md:hover:bg-gray-50 md:rounded-t-lg
                        dark:text-[#5a4545] dark:hover:bg-[#4a3a3a] dark:hover:text-[#f0d6d6] md:dark:hover:bg-[#e6cbcb]
                        ${location.pathname === "/appetizers" ? "font-bold" : ""}
                      `}
                      onClick={closeMenu}
                    >
                      Appetizers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/mains"
                      className={`
                        text-[#B08D8D] text-base hover:text-white block py-2 transition-colors
                        md:block md:px-4 md:py-2 md:hover:bg-gray-50
                        dark:text-[#5a4545] dark:hover:bg-[#4a3a3a] dark:hover:text-[#f0d6d6] md:dark:hover:bg-[#e6cbcb]
                        ${location.pathname === "/mains" ? "font-bold" : ""}
                      `}
                      onClick={closeMenu}
                    >
                      Main Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Desserts"
                      className={`
                        text-[#B08D8D] text-base hover:text-white block py-2 transition-colors
                        md:block md:px-4 md:py-2 md:hover:bg-gray-50 md:rounded-b-lg
                        dark:text-[#5a4545] dark:hover:bg-[#4a3a3a] dark:hover:text-[#f0d6d6] md:dark:hover:bg-[#e6cbcb]
                        ${location.pathname === "/Desserts" ? "font-bold" : ""}
                      `}
                      onClick={closeMenu}
                    >
                      Desserts
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Other Navigation Links */}
              <li>
                <Link
                  to="/order"
                  className={`
                    text-white text-lg hover:text-[#f0d6d6] block py-3 transition-colors
                    md:bg-white md:text-[#836262] md:font-medium md:px-4 md:py-2 md:rounded-full md:hover:bg-gray-100 md:transition-all md:duration-300
                    dark:text-[#f0d6d6] dark:hover:text-white md:dark:bg-[#f0d6d6] md:dark:text-[#3a2e2e] md:dark:hover:bg-[#e6cbcb]
                    ${location.pathname === "/order" ? "font-bold" : ""}
                  `}
                  onClick={closeMenu}
                >
                  Order Now
                </Link>
              </li>
              <li>
                <Link
                  to="/reservation"
                  className={`
                    text-white text-lg hover:text-[#f0d6d6] block py-3 transition-colors
                    md:bg-white md:text-[#836262] md:font-medium md:px-4 md:py-2 md:rounded-full md:hover:bg-gray-100 md:transition-all md:duration-300
                    dark:text-[#f0d6d6] dark:hover:text-white md:dark:bg-[#f0d6d6] md:dark:text-[#3a2e2e] md:dark:hover:bg-[#e6cbcb]
                    ${location.pathname === "/reservation" ? "font-bold" : ""}
                  `}
                  onClick={closeMenu}
                >
                  Reservations
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`
                    text-white text-lg hover:text-[#f0d6d6] block py-3 transition-colors
                    md:bg-white md:text-[#836262] md:font-medium md:px-4 md:py-2 md:rounded-full md:hover:bg-gray-100 md:transition-all md:duration-300
                    dark:text-[#f0d6d6] dark:hover:text-white md:dark:bg-[#f0d6d6] md:dark:text-[#3a2e2e] md:dark:hover:bg-[#e6cbcb]
                    ${location.pathname === "/contact" ? "font-bold" : ""}
                  `}
                  onClick={closeMenu}
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="mt-6 md:mt-0 ml-0 md:ml-4 px-4 py-2 rounded-full bg-white text-[#836262] font-medium
                         dark:bg-[#f0d6d6] dark:text-[#3a2e2e]
                         hover:bg-gray-100 dark:hover:bg-[#e6cbcb]
                         transition-colors duration-300 shadow-sm"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Light
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  Dark
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
