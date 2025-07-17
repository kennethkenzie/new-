import Image from 'next/image';
import Link from 'next/link';
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import EnhancedChatbot from "../components/enhanced-chatbot/EnhancedChatbot";

export default function OffersPage() {
  const offers = [
    {
      id: 1,
      title: "Early Bird Special",
      description: "Book 30 days in advance and save 20% on your stay. Perfect for planners!",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/offer-early-bird.jpg",
      validUntil: "December 31, 2024",
      buttonText: "Book Now",
      link: "/booking?offer=early-bird"
    },
    {
      id: 2,
      title: "Weekend Getaway",
      description: "Enjoy a luxurious weekend stay with complimentary breakfast and late checkout.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/offer-weekend.jpg",
      validUntil: "Ongoing",
      buttonText: "View Package",
      link: "/booking?offer=weekend"
    },
    {
      id: 3,
      title: "Honeymoon Package",
      description: "Romantic suite with champagne, couples massage, and private dinner on the beach.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/offer-honeymoon.jpg",
      validUntil: "December 31, 2024",
      buttonText: "Plan Romance",
      link: "/booking?offer=honeymoon"
    },
    {
      id: 4,
      title: "Family Fun Deal",
      description: "Special rates for family suites with kids staying and eating for free.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/offer-family.jpg",
      validUntil: "August 31, 2024",
      buttonText: "Family Booking",
      link: "/booking?offer=family"
    },
    {
      id: 5,
      title: "Long Stay Discount",
      description: "Stay 7 nights or more and get 15% off plus daily laundry service.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/offer-long-stay.jpg",
      validUntil: "November 30, 2024",
      buttonText: "Extended Stay",
      link: "/booking?offer=long-stay"
    },
    {
      id: 6,
      title: "Last Minute Deal",
      description: "Spontaneous getaway? Book within 48 hours of arrival for 25% off.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/offer-last-minute.jpg",
      validUntil: "Ongoing",
      buttonText: "Grab This Deal",
      link: "/booking?offer=last-minute"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F6F0E5]">
        {/* Hero Section */}
        <div className="relative h-96 w-full">
          <Image
            src="https://ik.imagekit.io/67mog36hf/Labrezi/offers-hero.jpg"
            alt="Special Offers at La Brezi Suites"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Exclusive Offers</h1>
              <p className="text-xl text-white max-w-2xl mx-auto">
                Discover our curated selection of special packages and promotions designed for your perfect stay
              </p>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <div className="relative h-48 w-full">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#C46A26] text-white text-xs uppercase px-3 py-1 rounded-full">
                    Limited Time
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-[#4A3F36] mb-2">{offer.title}</h2>
                  <p className="text-[#4A3F36] mb-4">{offer.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#C49A6C]">Valid until: {offer.validUntil}</span>
                    <Link 
                      href={offer.link}
                      className="bg-[#C46A26] text-white text-sm uppercase px-4 py-2 rounded-md hover:bg-[#A85B1F] transition"
                    >
                      {offer.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Promo Banner */}
        <div className="bg-[#4A3F36] text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Sign Up for Exclusive Deals</h2>
            <p className="max-w-2xl mx-auto mb-6">
              Join our newsletter and be the first to know about special promotions, seasonal offers, and member-only discounts.
            </p>
            <div className="max-w-md mx-auto flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-l-md text-[#4A3F36]"
              />
              <button className="bg-[#C46A26] hover:bg-[#A85B1F] px-6 py-3 rounded-r-md uppercase font-medium transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Terms Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-[#4A3F36] text-sm">
            <h3 className="text-xl font-semibold mb-4">Terms & Conditions</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>All offers are subject to availability and may be withdrawn at any time without notice</li>
              <li>Blackout dates may apply during peak seasons and holidays</li>
              <li>Offers cannot be combined with other promotions or discounts</li>
              <li>Advance booking may be required for some packages</li>
              <li>Rates are per room, per night and exclude taxes and service charges</li>
              <li>Please refer to individual offer details for complete terms and conditions</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
      <EnhancedChatbot />
    </>
  );
}