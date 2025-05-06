"use client";

import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#E9E9E9] text-[#4A3F36] relative">
      {/* Side "Awards" Banner */}
      <div className="hidden md:flex flex-col items-center justify-center bg-[#5B4B45] text-white text-xs tracking-widest absolute right-0 top-0 bottom-0 w-10 rotate-180">
        <span className="transform rotate-90">AWARDS →</span>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact Details */}
        <div className="space-y-4 text-sm">
          <h3 className="font-bold tracking-widest text-[#4A3F36] uppercase">Contact Details</h3>
          <div>
            <p>La Brezi Suites</p>
            <p>Sonde Misindye Jinja Kampala, Uganda</p>
          </div>
          <div>
            <p>T: +256 753 208767</p>
            <p>E: info@labrezisuites.com</p>
          </div>
        </div>

        {/* La Brezi Links */}
        <div className="space-y-4 text-sm">
          <h3 className="font-bold tracking-widest text-[#4A3F36] uppercase">La brezi suites sonde</h3>
          <div className="grid grid-cols-2 gap-2">
            <a href="#" className="hover:underline">Sustainability</a>
            <a href="#" className="hover:underline">Travel Agents</a>
            <a href="#" className="hover:underline">Events Calendar</a>
            <a href="#" className="hover:underline">Press Center</a>
            <a href="#" className="hover:underline">Prestige Club</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="/about" className="hover:underline">About Us</a>
            <a href="/contact" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">Social Wall</a>
            <a href="/blog" className="hover:underline">Blog</a>
          </div>
        </div>

        {/* Newsletter + Social Media + Awards */}
        <div className="space-y-6 text-sm">
          {/* Newsletter */}
          <div>
            <h3 className="font-bold tracking-widest text-[#4A3F36] uppercase mb-2">Subscribe to our newsletter</h3>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="border border-[#4A3F36] px-4 py-2 w-full focus:outline-none" 
              />
              <button className="bg-transparent border border-[#4A3F36] px-4">
                →
              </button>
            </div>
          </div>

          {/* Social + Awards */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Social Media */}
            <div>
              <h3 className="font-bold tracking-widest text-[#4A3F36] uppercase mb-2">Follow Us</h3>
              <div className="flex space-x-4 text-xl">
                <a href="#" className="hover:text-[#C46A26]">
                  <Image 
                    src="https://ik.imagekit.io/67mog36hf/Labrezi/icons/black-instagram-icon.svg?updatedAt=1745739881148" 
                    alt="Instagram" 
                    width={40}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </a>
                <a href="#" className="hover:text-[#C46A26]">
                  <Image 
                    src="https://ik.imagekit.io/67mog36hf/Labrezi/icons/x-social-media-round-icon.svg" 
                    alt="X (Twitter)" 
                    width={40}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </a>
              </div>
            </div>

            {/* Awards */}
            <div>
              <h3 className="font-bold tracking-widest text-[#4A3F36] uppercase mb-2">Awards</h3>
              <div className="flex flex-wrap items-center gap-2">
                <div id="TA_rated579" className="TA_rated">
                  <ul id="xSGUtK" className="TA_links JgHtu79">
                    <li id="pCY3o7iM" className="XVe3GNcC9">
                      <a target="_blank" rel="noopener noreferrer" href="https://www.tripadvisor.com/Hotel_Review-g293841-d27735080-Reviews-La_Brezi_Suites-Kampala_Central_Region.html">
                        <Image 
                          src="https://www.tripadvisor.com/img/cdsi/img2/badges/ollie-11424-2.gif" 
                          alt="TripAdvisor" 
                          width={100}
                          height={50}
                          className="h-auto w-auto"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
                <script async src="https://www.jscache.com/wejs?wtype=rated&amp;uniq=579&amp;locationId=27735080&amp;lang=en_US&amp;display_version=2" data-loadtrk onload="this.loadtrk=true"></script>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 py-4 px-6 flex flex-col md:flex-row justify-between items-center text-xs text-[#4A3F36]">
        <p>© 2025 LA BREZI SUITES LIMITED</p>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Site Map</a>
          <a href="#" className="hover:underline">Terms of Use</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;