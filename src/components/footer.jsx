import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import Link, useNavigate, useLocation
import {
  FaPhone,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic opening hours checker
  useEffect(() => {
    const checkOpeningHours = () => {
      const now = new Date();
      const currentHour = now.getHours();
      // const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday) - not used in logic

      // Open everyday from 9:00AM (9) to 12:00AM (0)
      const isWeekdayOpen = currentHour >= 9 && currentHour < 24;
      setIsOpen(isWeekdayOpen);
    };

    checkOpeningHours();
    // Update status every minute
    const interval = setInterval(checkOpeningHours, 60000);
    return () => clearInterval(interval);
  }, []);

  // --- Smooth Scrolling Logic (Copied from Navbar for consistency) ---
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault(); // Prevent default anchor link behavior

    // Check if we are already on the home page
    if (location.pathname === "/") {
      // If on home page, directly scroll after a small delay
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100); // A small delay to ensure element is rendered
    } else {
      // If not on home page, navigate to home and pass the targetId in state
      navigate("/", { state: { scrollToId: targetId } });
    }
  };

  return (
    <footer className=" bg-[#9f7373] text-white py-12 px-6 dark:bg-[#3a2e2e] transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Restaurant Info */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            The Sarabi Restaurant
          </h2>

          <address className="not-italic space-y-2">
            <div className="flex items-center gap-3">
              <FaPhone className="text-white" />
              <a
                href="tel:+11101223223"
                className="hover:text-[#e0b7b7ba] transition"
              >
                +111 01 22 32 23
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-white" />
              <a
                href="mailto:TheSarabi@gmail.com"
                className="hover:text-[#e0b7b7ba] transition"
              >
                TheSarabi@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaClock className="text-white" />
              <span>
                {isOpen ? (
                  <span className="text-green-300 font-semibold">
                    We're Open!
                  </span>
                ) : (
                  <span className="text-red-300 font-semibold">
                    Currently Closed
                  </span>
                )}{" "}
                9:00AM - 12:00AM
              </span>
            </div>
          </address>

          {/* Embedded Google Map */}
          <div className="pt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.123456789012!2d-122.12345678901234!3d37.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDA3JzI0LjQiTiAxMjLCsDA3JzI0LjQiVw!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg shadow-md"
              title="Restaurant Location"
            ></iframe>
          </div>
        </section>

        {/* Nav links */}
        <nav aria-label="Main navigation">
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-[#e0b7b7ba] transition" onClick={() => navigate('/')}>
                Home
              </Link>
            </li>
            <li>
              <a // Use <a> for Our Story as it's handled by smoothScroll
                href="/#our-story"
                className="hover:text-[#e0b7b7ba] transition"
                onClick={(e) => handleSmoothScroll(e, "our-story")}
              >
                Our Story
              </a>
            </li>
            <li>
              <Link to="/menu" className="hover:text-[#e0b7b7ba] transition" onClick={() => navigate('/menu')}>
                Menu
              </Link>
            </li>
            <li>
              <Link to="/order" className="hover:text-[#e0b7b7ba] transition" onClick={() => navigate('/order')}>
                Order Now
              </Link>
            </li>
            <li>
              <Link to="/reservation" className="hover:text-[#e0b7b7ba] transition" onClick={() => navigate('/reservation')}>
                Reservations
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#e0b7b7ba] transition" onClick={() => navigate('/contact')}>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Social Media */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex flex-col gap-4 mb-6">
            {[
              { icon: <FaInstagram />, name: "Instagram", url: "https://www.instagram.com/sarabirestaurant" }, // Added example URLs
              { icon: <FaFacebook />, name: "Facebook", url: "https://www.facebook.com/sarabirestaurant" },
              { icon: <FaTwitter />, name: "Twitter", url: "https://twitter.com/sarabirestaurant" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url} // Use the actual social media URL
                target="_blank" // Open in new tab
                rel="noopener noreferrer" // Security best practice for target="_blank"
                aria-label={social.name}
                className="flex items-center gap-2 text-xl hover:text-[#e0b7b7ba] transition"
              >
                {social.icon}
                {social.name}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-400">@TheSarabiRestaurant2025</p>
        </section>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; 2025 The Sarabi Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
