import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import visitIcon from "../assets/images/visit.png"; // Assuming this path is correct
import Footer from "../components/footer";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    // Clear error for the specific field on change
    if (errors[id]) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }
  };

  // Validate a single field on blur
  const handleBlur = (e) => {
    const { id, value } = e.target;
    let newErrors = { ...errors };

    switch (id) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required";
        } else if (value.trim().length < 2) {
          newErrors.name = "Name must be at least 2 characters long";
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "subject":
        if (!value) {
          newErrors.subject = "Please select a subject";
        } else {
          delete newErrors.subject;
        }
        break;
      case "message":
        if (!value.trim()) {
          newErrors.message = "Message is required";
        } else if (value.trim().length < 10) {
          newErrors.message = "Message must be at least 10 characters long";
        } else {
          delete newErrors.message;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  // Full form validation on submit
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowSuccessMessage(true);
      setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form

      // Scroll to success message
      const successMessageElement = document.getElementById("successMessage");
      if (successMessageElement) {
        successMessageElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors).find((key) => errors[key]);
      if (firstErrorField) {
        const errorElement = document.getElementById(firstErrorField);
        if (errorElement) {
          errorElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          errorElement.focus();
        }
      }
    }
  };
  return (
    <div className="bg-rose-brown min-h-screen dark:bg-[#2c2222] transition-colors duration-300">
      <Navbar /> {/* Render the Navbar component here */}
      {/* Main Content */}
      {/* Added pt-20 to push content below fixed navbar, adjust as needed */}
      <main className="max-w-7xl mx-auto px-4 py-12 pt-20 bg-primary-content-bg dark:bg-[#4a3a4a] transition-colors duration-300">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-[#f0d6d6]">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-[#d9b8b8]">
            We'd love to hear from you. Get in touch with our team for
            reservations, inquiries, or feedback.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Visit Us Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <img
                  src={visitIcon}
                  alt="Visit Us Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-[#f0d6d6]">
                Visit Us
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-700 dark:text-[#d9b8b8] pl-11 -mt-5">
              Nairobi, Kenya
            </p>
            {/* Map placeholder */}
            <div className="bg-gray-200 rounded-lg h-80 relative overflow-hidden dark:bg-[#3a2e2e]">
              <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                {/* Street pattern */}
                <defs>
                  <pattern
                    id="streets"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      width="40"
                      height="40"
                      fill="#f0f0f0"
                      className="dark:fill-[#4a3a4a]"
                    />
                    <path
                      d="M0 20h40M20 0v40"
                      stroke="#ddd"
                      strokeWidth="1"
                      className="dark:stroke-[#5a4545]"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#streets)" />

                {/* Route path */}
                <path
                  d="M80 250 Q120 200 160 150 Q200 100 250 80 Q300 60 340 50"
                  stroke="#dc2626"
                  strokeWidth="4"
                  fill="none"
                />

                {/* Location pins */}
                <g transform="translate(80, 240)">
                  <circle cx="0" cy="0" r="15" fill="#dc2626" />
                  <circle cx="0" cy="0" r="8" fill="white" />
                  <circle cx="0" cy="0" r="4" fill="#dc2626" />
                </g>

                <g transform="translate(340, 40)">
                  <circle cx="0" cy="0" r="15" fill="#dc2626" />
                  <circle cx="0" cy="0" r="8" fill="white" />
                  <circle cx="0" cy="0" r="4" fill="#dc2626" />
                </g>
              </svg>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-primary-form-bg rounded-lg p-6 md:p-8 dark:bg-[#5a4545] transition-colors duration-300">
            <h2 className="text-primary-form-label mb-6">Send us a Message</h2>

            <form
              id="contactForm"
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-primary-form-label font-medium mb-2 dark:text-[#d9b8b8]"
                  >
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name
                        ? "border-red-500"
                        : "border-gray-300 dark:border-[#7a6565]"
                    } focus:border-primary-accent-orange dark:focus:border-primary-accent-orange focus:outline-none focus:ring-2 focus:ring-primary-accent-orange dark:focus:ring-primary-accent-orange focus:ring-opacity-20 bg-white dark:bg-white dark:text-gray-800`}
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.name && (
                    <div className="error-message text-red-600 text-sm mt-1">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-primary-form-label font-medium mb-2 dark:text-[#d9b8b8]"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="youremail@gmail.com"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 dark:border-[#7a6565]"
                    } focus:border-primary-accent-orange dark:focus:border-primary-accent-orange focus:outline-none focus:ring-2 focus:ring-primary-accent-orange dark:focus:ring-primary-accent-orange focus:ring-opacity-20 bg-white dark:bg-white dark:text-gray-800`}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.email && (
                    <div className="error-message text-red-600 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-primary-form-label font-medium mb-2 dark:text-[#d9b8b8]"
                >
                  Subject*
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.subject
                        ? "border-red-500"
                        : "border-gray-300 dark:border-[#7a6565]"
                    } focus:border-primary-accent-orange dark:focus:border-primary-accent-orange focus:outline-none focus:ring-2 focus:ring-primary-accent-orange dark:focus:ring-primary-accent-orange focus:ring-opacity-20 appearance-none bg-white dark:bg-white dark:text-gray-800`}
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  >
                    <option value="">Select subject</option>
                    <option value="reservation">Reservation Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="general">General Inquiry</option>
                    <option value="catering">Catering Request</option>
                    <option value="complaint">Complaint</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none dark:text-gray-800" // Adjusted dark mode text here too
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
                {errors.subject && (
                  <div className="error-message text-red-600 text-sm mt-1">
                    {errors.subject}
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-primary-form-label font-medium mb-2 dark:text-[#d9b8b8]"
                >
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell us how we can help you..."
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message
                      ? "border-red-500"
                      : "border-gray-300 dark:border-[#7a6565]"
                  } focus:border-primary-accent-orange dark:focus:border-primary-accent-orange focus:outline-none focus:ring-2 focus:ring-primary-accent-orange dark:focus:ring-primary-accent-orange focus:ring-opacity-20 resize-vertical bg-white dark:bg-white dark:text-gray-800`}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                ></textarea>
                {errors.message && (
                  <div className="error-message text-red-600 text-sm mt-1">
                    {errors.message}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-primary-accent-orange text-white font-semibold px-8 py-3 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-accent-orange focus:ring-opacity-50 dark:bg-[#f0d6d6] dark:text-[#3a2e2e] dark:hover:bg-[#e6cbcb]"
                >
                  Submit
                </button>
              </div>
            </form>
            {/* Success Message */}
            {showSuccessMessage && (
              <div
                id="successMessage"
                className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg dark:bg-green-700 dark:border-green-800 dark:text-green-100"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Thank you for your message! We'll get back to you soon.
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
