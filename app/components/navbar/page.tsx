// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Navbar = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      setBookingFormOpen(false);
      setMoreMenuOpen(false);
    }
  };

  const toggleBookingForm = () => {
    setBookingFormOpen(!bookingFormOpen);
    if (!bookingFormOpen) {
      setMobileMenuOpen(false);
      setMoreMenuOpen(false);
    }
  };

  const toggleMoreMenu = () => {
    setMoreMenuOpen(!moreMenuOpen);
    if (!moreMenuOpen) {
      setMobileMenuOpen(false);
      setBookingFormOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#mobileMenu') && !target.closest('#mobileMenuButton')) {
        setMobileMenuOpen(false);
      }
      if (!target.closest('.drawer')) {
        setBookingFormOpen(false);
        setMoreMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <>
      {/* Sticky Wrapper */}
      <div className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        {/* First Header (Main Navigation) */}
        <header className={`bg-[#F6F0E5] transition-all duration-300 ${isScrolled ? 'py-2' : 'py-0'}`}>
          {/* Top Bar - Hidden when scrolled */}
          <div className={`container mx-auto flex justify-between items-center border-b border-[#C49A6C] transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden py-0' : 'py-3'}`}>
            <nav className="hidden md:flex space-x-6 text-sm text-[#4A3F36] uppercase">
              <a href="/Sustainability" className="hover:underline">Sustainability</a>
              <a href="/press-center" className="hover:underline">Press Center</a>
              <a href="/awards" className="hover:underline">Awards</a>
              <a href="/travel-agents" className="hover:underline">Travel Agents</a>
              <a href="/contact" className="hover:underline">Contact Us / E-Concierge</a>
            </nav>
            <div className="text-sm text-[#4A3F36] uppercase">EN ▼</div>
          </div>

          {/* Main Navigation - Added padding here */}
          <div className="container mx-auto flex justify-between items-center px-6 py-4 transition-all duration-300">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center space-x-3">
              <button
                id="mobileMenuButton"
                className="md:hidden text-[#4A3F36] mr-2"
                onClick={toggleMobileMenu}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              <Link href="/" passHref>
                <Image
                  src="https://ik.imagekit.io/67mog36hf/Labrezi/Logo%20.svg?updatedAt=1731605707947"
                  alt="La Brezi Suites Logo"
                  width={200}
                  height={32}
                  className={`transition-all duration-300 ${isScrolled ? 'h-6' : 'h-8'}`}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4 lg:space-x-6 text-[#4A3F36] uppercase text-sm items-center">
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <a href="/accommodation" className="hover:text-[#C46A26] pb-2 relative text-sm">
                    Accommodation
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 p-7 hidden group-hover:block"></span>
                  </a>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-60 bg-white shadow-lg border-t-4 border-[#C46A26] rounded-b-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                  <div className="flex flex-col text-center text-[#4A3F36] text-sm py-4">
                    <a href="/accommodation/rooms/single" className="py-2 hover:bg-[#F6F0E5]">Single Room</a>
                    <a href="/accommodation/rooms/double" className="py-2 hover:bg-[#F6F0E5]">Double Room</a>
                    <a href="/accommodation/rooms/executive" className="py-2 hover:bg-[#F6F0E5]">Executive Room</a>
                  </div>
                </div>
              </div>

              {/* <a href="#" className="hover:underline">Destinations</a> */}
              <a href="/offers" className="hover:underline">Offers</a>
              <a href="/safari" className="hover:underline">Safaris</a>
              <a href="/experiences" className="hover:underline">Experiences</a>
              <a href="/meetings_events" className="hover:underline">Meetings</a>
              <button 
                onClick={toggleMoreMenu}
                className="text-[#4A3F36] flex items-center hover:underline"
              >
                More ▼
              </button>
            </nav>

            {/* Mobile Menu */}
            <div 
              id="mobileMenu"
              className={`${mobileMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-[#F6F0E5] z-40 shadow-md transition-all duration-300`}
            >
              <div className="container mx-auto px-6 py-4">
                <nav className="flex flex-col space-y-4 text-[#4A3F36] uppercase text-sm">
                  <a href="/accommodation" className="hover:underline py-2 border-b border-[#C49A6C]">Accommodation</a>
                  <a href="/contact" className="hover:underline py-2 border-b border-[#C49A6C]">Contact Us</a>
                  {/* <a href="#" className="hover:underline py-2 border-b border-[#C49A6C]">Destinations</a> */}
                  <a href="/offers" className="hover:underline py-2 border-b border-[#C49A6C]">Offers</a>
                  <a href="/safari" className="hover:underline py-2 border-b border-[#C49A6C]">Safaris</a>
                  <a href="/experiences" className="hover:underline py-2 border-b border-[#C49A6C]">Experiences</a>
                  <a href="/meetings_events" className="hover:underline py-2 border-b border-[#C49A6C]">Meetings</a>
                  <a href="/family-packages" className="hover:underline py-2 border-b border-[#C49A6C]">Family Packages</a>
                  <a href="/weddings-events" className="hover:underline py-2 border-b border-[#C49A6C]">Weddings & Events</a>
                  <a href="/news" className="hover:underline py-2 border-b border-[#C49A6C]">News & Updates</a>
                  <a href="/gallery" className="hover:underline py-2">Gallery</a>
                </nav>
              </div>
            </div>

            {/* Check Availability Button */}
            <Link
              href="/booking"
              className="bg-[#C46A26] text-white text-xs md:text-sm uppercase px-3 md:px-6 py-1 md:py-2 rounded-md shadow-md hover:bg-[#A85B1F] transition whitespace-nowrap"
            >
              BOOK NOW
            </Link>
          </div>
        </header>

        {/* Separator Line */}
        <div className="border-t border-[#C49A6C] w-full"></div>
      </div>

      {/* More Menu Drawer */}
      <div
        className={`fixed top-0 right-0 w-80 md:w-96 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 drawer ${
          moreMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backdropFilter: 'none' }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#4A3F36]">More Options</h2>
          <button 
            onClick={toggleMoreMenu} 
            className="text-2xl text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto h-full">
          <nav className="flex flex-col space-y-4">
            <a 
              href="/gallery" 
              className="text-[#4A3F36] hover:text-[#C46A26] py-2 border-b border-[#C49A6C] transition-colors duration-200"
              onClick={toggleMoreMenu}
            >
              Gallery
            </a>
            <a 
              href="/contact" 
              className="text-[#4A3F36] hover:text-[#C46A26] py-2 border-b border-[#C49A6C] transition-colors duration-200"
              onClick={toggleMoreMenu}
            >
              Contact Us
            </a>
            <a 
              href="/family-packages" 
              className="text-[#4A3F36] hover:text-[#C46A26] py-2 border-b border-[#C49A6C] transition-colors duration-200"
              onClick={toggleMoreMenu}
            >
              Family Packages
            </a>
            <a 
              href="/weddings-events" 
              className="text-[#4A3F36] hover:text-[#C46A26] py-2 border-b border-[#C49A6C] transition-colors duration-200"
              onClick={toggleMoreMenu}
            >
              Weddings & Events
            </a>
            <a 
              href="/news" 
              className="text-[#4A3F36] hover:text-[#C46A26] py-2 border-b border-[#C49A6C] transition-colors duration-200"
              onClick={toggleMoreMenu}
            >
              News & Updates
            </a>
            <a 
              href="/dining" 
              className="text-[#4A3F36] hover:text-[#C46A26] py-2 border-b border-[#C49A6C] transition-colors duration-200"
              onClick={toggleMoreMenu}
            >
              Dining Experiences
            </a>
            {/* <a 
              href="/spa" 
              className="text-[#4A3F36] hover:text-[#C46A26] py-2 border-b border-[#C49A6C] transition-colors duration-200"
              onClick={toggleMoreMenu}
            >
              Spa & Wellness
            </a> */}
            <a 
              href="/about" 
              className="text-[#4A3F36] hover:text-[#C46A26] py-2 transition-colors duration-200"
              onClick={toggleMoreMenu}
            >
              About Our Hotel
            </a>
          </nav>
        </div>
      </div>

      {/* Booking Drawer */}
      <div
        className={`fixed top-0 right-0 w-80 md:w-96 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 drawer ${
          bookingFormOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backdropFilter: 'none' }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#4A3F36]">Booking</h2>
          <button 
            onClick={toggleBookingForm} 
            className="text-2xl text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto h-full">
          {/* Calendar */}
          <Calendar
            locale="en-US"
            onChange={(value) => setDate(value as Date | null)}
            value={date}
            minDate={new Date()}
          />

          {/* Dates Section */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold mb-4 text-[#790c4f] uppercase">Dates</h4>
          </div>

          {/* Guests */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold mb-4 text-[#4A3F36] uppercase">Guests</h4>

            {/* Adults */}
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 mb-4">
              <div>
                <p className="text-sm font-semibold text-[#4A3F36]">Adults</p>
                <p className="text-xs text-gray-500">18 years or older</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="w-8 h-8 rounded-full bg-[#032B3C] text-white flex items-center justify-center">-</button>
                <span className="text-lg font-semibold text-[#4A3F36]">2</span>
                <button className="w-8 h-8 rounded-full bg-[#032B3C] text-white flex items-center justify-center">+</button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
              <div>
                <p className="text-sm font-semibold text-[#4A3F36]">Children</p>
                <p className="text-xs text-gray-500">Ages 0 – 17</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center">-</button>
                <span className="text-lg font-semibold text-[#4A3F36]">0</span>
                <button className="w-8 h-8 rounded-full bg-[#032B3C] text-white flex items-center justify-center">+</button>
              </div>
            </div>
          </div>

          <hr className="my-8" />

          {/* Special Rates / Promo Codes */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold mb-4 text-[#4A3F36] uppercase">Special Rates / Codes</h4>

            <div className="flex space-x-4">
              <div className="flex-1">
                <select className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600">
                  <option>Promo code</option>
                  <option>Corporate code</option>
                  <option>Group code</option>
                </select>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Promo Code"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600"
                />
              </div>
            </div>

            <button className="mt-4 flex items-center text-[#4A3F36] text-sm font-semibold hover:underline">
              + Add New Code
            </button>
          </div>

          {/* Search Button */}
          <button className="w-full bg-[#4A3F36] text-white py-3 rounded hover:bg-[#3A2F28] transition">
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;