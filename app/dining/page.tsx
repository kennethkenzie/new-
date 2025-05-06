// src/app/dining/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";

export default function DiningPage() {
  const restaurants = [
    {
      id: 1,
      name: "The Terrace",
      cuisine: "Mediterranean Fine Dining",
      description: "Our signature restaurant offering panoramic views with a menu inspired by coastal Mediterranean flavors using locally-sourced ingredients.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/dining-terrace.jpg",
      hours: "Dinner: 6pm - 11pm",
      dressCode: "Smart Casual",
      link: "/dining/terrace"
    },
    {
      id: 2,
      name: "Spice Market",
      cuisine: "Asian Fusion",
      description: "An vibrant culinary journey through Asia with interactive cooking stations and bold flavors in a contemporary setting.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/dining-spice-market.jpg",
      hours: "Lunch: 12pm - 3pm | Dinner: 6pm - 10:30pm",
      dressCode: "Resort Elegant",
      link: "/dining/spice-market"
    },
    {
      id: 3,
      name: "La Piazza",
      cuisine: "Authentic Italian",
      description: "Handcrafted pastas, wood-fired pizzas, and an extensive Italian wine selection in our charming courtyard setting.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/dining-piazza.jpg",
      hours: "Breakfast: 7am - 11am | Dinner: 5:30pm - 10pm",
      dressCode: "Casual Elegance",
      link: "/dining/piazza"
    },
    {
      id: 4,
      name: "Ocean Grill",
      cuisine: "Seafood Specialties",
      description: "Fresh catches prepared simply with ocean views. Features our daily market selection and premium grilled options.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/dining-ocean-grill.jpg",
      hours: "Lunch: 11:30am - 4pm | Dinner: 5pm - 10pm",
      dressCode: "Resort Casual",
      link: "/dining/ocean-grill"
    },
    {
      id: 5,
      name: "The Cellar",
      cuisine: "Wine Bar & Tapas",
      description: "Intimate underground wine cellar featuring over 200 labels and small plates perfect for sharing.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/dining-cellar.jpg",
      hours: "5pm - Midnight",
      dressCode: "Smart Casual",
      link: "/dining/cellar"
    },
    {
      id: 6,
      name: "Poolside Lounge",
      cuisine: "Light Bites & Cocktails",
      description: "Casual all-day dining with refreshing drinks and light meals served by the infinity pool.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/dining-poolside.jpg",
      hours: "8am - 8pm",
      dressCode: "Pool Attire",
      link: "/dining/poolside"
    }
  ];

  const culinaryExperiences = [
    {
      title: "Chef&apos;s Table",
      description: "An exclusive 8-course tasting menu prepared before your eyes at our kitchen counter",
      icon: "👨‍🍳"
    },
    {
      title: "Mixology Classes",
      description: "Learn to craft signature cocktails with our award-winning bartenders",
      icon: "🍸"
    },
    {
      title: "Wine Pairing Dinners",
      description: "Monthly themed dinners with sommelier-selected wine pairings",
      icon: "🍷"
    },
    {
      title: "Farm to Table Tours",
      description: "Visit our organic farms followed by a cooking demonstration",
      icon: "🌱"
    }
  ];

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#F6F0E5]">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src="https://ik.imagekit.io/67mog36hf/Labrezi/dining-hero.jpg"
          alt="Dining at La Brezi Suites"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Dining Experiences</h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              A culinary journey celebrating local flavors and international excellence
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#4A3F36] mb-6">A World of Flavors Awaits</h2>
          <p className="text-lg text-[#4A3F36] mb-8">
            At La Brezi Suites, we celebrate culinary artistry across six distinctive venues. 
            From beachfront casual dining to Michelin-starred elegance, each restaurant offers 
            a unique atmosphere and menu crafted by our award-winning culinary team.
          </p>
          <div className="w-24 h-1 bg-[#C46A26] mx-auto"></div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="container mx-auto px-4 pb-12 md:pb-16">
        <h2 className="text-3xl font-bold text-[#4A3F36] mb-8 text-center">Our Restaurants & Bars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#4A3F36]">{restaurant.name}</h3>
                  <span className="text-sm bg-[#F6F0E5] text-[#4A3F36] px-2 py-1 rounded">
                    {restaurant.cuisine}
                  </span>
                </div>
                <p className="text-[#4A3F36] mb-4">{restaurant.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-[#C46A26]">Hours</h4>
                    <p className="text-sm text-[#4A3F36]">{restaurant.hours}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#C46A26]">Dress Code</h4>
                    <p className="text-sm text-[#4A3F36]">{restaurant.dressCode}</p>
                  </div>
                </div>
                <Link 
                  href={restaurant.link}
                  className="inline-block text-center w-full bg-[#C46A26] text-white py-2 rounded hover:bg-[#A85B1F] transition"
                >
                  View Menu & Reservations
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Culinary Experiences */}
      <div className="bg-[#4A3F36] text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Signature Culinary Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {culinaryExperiences.map((experience, index) => (
              <div key={index} className="bg-[#F6F0E5] text-[#4A3F36] p-6 rounded-lg text-center">
                <span className="text-4xl mb-4 block">{experience.icon}</span>
                <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
                <p className="text-sm">{experience.description}</p>
                <button className="mt-4 text-sm text-[#C46A26] hover:underline">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Private Dining */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="https://ik.imagekit.io/67mog36hf/Labrezi/private-dining.jpg"
              alt="Private Dining at La Brezi"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-[#4A3F36] mb-4">Private Dining & Events</h2>
            <p className="text-[#4A3F36] mb-6">
              Our private dining rooms and event spaces provide the perfect setting for 
              memorable celebrations, business dinners, and intimate gatherings. Our 
              culinary team will craft a personalized menu to match your occasion.
            </p>
            <ul className="grid grid-cols-2 gap-4 mb-6">
              <li className="flex items-center">
                <span className="text-[#C46A26] mr-2">✓</span>
                <span className="text-[#4A3F36]">Weddings & Receptions</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#C46A26] mr-2">✓</span>
                <span className="text-[#4A3F36]">Corporate Events</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#C46A26] mr-2">✓</span>
                <span className="text-[#4A3F36]">Anniversary Dinners</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#C46A26] mr-2">✓</span>
                <span className="text-[#4A3F36]">Custom Menus</span>
              </li>
            </ul>
            <button className="bg-[#C46A26] text-white px-6 py-3 rounded hover:bg-[#A85B1F] transition">
              Enquire About Private Events
            </button>
          </div>
        </div>
      </div>

      {/* Chef's Spotlight */}
      <div className="bg-[#F6F0E5] border-t border-b border-[#C49A6C] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#4A3F36] mb-4">Meet Our Executive Chef</h2>
              <h3 className="text-xl text-[#C46A26] mb-4">Marco Bellini</h3>
              <p className="text-[#4A3F36] mb-6">
                With over 20 years of experience in Michelin-starred restaurants across Europe and Asia, 
                Chef Marco brings his passion for seasonal ingredients and innovative techniques to La Brezi.
              </p>
              <button className="text-[#C46A26] hover:underline">
                Read Chef&apos;s Bio →
              </button>
            </div>
            <div className="md:w-2/3">
              <Image
                src="https://ik.imagekit.io/67mog36hf/Labrezi/executive-chef.jpg"
                alt="Executive Chef Marco Bellini"
                width={800}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reservations CTA */}
      <div className="bg-[#4A3F36] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Make a Reservation</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Our restaurants are popular with both guests and locals. We recommend booking in advance 
            to secure your preferred dining time and venue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#C46A26] hover:bg-[#A85B1F] text-white px-8 py-3 rounded transition">
              Book Online
            </button>
            <button className="bg-transparent hover:bg-white hover:text-[#4A3F36] text-white border border-white px-8 py-3 rounded transition">
              Call +1 (555) 123-4567
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}