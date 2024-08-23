import React, { useState, useEffect, useContext } from "react";
//import './AboutUs.css'; // Ensure you create this CSS file for custom styles
import {
  FaBuilding,
  FaStar,
  FaThumbsUp,
  FaChevronLeft,
  FaChevronRight,
  FaBullseye,
  FaLightbulb,
  FaTrophy,
  FaRegCompass,
  FaAward,
} from "react-icons/fa";
import ShoppingAppContext from "../ShoppingAppContext";

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    review:
      "This company exceeded my expectations with their exceptional service.",
    image: "./assets/user/user10.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "John Smith",
    review: "Amazing quality and customer support!",
    image: "./assets/user/user7.avif",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily Johnson",
    review: "Highly recommend them for their professionalism.",
    image: "./assets/user/user4.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Michael Williams",
    review: "A reliable partner for our business needs.",
    image: "./assets/user/user9.avif",
    rating: 4,
  },
  {
    id: 5,
    name: "Sarah Brown",
    review: "Top-notch products and services!",
    image: "./assets/user/user5.jpg",
    rating: 5,
  },
];

const AboutUs = () => {
  const { isDarkMode } = useContext(ShoppingAppContext);
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

  const overviewCard = `card p-4 flex flex-col justify-center items-center rounded-lg shadow-md h-56  px-7 ${
    isDarkMode
      ? "bg-sky-900 text-white hover:bg-sky-800"
      : "bg-slate-300 text-black hover:bg-slate-400"
  } transition duration-300`;
  
  const teamCardCls = `team-member w-full sm:w-40 md:w-48 lg:w-60 ${
    isDarkMode ? "bg-sky-900" : "bg-slate-300"
  }  p-4 rounded-lg text-center transform hover:scale-105 transition-transform duration-300`
  return (
    <div
      className={`about-us w-full ${
        isDarkMode ? "bg-slate-800" : "bg-slate-200"
      }`}
    >
      {/* Hero Section */}
      <div
        className="parallax overflow-hidden bg-center bg-cover h-[528px] flex justify-center items-end"
        style={{ backgroundImage: `url('./assets/prod/sh8.jpg')` }}
      >
        {/*  <div className="overlay  inset-0 bg-white h-40 w-full flex justify-center  opacity-50"></div>  */}
        <div className="content  relative z-10 flex bg-black items-center justify-center bg-opacity-50 h-full w-full text-white px-4 pt-2 rounded-lg flex-col ">
          <h1 className="text-4xl font-bold mb-2">
            Welcome to <span className="text-yellow-500">Aamin</span>Shop{" "}
          </h1>
          <p className="text-lg">Find everything you need and more.</p>
        </div>
      </div>

      {/* Company Overview */}
      <div className="company-overview grid grid-cols-1 md:grid-cols-3 gap-7 p-6  ">
        {/* Our Story Card */}
        <div className={overviewCard}>
          <FaLightbulb className="text-5xl mx-auto mb-4 text-yellow-600" />
          <h2 className="text-3xl mb-2">Our Story</h2>
          <p className="px-6">
            Founded in 2021, our company has been dedicated to providing
            top-quality products to our customers.
          </p>
        </div>

        {/* Mission Card */}
        <div className={overviewCard}>
          <FaBullseye className="text-5xl mx-auto mb-4 text-yellow-600" />
          <h3 className="text-2xl mb-2">Mission</h3>
          <p>
            To deliver top-notch products and services while ensuring customer
            satisfaction and continuous innovation.
          </p>
        </div>

        {/* Core Values Card */}
        <div className={overviewCard}>
          <FaRegCompass className="text-5xl mx-auto mb-4 text-yellow-600" />
          <h3 className="text-xl mb-2">Core Values</h3>
          <ul className="list-disc pl-5">
            <li>Integrity</li>
            <li>Innovation</li>
            <li>Customer Satisfaction</li>
          </ul>
        </div>

        {/* Goals & Vision Card */}
        <div className={overviewCard}>
          <FaAward className="text-5xl mx-auto mb-4 text-yellow-600 " />
          <h3 className="text-3xl mb-2">Goals & Vision</h3>
          <p>
            Our goal is to expand globally while maintaining our commitment to
            quality and customer satisfaction.
          </p>
        </div>

        {/* Milestones Card */}
        <div className={overviewCard}>
          <FaTrophy className="text-5xl mx-auto mb-4 text-yellow-600" />
          <h3 className="text-3xl mb-2">Milestones</h3>
          <ul className="list-disc pl-5">
            <li>2022: Launched our first product</li>
            <li>2023: Expanded to international markets</li>
          </ul>
        </div>

        {/* Additional Company Information Card */}
        <div className={overviewCard}>
          <FaBuilding className="text-5xl mx-auto mb-4 text-yellow-600" />
          <h3 className="text-3xl mb-2">About Our Company</h3>
          <p>We are committed to providing the best solutions...</p>
        </div>
      </div>
      {/*Our Team  */}
      <div className={`team-info p-6 ${isDarkMode ? 'text-white' : 'text-black '}  text-center`}>
        <h2 className="text-4xl font-medium mb-6">Meet Our Team</h2>
        <div className="team-grid flex justify-around gap-1 flex-row flex-wrap">
          {/* Team Member 1 */}
          <div className={teamCardCls}>
            <img
              src="./assets/user/user3.jpeg"
              alt="John Doe"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-sm text-gray-300">CEO</p>
            <p className="text-sm mt-2">
              John is the visionary behind our company, leading us to success...
            </p>
          </div>
          {/* Team Member 2 */}
          <div className={teamCardCls}>
            <img
              src="./assets/user/user6.avif"
              alt="Jane Smith"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-sm text-gray-300">CTO</p>
            <p className="text-sm mt-2">
              Jane is the tech genius, driving our innovations and technology...
            </p>
          </div>
          {/* Team Member 3 */}
          <div className={teamCardCls}>
            <img
              src="./assets/user/user1.jpeg"
              alt="Alex Brown"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Alex Brown</h3>
            <p className="text-sm text-gray-300">COO</p>
            <p className="text-sm mt-2">
              Alex ensures everything runs smoothly, handling operations...
            </p>
          </div>
          {/* Team Member 3 */}
          <div className={teamCardCls}>
            <img
              src="./assets/user/user5.jpg"
              alt="Alex Brown"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Alex Brown</h3>
            <p className="text-sm text-gray-300">COO</p>
            <p className="text-sm mt-2">
              Alex ensures everything runs smoothly, handling operations...
            </p>
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className={`testimonials p-6 text-center ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-200 text-black'} `}>
        <TestimonialsCarousel />
        {/* Add more testimonials */}
      </div>

      <div className={`achievements p-6  ${isDarkMode ? 'text-white' : 'text-black'} `}>
        <h2 className="text-3xl mb-6 text-center">Our Achievements</h2>
        <div className="achievement-cards grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`achievement-card ${isDarkMode ? 'bg-slate-900 hover:bg-slate-700' : 'bg-slate-300 hover:bg-slate-400'}  p-6 rounded-xl flex items-center shadow-lg  transition-colors`}>
        <div className="icon-container bg-gray-600 p-4 rounded-full mr-4">
              <FaAward className="text-4xl text-yellow-400" />
            </div>
            <div className="achievement-details">
              <h3 className="text-xl mb-2 ">Best Innovation 2023</h3>
              <p>
                Received the prestigious award for outstanding innovation in
                technology and services.
              </p>
            </div>
          </div>

          <div className={`achievement-card ${isDarkMode ? 'bg-slate-900 hover:bg-slate-700' : 'bg-slate-300 hover:bg-slate-400'}  p-6 rounded-xl flex items-center shadow-lg  transition-colors`}>
            <div className="icon-container bg-gray-600 p-4 rounded-full mr-4">
              <FaThumbsUp className="text-4xl text-blue-400" />
            </div>
            <div className="achievement-details">
              <h3 className="text-xl mb-2">
                Top 10 in Customer Satisfaction 2022
              </h3>
              <p>
                Ranked among the top 10 companies for customer satisfaction in
                2022.
              </p>
            </div>
          </div>

          {/* Add more achievements as needed */}
        </div>
      </div>
      {/* Company Image Gallery */}

      <div className={`image-gallery p-6 ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-black'} `}>
        <h2 className="text-3xl text-center mb-6">Our Office Gallery</h2>
        <div className="gallery-grid grid grid-cols-3 gap-4">
          <img
            src="./assets/prod/sh12.jpeg"
            alt="Office 1"
            className="w-full h-40 sm:h-64 md:h-64 lg:h-96 hover:scale-105 transition-all object-cover rounded-lg"
          />
          <img
            src="./assets/prod/sh10.jpg"
            alt="Office 1"
            className="w-full h-40 sm:h-64 md:h-64 lg:h-96 hover:scale-105 transition-all object-cover rounded-lg"
          />
          <img
            src="./assets/image2.png"
            alt="Office 3"
            className="w-full h-40 sm:h-64 md:h-64 lg:h-96 hover:scale-105 transition-all object-cover rounded-lg"
          />
          <img
            src="./assets/prod/office.jpeg"
            alt="Office 4"
            className="w-full h-40 sm:h-64 md:h-64 lg:h-96 hover:scale-105 transition-all object-cover rounded-lg"
          />
          <img
            src="./assets/prod/sh9.jpg"
            alt="Office 5"
            className="w-full h-40 sm:h-64 md:h-64 lg:h-96 hover:scale-105 transition-all object-cover rounded-lg"
          />
          <img
            src="./assets/prod/sh11.jpg"
            alt="Office 5"
            className="w-full h-40 sm:h-64 md:h-64 lg:h-96 hover:scale-105 transition-all object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

// testimonial component
const TestimonialsCarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
 const {isDarkMode ,pathToPage} = useContext(ShoppingAppContext)
  return (
    <div className={`testimonials-carousel ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-400 text-black'} rounded p-6 relative`}>
      <h2 className="text-3xl mb-4">What Our Customers Say</h2>
      <div className="carousel-container overflow-hidden relative">
        <div
          className="testimonial-slide flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-item flex-none w-full flex items-center justify-center px-4"
            >
              <div className="testimonial-content text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <p className="text-xl mb-2">"{testimonial.review}"</p>
                <p className="text-lg mb-2">- {testimonial.name}</p>
                <div className="flex justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FaChevronLeft
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer"
      />
      <FaChevronRight
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer"
      />
    </div>
  );
};

export default AboutUs;
