"use client";

import { useState } from "react";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import EnhancedChatbot from "../components/enhanced-chatbot/EnhancedChatbot";

const Contact = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    destination: "",
    reason: "",
    phone: "",
    confirmationNumber: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!formData.firstName.trim()) newErrors.push("First Name*");
    if (!formData.lastName.trim()) newErrors.push("Last Name*");
    if (!formData.email.trim()) newErrors.push("Email*");
    if (!formData.destination.trim()) newErrors.push("Destination*");
    if (!formData.reason.trim()) newErrors.push("Reason for Contact*");
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
      alert("Form submitted successfully!");
      setFormData({
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        destination: "",
        reason: "",
        phone: "",
        confirmationNumber: "",
        message: "",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-[#F6F0E5] min-h-[60vh] text-[#4A3F36] flex flex-col items-center justify-center py-20 px-6">
          <div className="text-center mb-20">
            <p className="text-sm italic tracking-wide mb-2">
              La Brezi Suites Sonde
            </p>
            <h1 className="text-5xl font-light tracking-widest uppercase mb-4">
              Contact Us
            </h1>
            <p className="text-xs tracking-widest text-gray-400">
              Jinja Misindye
            </p>
          </div>

          <div className="border-t border-gray-500 w-full max-w-4xl mb-12" />

          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl text-center md:text-left">
            <div className="uppercase text-sm tracking-widest text-gray-400 mb-6 md:mb-0">
              Reservations
            </div>
            <div className="text-[#4A3F36] text-lg underline">
              <a href="tel:+256768262479" className="hover:text-gray-300">
                +256 768 262 479
              </a>{" "}
              <br />{" "}
              <a href="tel:+256753208767" className="hover:text-gray-300">
                +256 753 208 767
              </a>
            </div>
          </div>

          <div className="border-t border-gray-500 w-full max-w-4xl mt-12 mb-12" />

          <div>
            <button className="uppercase border border-[#4A3F36] text-[#4A3F36] py-3 px-8 hover:bg-white hover:text-black transition tracking-widest text-sm">
              Toll Free Number List
            </button>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            {errors.length > 0 && (
              <div className="bg-red-600 text-white p-6 mb-8">
                <p className="mb-2">Please correct the following fields:</p>
                <ul className="list-disc pl-5">
                  {errors.map((error, index) => (
                    <li key={index} className="uppercase text-sm">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Title */}
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-gray-100 p-4 border-b border-black focus:outline-none text-[#4A3F36]"
              >
                <option value="">Title</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
              </select>

              {/* First Name */}
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name*"
                className="bg-gray-100 p-4 border-b border-black focus:outline-none text-[#4A3F36]"
              />

              {/* Last Name */}
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name*"
                className="bg-gray-100 p-4 border-b border-black focus:outline-none text-[#4A3F36]"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email*"
                className="bg-gray-100 p-4 border-b border-black focus:outline-none text-[#4A3F36]"
              />

              {/* Phone Number */}
              <div className="flex flex-col">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="bg-gray-100 p-4 border-b border-black focus:outline-none text-[#4A3F36]"
                />
                <label className="text-xs mt-2 text-[#4A3F36]">
                  <input type="checkbox" className="mr-2" />
                  Make phone number my primary contact option
                </label>
              </div>

              {/* Destination */}
              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="bg-gray-100 p-4 border-b border-black focus:outline-none text-[#4A3F36]"
              >
                <option value="">Destination*</option>
                <option value="La Brezi Suites Sonde">
                  La Brezi Suites Sonde
                </option>
                <option value="La Brezi Beach">La Brezi Beach</option>
              </select>

              {/* Confirmation Number */}
              <input
                type="text"
                name="confirmationNumber"
                value={formData.confirmationNumber}
                onChange={handleChange}
                placeholder="Confirmation Number"
                className="bg-gray-100 p-4 border-b border-black focus:outline-none md:col-span-1 text-[#4A3F36]"
              />

              {/* Reason */}
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="bg-gray-100 p-4 border-b border-black focus:outline-none text-[#4A3F36]"
              >
                <option value="">Reason for Contact*</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Booking Assistance">Booking Assistance</option>
                <option value="Feedback">Feedback</option>
              </select>

              {/* Message */}
              <textarea
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="bg-gray-100 p-4 border-b border-black focus:outline-none md:col-span-2 text-[#4A3F36]"
              ></textarea>

              {/* Submit Button */}
              <div className="flex justify-end mt-8 md:col-span-2">
                <button
                  type="submit"
                  className="bg-black uppercase py-3 px-8 hover:bg-gray-800 transition tracking-widest text-sm text-[#F6F0E5]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
        <Footer />
      </div>
      <EnhancedChatbot />
    </>
  );
};

export default Contact;