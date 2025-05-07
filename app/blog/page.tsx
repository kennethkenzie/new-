"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { FaCalendarAlt, FaUser, FaArrowRight, FaSearch } from "react-icons/fa";

// Type definitions
type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
};

type Category = {
  name: string;
  count: number;
};

// Lazy load components
const Navbar = dynamic(() => import('../components/navbar/page'), {
  loading: () => <div className="h-16 bg-[#55652E]" />,
  ssr: false
});

const Footer = dynamic(() => import('../components/footer/page'), {
  loading: () => <div className="h-20 bg-[#55652E]" />,
  ssr: false
});

const BlogPage = () => {
  // Memoized data for better performance
  const { blogPosts, categories } = useMemo(() => ({
    blogPosts: [
      {
        id: 1,
        title: "The Art of Sustainable Luxury in Hospitality",
        excerpt: "How we blend eco-conscious practices with five-star comfort at our resort.",
        date: "June 15, 2023",
        author: "James Musoke",
        category: "Sustainability",
        image: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3711.JPG?updatedAt=1746112307767",
        readTime: "5 min read"
      },
      {
        id: 2,
        title: "Exploring Uganda's Hidden Gems",
        excerpt: "Discover the lesser-known treasures of our beautiful country.",
        date: "July 22, 2023",
        author: "Sarah Kintu",
        category: "Travel Tips",
        image: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3712.JPG?updatedAt=1746112307767",
        readTime: "7 min read"
      },
      {
        id: 3,
        title: "The Secret Behind Our Farm-to-Table Cuisine",
        excerpt: "How we source the freshest ingredients from local farmers.",
        date: "August 5, 2023",
        author: "David Mugisha",
        category: "Culinary",
        image: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3713.JPG?updatedAt=1746112307767",
        readTime: "4 min read"
      }
    ] as BlogPost[],
    categories: [
      { name: "Sustainability", count: 5 },
      { name: "Travel Tips", count: 3 },
      { name: "Local Culture", count: 7 },
      { name: "Culinary", count: 4 },
      { name: "Wellness", count: 2 }
    ] as Category[]
  }), []);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-[500px] w-full">
        <Image
          src="https://ik.imagekit.io/67mog36hf/Labrezi/WhatsApp-Image-2024-09-01-at-40717-AM-4-1024x768.jpeg?updatedAt=1733031349401"
          alt="Labrezi Blog"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[#55652E]/80">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">Labrezi Stories</h1>
            <p className="text-lg md:text-2xl">Discover our world through words</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#F7EBE4] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Blog Posts */}
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#55652E]">
                Latest Articles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <article 
                    key={post.id} 
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={70}
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-[#55652E] text-white">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <div className="flex items-center mr-4">
                          <FaCalendarAlt className="mr-1 text-[#D89D78]" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center">
                          <FaUser className="mr-1 text-[#D89D78]" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#55652E]">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#CB7E4D]">
                          {post.readTime}
                        </span>
                        <button 
                          className="font-medium flex items-center px-4 py-2 rounded transition-colors hover:bg-opacity-90 bg-[#55652E] text-white"
                        >
                          Read More <FaArrowRight className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  {[1, 2, 3].map((page) => (
                    <button 
                      key={page}
                      className={`px-4 py-2 rounded font-medium ${page === 1 ? 'bg-[#55652E] text-white' : 'border border-[#55652E] text-[#55652E] hover:bg-[#55652E] hover:text-white'}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-4 py-2 rounded font-medium border border-[#55652E] text-[#55652E] hover:bg-[#55652E] hover:text-white">
                    Next
                  </button>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="md:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4 border border-[#ECCFBE]">
                {/* Search */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 text-[#55652E]">
                    Search
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full p-3 pl-10 rounded focus:outline-none border border-[#D89D78] bg-[#F7EBE4]"
                    />
                    <FaSearch 
                      className="absolute left-3 top-3.5 h-5 w-5 text-[#D89D78]"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 text-[#55652E]">
                    Categories
                  </h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.name} className="flex justify-between items-center">
                        <button className="hover:underline text-left text-[#55652E]">
                          {category.name}
                        </button>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#F7EBE4] text-[#55652E]">
                          {category.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Popular Posts */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-[#55652E]">
                    Popular Posts
                  </h3>
                  <ul className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <li key={post.id} className="flex gap-3">
                        <div className="flex-shrink-0 relative w-16 h-16">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover rounded"
                            sizes="64px"
                            quality={60}
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium hover:underline text-[#55652E]">
                            {post.title}
                          </h4>
                          <p className="text-xs text-[#CB7E4D]">
                            {post.date}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <section className="py-16 md:py-24 text-white bg-[#55652E]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Stay Inspired</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join our community and receive the latest stories directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              required
              className="flex-grow p-3 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D89D78]"
            />
            <button 
              type="submit"
              className="font-bold py-3 px-6 rounded transition-colors duration-300 whitespace-nowrap hover:bg-opacity-90 bg-[#445026] text-white"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default React.memo(BlogPage);