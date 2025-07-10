import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // --- Dark Mode Logic ---
  useEffect(() => {
    // On component mount, check localStorage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark'); // Apply dark class to html
    } else {
      // If no preference or preference is 'light', ensure 'dark' class is removed
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Whenever isDarkMode changes, update localStorage and the html class
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]); // Re-run when isDarkMode state changes

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode); // Toggle the state
  };
  // --- End Dark Mode Logic ---

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) { // If menu is about to open, close dropdown
      setIsMobileDropdownOpen(false);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileDropdownOpen(false); // Always close mobile dropdown when main menu closes
  };

  const toggleMobileDropdown = (e) => {
    e.stopPropagation(); // Prevent closing the main menu when clicking the dropdown button
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  // Close menu on window resize for desktop view
  useEffect(() => {
    const handleResize = () => {
      // If window size is desktop or larger, ensure mobile menu is closed
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Menu Overlay - visible only on mobile when menu is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-all duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMenu}
      />

      {/* Header */}
      {/* Added dark mode styles for the header itself */}
      <header className="bg-[#836262] text-white fixed top-0 left-0 w-full z-50 shadow-md
                         dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          {/* Logo + Name */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Sarabi Logo"
              className="w-10 h-10 object-cover rounded-full pl-0"
            />
            <span className="text-lg font-semibold">The Sarabi Restaurant</span>
          </div>

          {/* Hamburger Icon (mobile only) */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-50" // Z-index to be above mobile menu
            aria-label="Toggle Menu"
          >
            {/* Hamburger lines with X animation */}
            <span
              className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 origin-center ${
                isMenuOpen ? 'rotate-45 translate-x-1.5 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 origin-center ${
                isMenuOpen ? 'opacity-0 scale-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                isMenuOpen ? '-rotate-45 translate-x-1.5 -translate-y-1.5' : ''
              }`}
            />
          </button>

          {/* Combined Navigation Menu (Mobile & Desktop) */}
          {/* This div acts as the container that slides in/out on mobile */}
          <div
            className={`
              fixed inset-0 bg-[#836262] flex-col justify-start items-start gap-0 px-6 py-8 z-40 transform transition-transform duration-300 ease-in-out
              md:relative md:inset-auto md:w-auto md:h-auto md:bg-transparent md:flex md:flex-row md:items-center md:gap-3 md:p-0 md:translate-x-0
              ${isMenuOpen ? 'translate-x-0 flex' : 'translate-x-full'}
              dark:bg-gray-900 md:dark:bg-transparent {/* Mobile menu background in dark mode */}
            `}
            // Only close menu when clicking outside links on mobile, but inside the menu div
            onClick={(e) => {
              if (window.innerWidth < 768 && e.target === e.currentTarget) {
                closeMenu();
              }
            }}
          >
            {/* Navigation Links - styles applied responsively */}
            {/* This ul is always visible within its parent div, but its children's styles adapt */}
            <ul className="w-full space-y-2 md:w-auto md:space-y-0 md:flex md:items-center md:gap-2 md:-ml-3">
              {/* Home */}
              <li>
                <a
                  href="#"
                  className="
                    text-white text-lg hover:text-custom-gold block py-3 transition-colors
                    md:bg-white md:text-[#836262] md:font-medium md:px-4 md:py-2 md:rounded-full md:hover:bg-gray-100 md:transition-all md:duration-300
                    dark:text-gray-100 dark:hover:text-gray-300 md:dark:bg-gray-700 md:dark:text-gray-100 md:dark:hover:bg-gray-600 {/* Dark mode styles */}
                  "
                  onClick={closeMenu}
                >
                  Home
                </a>
              </li>
              {/* Our Story */}
              <li>
                <a
                  href="#our-story"
                  className="
                    text-white text-lg hover:text-custom-gold block py-3 transition-colors
                    md:bg-white md:text-[#836262] md:font-medium md:px-4 md:py-2 md:rounded-full md:hover:bg-gray-100 md:transition-all md:duration-300
                    dark:text-gray-100 dark:hover:text-gray-300 md:dark:bg-gray-700 md:dark:text-gray-100 md:dark:hover:bg-gray-600 {/* Dark mode styles */}
                  "
                  onClick={closeMenu}
                >
                  Our Story
                </a>
              </li>

              {/* Menu Dropdown - Logic for both mobile and desktop combined */}
              <li className="w-full md:w-auto md:relative group"> {/* Added 'group' here */}
                {/* Dropdown Button */}
                <button
                  onClick={toggleMobileDropdown}
                  className="
                    text-white text-lg hover:text-custom-gold py-3 transition-colors w-full text-left flex justify-between items-center
                    md:bg-white md:text-[#836262] md:font-medium md:px-4 md:py-2 md:rounded-full md:hover:bg-gray-100 md:transition-all md:duration-300
                    md:w-auto md:justify-start
                    dark:text-gray-100 dark:hover:text-gray-300 md:dark:bg-gray-700 md:dark:text-gray-100 md:dark:hover:bg-gray-600 {/* Dark mode styles */}
                  "
                >
                  Menu
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform duration-200
                      ${isMobileDropdownOpen ? 'rotate-180 md:rotate-0' : ''}
                      md:group-hover:rotate-180`}
                    fill="currentColor" // Use currentColor for dynamic color
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {/* Dropdown Content */}
                <ul className={`
                  pl-4 space-y-1 ${isMobileDropdownOpen ? 'block' : 'hidden'}
                  md:absolute md:left-0 md:top-full md:mt-1 md:hidden md:group-hover:block
                  md:bg-white md:text-[#836262] md:rounded-lg md:shadow-lg md:min-w-[160px] md:z-50 md:border md:border-gray-200
                  dark:bg-gray-800 dark:text-gray-100 md:dark:border-gray-700 {/* Dark mode styles */}
                `}>
                  <li>
                    <a
                      href="./components/appetizer.html"
                      className="
                        text-[#B08D8D] text-base hover:text-white block py-2 transition-colors
                        md:block md:px-4 md:py-2 md:hover:bg-gray-50 md:rounded-t-lg
                        dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white {/* Dark mode styles */}
                      "
                      onClick={closeMenu}
                    >
                      Appetizers
                    </a>
                  </li>
                  <li>
                    <a
                      href="./components/main-dishes.html"
                      className="
                        text-[#B08D8D] text-base hover:text-white block py-2 transition-colors
                        md:block md:px-4 md:py-2 md:hover:bg-gray-50
                        dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white {/* Dark mode styles */}
                      "
                      onClick={closeMenu}
                    >
                      Main Courses
                    </a>
                  </li>
                  <li>
                    <a
                      href="./components/dessert.html"
                      className="
                        text-[#B08D8D] text-base hover:text-white block py-2 transition-colors
                        md:block md:px-4 md:py-2 md:hover:bg-gray-50 md:rounded-b-lg
                        dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white {/* Dark mode styles */}
                      "
                      onClick={closeMenu}
                    >
                      Desserts
                    </a>
                  </li>
                </ul>
              </li>

              {/* Order Now */}
              <li>
                <a
                  href="./pages/order.html"
                  className="
                    text-white text-lg hover:text-custom-gold block py-3 transition-colors
                    md:bg-white md:text-[#836262] md:font-medium md:px-4 md:py-2 md:rounded-full md:hover:bg-gray-100 md:transition-all md:duration-300
                    dark:text-gray-100 dark:hover:text-gray-300 md:dark:bg-gray-700 md:dark:text-gray-100 md:dark:hover:bg-gray-600 {/* Dark mode styles */}
                  "
                  onClick={closeMenu}
                >
                  Order Now
                </a>
              </li>
              {/* Reservations */}
              <li>
                <a
                  href="./pages/Reservation.html"
                  className="
                    text-white text-lg hover:text-custom-gold block py-3 transition-colors
                    md:bg-white md:text-[#836262] md:font-medium md:px-4 md:py-2 md:rounded-full md:hover:bg-gray-100 md:transition-all md:duration-300
                    dark:text-gray-100 dark:hover:text-gray-300 md:dark:bg-gray-700 md:dark:text-gray-100 md:dark:hover:bg-gray-600 {/* Dark mode styles */}
                  "
                  onClick={closeMenu}
                >
                  Reservations
                </a>
              </li>
              {/* Contact Us */}
              <li>
                <a
                  href="./pages/feedback.html"
                  className="
                    text-white text-lg hover:text-custom-gold block py-3 transition-colors
                    md:bg-white md:text-[#836262] md:font-medium md:px-4 md:py-2 md:rounded-full md:hover:bg-gray-100 md:transition-all md:duration-300
                    dark:text-gray-100 dark:hover:text-gray-300 md:dark:bg-gray-700 md:dark:text-gray-100 md:dark:hover:bg-gray-600 {/* Dark mode styles */}
                  "
                  onClick={closeMenu}
                >
                  Contact Us
                </a>
              </li>
            </ul>

            {/* Dark Mode Toggle Button - placed at the end of the mobile menu / desktop nav */}
            {/* Added styling for positioning and appearance */}
            <button
              onClick={toggleDarkMode}
              className="mt-6 md:mt-0 ml-0 md:ml-4 px-4 py-2 rounded-full border border-white text-white
                         dark:border-gray-400 dark:text-gray-400
                         hover:bg-white hover:text-[#836262] dark:hover:bg-gray-700 dark:hover:text-white
                         transition-colors duration-300"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;