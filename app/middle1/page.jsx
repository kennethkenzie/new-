import React from "react";

const gridItems = [
  {
    title: "Wellness & Restoration",
    category: "SPA",
    buttonText: "Immerse",
    imageUrl:
      "https://ik.imagekit.io/67mog36hf/Labrezi/SHAN_PIX-18.jpg?updatedAt=1731997434174",
  },
  {
    title: "Exclusive Retreats",
    category: "MEETINGS",
    buttonText: "Plan Your Meeting",
    imageUrl:
      "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_5166-1.jpg?updatedAt=1731996583302",
  },
  {
    title: "Perfect Celebrations",
    category: "WEDDINGS",
    buttonText: "Start Planning",
    imageUrl:
      "https://ik.imagekit.io/67mog36hf/Labrezi/functions.jpg?updatedAt=1731996601217",
  },
  {
    title: "Coastal Ranch Cuisine",
    category: "DINING",
    buttonText: "View Restaurants",
    imageUrl:
      "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7955-scaled%20(1).jpg?updatedAt=1731964280797",
  },
  {
    title: "Curated Experiences",
    category: "ACTIVITIES",
    buttonText: "Learn More",
    imageUrl:
      "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7925-scaled.jpg?updatedAt=1731963467784",
  },
  {
    title: "Inspired Events",
    category: "EVENT CALENDAR",
    buttonText: "View Calendar",
    imageUrl:
      "https://ik.imagekit.io/67mog36hf/Labrezi/SHAN_PIX-18.jpg?updatedAt=1731997434174",
  },
];

const Experiences = () => {
  return (
    <>
      {/* Experience Grid */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
        {gridItems.map((item, index) => (
          <div key={index} className="relative group overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white">
              <p className="text-sm">{item.category}</p>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <button className="border border-white px-4 py-2 mt-2 hover:bg-white hover:text-black transition-colors duration-300">
                {item.buttonText}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Experiences Intro Section */}
      <section className="bg-[#F6F0E5] w-full">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-0 md:px-6">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://ik.imagekit.io/67mog36hf/Labrezi/Slide2-1.jpg?updatedAt=1743517101205"
              alt="Kampala experiences"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 px-6 py-12 md:py-24 md:pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-4">
              EXPERIENCES
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-[#4A3F36] mb-6">
              DISCOVER ALL KAMPALA HAS TO OFFER
            </h3>
            <p className="text-[#4A3F36] mb-8 leading-relaxed">
              Kampala is a relatively undiscovered tourist destination,
              providing countless unspoiled natural wonders to explore. Perfect
              for holidays or special events, Uganda is blessed with a
              glittering network of shining lakes and rivers and moderate
              temperatures year-round.
            </p>
            <a
              href="#"
              className="inline-block border-2 border-[#4A3F36] text-[#4A3F36] uppercase px-8 py-3 hover:bg-[#4A3F36] hover:text-white transition-colors duration-300"
            >
              DISCOVER
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Experiences;
