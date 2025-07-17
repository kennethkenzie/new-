import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const rooms = [
  {
    id: 'double',
    title: 'Double Room',
    description: 'Spacious room with panoramic views and premium amenities',
    price: 'UGX 120,000/night',
    originalPrice: 'UGX 150,000',
    image: 'https://ik.imagekit.io/67mog36hf/Labrezi/IMG-20210325-WA0017.jpg?updatedAt=1731996604115',
  },
  {
    id: 'executive',
    title: 'Executive Suite',
    description: 'Luxurious suite with separate living area and premium services',
    price: 'UGX 250,000/night',
    originalPrice: 'UGX 300,000',
    image: 'https://ik.imagekit.io/67mog36hf/Labrezi/EXECTIVE_BIG_ROOM.png?updatedAt=1731996591628',
  },
  {
    id: 'single',
    title: 'Single Room',
    description: 'Cozy comfort for the solo traveler with modern amenities',
    price: 'UGX 80,000/night',
    originalPrice: 'UGX 100,000',
    image: 'https://ik.imagekit.io/67mog36hf/Labrezi/LABREZI_SUITES_a1.png?updatedAt=1731996616563',
  },
];

const RoomCard = ({ room }) => (
  <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col max-w-sm mx-auto">
    <img src={room.image} alt={room.title} className="h-60 w-full object-cover" />
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{room.title}</h3>
      <p className="text-gray-600 flex-grow">{room.description}</p>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-400 text-sm line-through">{room.originalPrice}</p>
          <p className="text-[#991b1b] font-bold">{room.price}</p>
        </div>
        <Link href={`/accommodation/rooms/${room.id}`} className="text-sm underline text-gray-700 hover:text-[#991b1b]">
          View Details
        </Link>
      </div>
      <Link 
        href={`/booking?room=${room.id}`}
        className="mt-4 bg-[#991b1b] text-white py-2 rounded-md hover:bg-[#7f1d1d] transition text-center block"
      >
        BOOK NOW
      </Link>
    </div>
  </div>
);

const RoomCards = () => {
  return (
    <div className="bg-[#f8f1e7] py-12 px-4 md:px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Our Suites & Rooms</h2>
        <p className="text-gray-600 mt-2">Luxurious accommodations designed for your comfort</p>
        <div className="w-24 h-1 bg-gray-400 mx-auto mt-2"></div>
      </div>

      {/* Mobile Carousel */}
      <div className="block md:hidden">
        <Swiper spaceBetween={20} slidesPerView={1}>
          {rooms.map((room, index) => (
            <SwiperSlide key={index}>
              <RoomCard room={room} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {rooms.map((room, index) => (
          <RoomCard key={index} room={room} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link 
          href="/accommodation"
          className="border border-gray-800 text-gray-800 px-6 py-2 hover:bg-gray-800 hover:text-white transition"
        >
          VIEW ALL ACCOMMODATIONS
        </Link>
      </div>
    </div>
  );
};

export default RoomCards;
