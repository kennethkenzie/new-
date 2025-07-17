
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    image:
      "https://ik.imagekit.io/67mog36hf/Labrezi/SHAN_PIX-18.jpg?updatedAt=1731997434174",
    category: "BAR & LOUNGE",
    title: "Wellness & Restoration",
    buttonLabel: "Immerse",
    link: "/dining"
  },
  {
    image:
      "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_5166-1.jpg?updatedAt=1731996583302",
    category: "MEETINGS",
    title: "Exclusive Retreats",
    buttonLabel: "Plan Your Meeting",
    link: "/meetings_events"
  },
  {
    image:
      "https://ik.imagekit.io/67mog36hf/Labrezi/functions.jpg?updatedAt=1731996601217",
    category: "WEDDINGS",
    title: "Perfect Celebrations",
    buttonLabel: "Start Planning",
    link: "/weddings-events"
  },
  {
    image:
      "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7955-scaled%20(1).jpg?updatedAt=1731964280797",
    category: "DINING",
    title: "Coastal Ranch Cuisine",
    buttonLabel: "View Restaurants",
    link: "/dining"
  },
  {
    image:
      "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7925-scaled.jpg?updatedAt=1731963467784",
    category: "ACTIVITIES",
    title: "Curated Experiences",
    buttonLabel: "Learn More",
    link: "/safari"
  },
  {
    image:
      "https://ik.imagekit.io/67mog36hf/Labrezi/family-experience.jpg?updatedAt=1731997434175",
    category: "FAMILY",
    title: "Family Adventures",
    buttonLabel: "View Packages",
    link: "/family-packages"
  },
];

const Card = ({ image, category, title, buttonLabel, link }) => (
  <div className="relative group overflow-hidden rounded-md shadow-lg">
    <img
      src={image}
      alt={title}
      className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-300"
    />
    <div className="bg-black/40 w-full p-4 absolute inset-0 bg-opacity-50 flex flex-col justify-end text-white">
      <p className="text-sm uppercase">{category}</p>
      <h3 className="text-xl font-semibold">{title}</h3>
      <Link 
        href={link}
        className="border border-white px-4 py-2 mt-2 text-sm hover:bg-white hover:text-black transition text-center"
      >
        {buttonLabel}
      </Link>
    </div>
  </div>
);

const ExperiencesGrid = () => {
  return (
    <div className="bg-[#f3f4f6] py-10 px-4 pt-7">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <Card key={index} {...section} />
        ))}
      </div>
    </div>
  );
};

export default ExperiencesGrid;
