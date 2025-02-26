"use client";

import React, { useState } from "react";
import { useEffect, useRef } from "react";
import Loader from "@/components/Loader";



const SpaWebsite = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    treatment: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const servicesRef = useRef(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); // Close the menu after clicking a link
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    // Full name validation
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    // Contact number validation
    if (!formData.contactNumber.trim()) {
      errors.contactNumber = "Contact number is required";
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.contactNumber)) {
      errors.contactNumber = "Please enter a valid contact number";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Treatment validation
    if (!formData.treatment) {
      errors.treatment = "Please select a treatment";
    }

    return errors;
  };

  // Updated handleSubmit function to submit booking data to Google Sheets via API route
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          contactNumber: formData.contactNumber,
          emailAddress: formData.email,
          treatment: formData.treatment,
          specialRequests: formData.notes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          fullName: "",
          contactNumber: "",
          email: "",
          treatment: "",
          notes: "",
        });
      } else {
        setSubmitError(
          data.message || "Failed to submit booking. Please try again later."
        );
      }
    } catch (error) {
      setSubmitError(
        "An error occurred. Please check your connection and try again."
      );
      console.error("Booking submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry, idx) => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
          // Add a delay based on the index to create a sequential animation
          setTimeout(() => {
            entry.target.classList.add("animate-in");
          }, idx * 150);

          // Once animated, no need to observe anymore
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    // Get all service cards and observe them
    if (servicesRef.current) {
      const serviceCards =
        servicesRef.current.querySelectorAll(".service-card");
      serviceCards.forEach((card) => {
        observer.observe(card);
      });
    }

    return () => {
      if (servicesRef.current) {
        const serviceCards =
          servicesRef.current.querySelectorAll(".service-card");
        serviceCards.forEach((card) => {
          observer.unobserve(card);
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen text-white bg-black">
      {/* Header with Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <img
            src="/images/logo.png"
            alt="PSH Logo"
            className="w-12 h-12 rounded-full"
          />
          <nav className="hidden space-x-8 md:flex">
            <button
              onClick={() => scrollToSection("services")}
              className="text-lg hover:text-pink-500"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-lg hover:text-pink-500"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-lg hover:text-pink-500"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="px-6 py-2 text-lg text-white transition bg-pink-500 rounded-full hover:bg-pink-600"
            >
              BOOK NOW
            </button>
          </nav>
          {/* Hamburger Menu for Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col items-center py-4 space-y-4">
              <button
                onClick={() => scrollToSection("services")}
                className="text-lg hover:text-pink-500"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-lg hover:text-pink-500"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-lg hover:text-pink-500"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("booking")}
                className="px-6 py-2 text-lg text-white transition bg-pink-500 rounded-full hover:bg-pink-600"
              >
                BOOK NOW
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Enhanced responsive background implementation */}
      <div className="relative h-screen md:h-[calc(100vh-64px)]">
        {/* Background for all devices with picture element for better responsiveness */}
        <div className="absolute inset-0 bg-black/70">
          <picture>
            {/* Mobile-specific background image */}
            <source media="(max-width: 767px)" srcSet="/images/bg-mobile.jpg" />
            {/* Tablet-specific background image (optional) */}
            <source
              media="(max-width: 1023px)"
              srcSet="/images/bg-tablet.jpg"
            />
            {/* Desktop background image */}
            <source media="(min-width: 1024px)" srcSet="/images/bg.jpg" />
            {/* Fallback image */}
            <img
              src="/images/bg.jpg"
              alt="Spa treatment room with cherry blossoms"
              className="object-cover object-center w-full h-full opacity-30"
            />
          </picture>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          {/* Logo now hidden on mobile screens, visible on medium screens and up */}
          <img
            src="/images/logo.png"
            alt="PSH Logo"
            className="hidden w-32 h-32 mb-8 rounded-full md:block"
          />
          <h1 className="mb-6 font-serif text-5xl tracking-wide md:text-6xl">
            Pure Sakura Healing
          </h1>
          <h2 className="mb-10 font-serif text-3xl text-pink-300 md:text-4xl">
            Japanese Wellness Spa
          </h2>
          <p className="max-w-3xl mx-auto mb-10 leading-relaxed text-l md:text-xl">
            Experience authentic Japanese{" "}
            <span className="relative group">
              <span className="underline cursor-pointer">OMOTENASHI</span>
              <span className="absolute left-0 hidden p-2 mt-1 text-white bg-black rounded-lg text-md group-hover:block">
                Omotenashi is the Japanese concept of wholehearted hospitality
                and service.
              </span>
            </span>{" "}
            service with our carefully selected treatments designed to relax
            both your mind and body. Our certified therapists bring the essence
            of Japan to every session.
          </p>
          <button
            onClick={() => scrollToSection("booking")}
            className="px-8 py-3 text-lg transition bg-pink-500 rounded-full hover:bg-pink-600"
          >
            Book Now
          </button>
        </div>
      </div>

      <section id=""></section>

      {/* Services Section */}
      <section id="services" className="px-4 py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 font-serif text-3xl text-center text-white">
            Our Massage Services
          </h2>
          <div
            ref={servicesRef}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="relative transition-all duration-1000 ease-out transform translate-y-12 opacity-0 group service-card"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="object-cover w-full h-64 transition rounded-lg brightness-75 group-hover:brightness-100"
                  onError={(e) => {
                    e.target.src = "/images/Massage.jpg";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black">
                  <h3 className="mb-2 font-serif text-xl text-white">
                    {service.name}
                  </h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add CSS for the animation */}
        <style jsx>{`
          .service-card.animate-in {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
      </section>

      {/* Hot Stone Therapy Feature - Improved mobile layout */}
      <section id="about" className="px-4 py-20">
        <h2 className="mb-16 font-serif text-3xl text-center">
          Signature Hot Stone Therapy
        </h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
            <img
              src="/images/massage/Hot Stone (1) (Small).jpg"
              alt="Hot stone therapy treatment"
              className="object-cover w-full h-auto mx-auto rounded-lg"
            />
            <div className="flex flex-col justify-center">
              <h3 className="mb-4 font-serif text-2xl">
                Traditional Japanese Technique
              </h3>
              <p className="mb-6 text-gray-300">
                Our signature hot stone therapy combines smooth, heated basalt
                stones with traditional Japanese massage techniques. The warmth
                of the stones helps to relax muscles and improve circulation
                while our skilled therapists apply gentle pressure for deep
                relaxation.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-pink-500 rounded-full"></span>
                  Premium basalt stones for optimal heat retention
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-pink-500 rounded-full"></span>
                  Authentic Japanese aromatherapy oils
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 mr-3 bg-pink-500 rounded-full"></span>
                  Customized pressure and technique for your needs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Room Gallery - Improved for mobile */}
      <section className="px-4 py-20 bg-gray-900">
        <h2 className="mb-16 font-serif text-3xl text-center">
          Our Wellness Space
        </h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div className="overflow-hidden rounded-lg">
              <img
                src="/images/massage/IMG_3164.jpg"
                alt="Treatment room with cherry blossoms"
                className="object-cover w-full h-64 transition duration-500 md:h-80 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="/images/massage/IMG_3179.jpg"
                alt="Hot stone treatment setup"
                className="object-cover w-full h-64 transition duration-500 md:h-80 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg sm:col-span-2 md:col-span-1">
              <img
                src="/images/massage/IMG_3191.jpg"
                alt="Spa treatment area"
                className="object-cover w-full h-64 transition duration-500 md:h-80 hover:scale-105"
              />
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="max-w-3xl mx-auto text-gray-300">
              Our tranquil treatment rooms feature premium massage beds, soft
              lighting, and authentic Japanese aesthetics enhanced with cherry
              blossoms. Each space is designed to transport you to the peaceful
              gardens of Japan.
            </p>
          </div>
        </div>
      </section>

      {/* Show Casing - Made responsive */}
      <section className="px-4 py-20">
        <h2 className="mb-12 font-serif text-3xl text-center">
          Experience Our Sanctuary
        </h2>
        <div className="flex justify-center mt-10">
          <video
            src="/images/massage/Show casing the place.mp4"
            className="w-full max-w-4xl rounded-lg"
            controls
            preload="metadata"
          ></video>
        </div>
      </section>

      {/* Testimonial Carousel - Made more mobile friendly */}
      <section className="px-4 py-20 bg-gray-900">
        <h2 className="mb-16 font-serif text-3xl text-center">
          Client Testimonials
        </h2>

        <div className="max-w-4xl mx-auto overflow-hidden">
          <div className="relative">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full px-4 py-8 bg-black rounded-lg sm:px-8 sm:py-10"
                >
                  <svg
                    className="absolute text-pink-500/10 right-4 top-4"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003z" />
                  </svg>

                  <blockquote className="relative">
                    <p className="text-base text-gray-200 sm:text-lg">
                      {testimonial.quote}
                    </p>
                    <footer className="mt-6">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <p className="text-base font-semibold text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            Regular Client
                          </p>
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>

			{/* Carousel Indicators */}
						<div className="flex justify-center mt-6 space-x-2">
						  {testimonials.map((_, index) => (
							<button
							  key={index}
							  className={`w-2 h-2 rounded-full transition-colors ${
								index === activeIndex ? "bg-pink-500" : "bg-gray-600"
							  }`}
							  onClick={() => setActiveIndex(index)}
							/>
						  ))}
						</div>
					  </div>
					</div>
				  </section>

				  {/* Booking Form and Map - Improved with form validation and handling */}
				  <section id="booking" className="px-4 py-20">
					<div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
					  <div>
						<h2 className="mb-8 font-serif text-3xl text-center">
						  Book Your Session
						</h2>
						{submitSuccess ? (
						  <div className="p-6 text-center border border-green-500 rounded-lg bg-green-900/30">
							<svg
							  className="w-12 h-12 mx-auto mb-4 text-green-500"
							  fill="none"
							  stroke="currentColor"
							  viewBox="0 0 24 24"
							>
							  <path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 13l4 4L19 7"
							  ></path>
							</svg>
							<h3 className="mb-2 font-serif text-xl text-white">
							  Booking Successful!
							</h3>
							<p className="mb-4 text-gray-300">
							  Thank you for booking your session. We will contact you soon
							  to confirm your appointment.
							</p>
							<button
							  onClick={() => setSubmitSuccess(false)}
							  className="px-6 py-2 text-white transition bg-pink-500 rounded-lg hover:bg-pink-600"
							>
							  Book Another Session
							</button>
						  </div>
						) : (
						  <form onSubmit={handleSubmit} className="space-y-6">
							<div className="space-y-4">
							  <div>
								<input
								  type="text"
								  name="fullName"
								  value={formData.fullName}
								  onChange={handleInputChange}
								  placeholder="Full Name"
								  className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none focus:border-pink-500 ${
									formErrors.fullName
									  ? "border-red-500"
									  : "border-gray-700"
								  }`}
								/>
								{formErrors.fullName && (
								  <p className="mt-1 text-sm text-red-500">
									{formErrors.fullName}
								  </p>
								)}
							  </div>

							  <div>
								<input
								  type="tel"
								  name="contactNumber"
								  value={formData.contactNumber}
								  onChange={handleInputChange}
								  placeholder="Contact Number"
								  className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none focus:border-pink-500 ${
									formErrors.contactNumber
									  ? "border-red-500"
									  : "border-gray-700"
								  }`}
								/>
								{formErrors.contactNumber && (
								  <p className="mt-1 text-sm text-red-500">
									{formErrors.contactNumber}
								  </p>
								)}
							  </div>

							  <div>
								<input
								  type="email"
								  name="email"
								  value={formData.email}
								  onChange={handleInputChange}
								  placeholder="Email Address"
								  className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none focus:border-pink-500 ${
									formErrors.email ? "border-red-500" : "border-gray-700"
								  }`}
								/>
								{formErrors.email && (
								  <p className="mt-1 text-sm text-red-500">
									{formErrors.email}
								  </p>
								)}
							  </div>

							  <div>
								<select
								  name="treatment"
								  value={formData.treatment}
								  onChange={handleInputChange}
								  className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none focus:border-pink-500 ${
									formErrors.treatment
									  ? "border-red-500"
									  : "border-gray-700"
								  }`}
								>
								  <option value="">Select Treatment</option>
								  <option value="swedish">Swedish Massage</option>
								  <option value="shiatsu">Shiatsu Massage</option>
								  <option value="hotstone">Hot Stone Therapy</option>
								  <option value="signature">
									Signature Cherry Blossom Experience
								  </option>
								</select>
								{formErrors.treatment && (
								  <p className="mt-1 text-sm text-red-500">
									{formErrors.treatment}
								  </p>
								)}
							  </div>

							  <textarea
								name="notes"
								value={formData.notes}
								onChange={handleInputChange}
								placeholder="Any special requests or notes?"
								rows={4}
								className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
							  />
							</div>

							{submitError && (
							  <div className="p-3 text-red-200 border border-red-500 rounded-lg bg-red-900/30">
								{submitError}
							  </div>
							)}

							<button
							  type="submit"
							  disabled={isSubmitting}
							  className="w-full py-3 text-white transition bg-pink-500 rounded-lg hover:bg-pink-600 disabled:bg-pink-500/50 disabled:cursor-not-allowed"
							>
							  {isSubmitting ? (
								<span className="flex items-center justify-center">
								  <svg
									className="w-5 h-5 mr-2 animate-spin"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								  >
									<circle
									  className="opacity-25"
									  cx="12"
									  cy="12"
									  r="10"
									  stroke="currentColor"
									  strokeWidth="4"
									></circle>
									<path
									  className="opacity-75"
									  fill="currentColor"
									  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								  </svg>
								  Processing...
								</span>
							  ) : (
								"Book Now"
							  )}
							</button>
						  </form>
						)}
					  </div>
					  <div className="w-full h-full min-h-[300px] md:min-h-[400px] rounded-lg overflow-hidden">
						<iframe
						  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d331823.7402851301!2d120.66378321651236!3d14.566305186929052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9abc24f9f85%3A0xd920d66f8809d165!2s7829%20Makati%20Ave%2C%20Makati%2C%20Metro%20Manila!5e1!3m2!1sen!2sph!4v1739808185273!5m2!1sen!2sph"
						  width="100%"
						  height="100%"
						  style={{ border: 0 }}
						  allowFullScreen=""
						  loading="lazy"
						  referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					  </div>
					</div>
				  </section>

				  {/* Footer - Improved mobile layout */}
      <footer
        id="contact"
        className="px-4 py-12 bg-black border-t border-gray-800"
      >
        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
          <div className="text-center md:text-left">
            <img
              src="/images/logo.png"
              alt="PSH Logo"
              className="w-24 h-24 mx-auto mb-4 rounded-full md:mx-0"
            />
            <p className="text-gray-400">
              Experience authentic Japanese wellness and healing traditions in a
              serene environment.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="mb-4 font-serif text-xl">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@puresakurahealing.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>
                Unit 1439, 14 th Flr , Centuria Medical Makati , Century City
                Brgy. Poblacion, Kalayaan Avenue, Makati City.
              </li>
              <li>
                OPERATING HOURS: 3:00 PM - 12:00 MIDNIGHT Walk-In and Home
                Service Available
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="mb-4 font-serif text-xl">Follow Us</h3>
            <div className="flex justify-center mb-6 space-x-4 md:justify-start">
              <a
                href="#"
                className="text-gray-400 transition hover:text-pink-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 transition hover:text-pink-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Pure Sakura Healing. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const services = [
  {
    name: "Swedish Massage",
    description:
      "Traditional oil massage for deep relaxation and improved circulation.",
    image: "/images/massage/SWEDISH (1).jpg",
  },
  {
    name: "Shiatsu Massage",
    description:
      "Japanese pressure point therapy to balance energy flow and reduce stress.",
    image: "/images/massage/SHIATSU (2).jpg",
  },
  {
    name: "Hot Stone Therapy",
    description:
      "Premium hot stone massage with authentic Japanese techniques for ultimate relaxation.",
    image: "/images/massage/Hot Stone (1).jpg",
  },
  {
    name: "Ventosa Massage",
    description:
      "Utilizes heated cups to create suction, providing muscle relief and enhancing blood flow.",
    image: "/images/massage/VENTOSA (1).jpg",
  },
  {
    name: "Special Signature",
    description:
      "Our signature treatment combining multiple techniques with sakura-infused products.",
    image: "/images/massage/SPECIAL SIGNATURE.jpg",
  },
  {
    name: "Foot Massage",
    description:
      "Relieves tension and improves circulation through targeted pressure points.",
    image: "/images/massage/Foot Massage.jpg",
  },
];

const testimonials = [
  {
    name: "Nuk Herzfled",
    quote:
      '"I went there today for my first Swedish massage and my masseuse was called Wendy. The massage facilities are very clean and the material is good so you can lie down comfortably. All the staff are very friendly and I have never had a better massage. I am already looking forward to future visits."',
  },
  {
    name: "John Tanaka",
    quote:
      "The hot stone therapy is a must-try! The combination of heat and pressure is incredibly soothing. I always leave feeling refreshed and energized.",
  },
  {
    name: "Emily Chen",
    quote:
      "The treatment rooms are beautifully designed and the therapists are highly skilled. I love the attention to detail and the personalized service.",
  },
];

export default SpaWebsite;
