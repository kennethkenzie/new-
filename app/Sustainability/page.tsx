// src/app/sustainability/page.tsx
import Image from 'next/image';
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import { FaLeaf, FaRecycle, FaSolarPanel, FaWater, FaTree } from 'react-icons/fa';

export default function SustainabilityPage() {
  const initiatives = [
    {
      icon: <FaLeaf className="text-3xl text-[#C46A26]" />,
      title: "Energy Efficiency",
      description: "We've implemented LED lighting throughout the property, smart thermostats in all rooms, and energy-efficient appliances to reduce our carbon footprint."
    },
    {
      icon: <FaRecycle className="text-3xl text-[#C46A26]" />,
      title: "Waste Reduction",
      description: "Comprehensive recycling program, composting of organic waste, and elimination of single-use plastics across all operations."
    },
    {
      icon: <FaSolarPanel className="text-3xl text-[#C46A26]" />,
      title: "Renewable Energy",
      description: "Solar panels provide 40% of our energy needs, with plans to increase to 75% by 2025 through additional renewable investments."
    },
    {
      icon: <FaWater className="text-3xl text-[#C46A26]" />,
      title: "Water Conservation",
      description: "Low-flow fixtures, rainwater harvesting system, and linen reuse program save over 2 million gallons of water annually."
    },
    {
      icon: <FaTree className="text-3xl text-[#C46A26]" />,
      title: "Local Sourcing",
      description: "85% of our food and beverages are sourced from within 100 miles, supporting local farmers and reducing transportation emissions."
    }
  ];

  const certifications = [
    {
      name: "Green Key Certified",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/green-key-certified.png",
      description: "Awarded the prestigious Green Key certification for our comprehensive environmental practices."
    },
    {
      name: "LEED Gold Certified",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/leed-gold-certified.png",
      description: "Our building meets the highest standards for energy efficiency and sustainable construction."
    },
    {
      name: "Travel Sustainable",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/travel-sustainable.png",
      description: "Recognized for our commitment to sustainable tourism practices."
    }
  ];

  return (
  <>
    <Navbar />
    <div className="min-h-screen bg-[#F6F0E5]">
      {/* Hero Section with Gradient Overlay */}
      <div className="relative h-120 w-full">
        <Image
          src="https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7865.jpg?updatedAt=1731999122286"
          alt="Sustainable Practices at La Brezi Suites"
          fill
          className="object-cover"
          priority
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sustainable Luxury</h1>
              <p className="text-xl text-white max-w-2xl mx-auto">
                Committed to environmental stewardship without compromising on guest experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#4A3F36] mb-6">Our Sustainability Commitment</h2>
          <p className="text-lg text-[#4A3F36] mb-8">
            At La Brezi Suites, we believe true luxury must be sustainable. We've integrated environmental responsibility 
            into every aspect of our operations, from energy-efficient design to community partnerships that promote 
            ecological preservation. Our goal is to provide an exceptional guest experience while protecting the natural 
            beauty that makes our location so special.
          </p>
          <div className="w-24 h-1 bg-[#C46A26] mx-auto"></div>
        </div>
      </div>

      {/* Initiatives */}
      <div className="bg-[#4A3F36] text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Key Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {initiatives.map((initiative, index) => (
              <div key={index} className="bg-[#F6F0E5] text-[#4A3F36] p-6 rounded-lg text-center">
                <div className="flex justify-center mb-4">
                  {initiative.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{initiative.title}</h3>
                <p className="text-sm">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-[#4A3F36] mb-8 text-center">Our Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="relative h-32 w-full mb-4">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#4A3F36] mb-2">{cert.name}</h3>
              <p className="text-[#4A3F36] text-sm">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-[#C49A6C] bg-opacity-20 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#4A3F36] mb-8 text-center">Our Environmental Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg">
              <p className="text-4xl font-bold text-[#C46A26] mb-2">45%</p>
              <p className="text-[#4A3F36]">Reduction in energy use since 2018</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <p className="text-4xl font-bold text-[#C46A26] mb-2">82%</p>
              <p className="text-[#4A3F36]">Waste diverted from landfills</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <p className="text-4xl font-bold text-[#C46A26] mb-2">2M+</p>
              <p className="text-[#4A3F36]">Gallons of water saved annually</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <p className="text-4xl font-bold text-[#C46A26] mb-2">100%</p>
              <p className="text-[#4A3F36]">Organic cleaning products used</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Participation */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="https://ik.imagekit.io/67mog36hf/Labrezi/sustainability-guest.jpg"
              alt="Guests participating in sustainability"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-[#4A3F36] mb-4">How Guests Can Participate</h2>
            <p className="text-[#4A3F36] mb-6">
              We invite our guests to join us in our sustainability efforts. Small actions make a big difference when we all participate.
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <span className="text-[#C46A26] mr-2 mt-1">✓</span>
                <span className="text-[#4A3F36]">Opt for linen and towel reuse during your stay</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C46A26] mr-2 mt-1">✓</span>
                <span className="text-[#4A3F36]">Use our refillable water stations instead of plastic bottles</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C46A26] mr-2 mt-1">✓</span>
                <span className="text-[#4A3F36]">Participate in our beach clean-up events (seasonal)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C46A26] mr-2 mt-1">✓</span>
                <span className="text-[#4A3F36]">Choose plant-based menu options at our restaurants</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C46A26] mr-2 mt-1">✓</span>
                <span className="text-[#4A3F36]">Offset your travel carbon footprint through our partner program</span>
              </li>
            </ul>
            <button className="bg-[#C46A26] text-white px-6 py-3 rounded hover:bg-[#A85B1F] transition">
              Learn More About Our Programs
            </button>
          </div>
        </div>
      </div>

      {/* Future Goals */}
      <div className="bg-[#4A3F36] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Future Sustainability Goals</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F6F0E5] text-[#4A3F36] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">2025 Targets</h3>
              <ul className="text-left space-y-2 text-sm">
                <li>• Achieve carbon neutral operations</li>
                <li>• Install electric vehicle charging stations</li>
                <li>• Source 100% renewable energy</li>
                <li>• Eliminate all single-use packaging</li>
              </ul>
            </div>
            <div className="bg-[#F6F0E5] text-[#4A3F36] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">2030 Vision</h3>
              <ul className="text-left space-y-2 text-sm">
                <li>• Become a zero-waste property</li>
                <li>• Achieve net-positive energy status</li>
                <li>• Restore 2x the natural resources we use</li>
                <li>• Develop full circular economy practices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
          <Footer />
    </>
  );
}