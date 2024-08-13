import React, { useContext, useEffect, useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import ShoppingAppContext from "../ShoppingAppContext";
//import './ContactUs.css'; // Ensure you create this CSS file for custom styles

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { isDarkMode } = useContext(ShoppingAppContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form submitted:", formData);
  };
  useEffect(() => {
    const handleScroll = () => {
      const parallax = document.querySelector(".parallax");
      let scrollPosition = window.pageYOffset;
      parallax.style.backgroundPositionY = scrollPosition * 0.5 + "px";
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const inputClass = `w-full p-3 rounded bg-gray-100 text-black`;
  return (
    <div className="contact-us w-full">
      {/* Hero Section  with Parallax effect*/}
      <div
        className="parallax overflow-hidden bg-center bg-cover h-[528px] flex justify-center items-end"
        style={{ backgroundImage: `url('src/assets/prod/sh1.jpg')` }}
      >
        {/*  <div className="overlay  inset-0 bg-white h-40 w-full flex justify-center  opacity-50"></div>  */}
        <div className="content  relative z-10 flex bg-slate-700 items-center bg-opacity-50 text-white px-4 pt-2 rounded-lg flex-col ">
          <h1 className="text-4xl font-bold mb-2">Get in Touch </h1>
          <p className="text-lg">We'd love to hear from you!</p>
        </div>
      </div>

      {/* Contact Form */}
      <div
        className={`flex justify-center flex-row  ${
          isDarkMode ? "bg-gray-700 text-white" : "bg-slate-300 text-black"
        } flex-wrap`}
      >
        <div
          className={`min-w-96 w-full sm:w-full md:w-3/6 lg:w-3/6  p-6 ${
            isDarkMode ? "bg-slate-800 text-white" : "bg-slate-300 text-black"
          } `}
        >
          <h2 className="text-3xl">Contact Us</h2>
          <form onSubmit={handleSubmit} className="mt-4 ">
            <div className="form-group mb-4">
              <label htmlFor="name" className="block text-lg mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email" className="block text-lg mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="subject" className="block text-lg mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="message" className="block text-lg mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="bg-orange-600 text-white p-3 hover:bg-orange-700 rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div
          className={`contact-info min-w-96 w-full sm:w-full md:w-3/6 lg:w-3/6  lg:my-auto  px-6 ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-slate-300 text-black"
          } `}
        >
          <h2 className="text-3xl">Our Contact Information</h2>
          <div className="info-item flex items-center mt-4">
            <FaPhone className="text-2xl mr-3" />
            <p>(+91) 93902 39323 </p>
          </div>
          <div className="info-item flex items-center mt-4">
            <FaEnvelope className="text-2xl mr-3" />
            <p>contact@aaminshop.com</p>
          </div>
          <div className="info-item flex items-center mt-4">
            <FaMapMarkerAlt className="text-2xl mr-3" />
            <p>123 AaminShop, Ujjain, India</p>
          </div>
          <div className="social-media mt-4 flex py-4 text-2xl">
            <a
              href="https://facebook.com"
              className="text-white mx-2 hover:text-yellow-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              className="text-white mx-2 hover:text-yellow-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              className="text-white mx-2 hover:text-yellow-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="map p-6 w-full">
        <h2 className="text-3xl text-center text-white">Find Us Here</h2>
        <div className="map-container mt-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29329.872135899423!2d75.94603788879398!3d23.234569832556424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39636e91dd351709%3A0x6de92b7f46c12dc9!2sPanthmundla%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1723560895746!5m2!1sen!2sin"
            width="100%"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
