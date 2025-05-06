"use client";

import { FaGoogle, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

interface TestimonialProps {
  placeId: string;
  apiKey?: string; // Optional for client-side (not recommended for production)
  autoRotate?: boolean;
  rotateInterval?: number;
  maxReviews?: number;
}

const Testimonials = ({
  placeId,
  apiKey = "",
  autoRotate = true,
  rotateInterval = 5000,
  maxReviews = 5
}: TestimonialProps) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const googleBusinessProfileUrl = `https://search.google.com/local/reviews?placeid=${placeId}`;

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        // In production, replace this with a call to your own API endpoint
        const response = await fetch(
          `/api/reviews?placeId=${placeId}`
          // For demo only (client-side fetching not recommended):
          // `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch reviews');
        
        const data = await response.json();
        const fetchedReviews = data.result?.reviews || data.reviews || [];
        
        setReviews(fetchedReviews.slice(0, maxReviews));
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  }, [placeId, apiKey, maxReviews]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-rotate if enabled and there are multiple reviews
  useEffect(() => {
    if (autoRotate && reviews.length > 1) {
      const interval = setInterval(() => {
        nextReview();
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [autoRotate, rotateInterval, reviews.length]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C49A6C] mx-auto mb-4"></div>
        <p className="text-white">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-300 mb-2">Error loading reviews</p>
        <a 
          href={googleBusinessProfileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#C49A6C] hover:text-[#A80532] transition-colors"
        >
          View reviews on Google
          <FaGoogle className="ml-2" />
        </a>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white mb-4">No reviews yet</p>
        <a 
          href={googleBusinessProfileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-[#A80532] text-white px-4 py-2 rounded hover:bg-[#800026] transition-colors"
        >
          Be the first to review
          <FaGoogle className="ml-2" />
        </a>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Review Card */}
      <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm min-h-64 flex flex-col justify-center transition-all duration-500 hover:bg-opacity-20">
        {/* Stars */}
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i}
              className={`text-lg ${i < reviews[currentIndex].rating ? 'text-yellow-400' : 'text-gray-500'}`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-gray-300 italic text-center text-lg mb-6">
          &quot;{reviews[currentIndex].text}&quot;
        </p>

        {/* Reviewer Info */}
        <div className="text-center">
          <div className="text-[#C49A6C] font-bold">
            {reviews[currentIndex].author_name}
          </div>
          <div className="text-gray-400 text-sm">
            {reviews[currentIndex].relative_time_description || 
             new Date(reviews[currentIndex].time * 1000).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {reviews.length > 1 && (
        <>
          <button 
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-all"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-white" />
          </button>
          <button 
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-all"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-[#C49A6C] w-6' : 'bg-white bg-opacity-30'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Google Link */}
      <div className="text-center mt-8">
        <a 
          href={googleBusinessProfileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#C49A6C] hover:text-[#A80532] transition-colors"
        >
          <span>Read all reviews on</span>
          <FaGoogle className="text-xl" />
        </a>
      </div>
    </div>
  );
};

export default Testimonials;