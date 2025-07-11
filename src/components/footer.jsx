import { useState, useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic opening hours checker
  useEffect(() => {
    const checkOpeningHours = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday)

      // Open everyday from 9:00AM (9) to 12:00AM (0)
      const isWeekdayOpen = currentHour >= 9 && currentHour < 24;
      setIsOpen(isWeekdayOpen);
    };

    checkOpeningHours();
    // Update status every minute
    const interval = setInterval(checkOpeningHours, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#9f7373] text-white py-12 px-6">
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
            {[
              "Home",
              "Our Story",
              "Menu",
              "Order Now",
              "Reservations",
              "Contact Us",
            ].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-[#e0b7b7ba] transition">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Media */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex flex-col gap-4 mb-6">
            {[
              { icon: <FaInstagram />, name: "Instagram" },
              { icon: <FaFacebook />, name: "Facebook" },
              { icon: <FaTwitter />, name: "Twitter" },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
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
