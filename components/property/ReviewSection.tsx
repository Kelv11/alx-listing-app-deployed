// components/property/ReviewSection.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReviewProps } from "@/interfaces/index";

interface ReviewSectionProps {
  propertyId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!propertyId) return;

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `/api/properties/${propertyId}/reviews`
        );
        const reviewsData = response.data;

        setReviews(reviewsData);

        // Calculate average rating
        if (reviewsData.length > 0) {
          const totalRating = reviewsData.reduce(
            (sum: number, review: ReviewProps) => sum + review.rating,
            0
          );
          setAverageRating(totalRating / reviewsData.length);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews. Please try again later.");
        // Set empty array to prevent undefined errors
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  // Add safety check to prevent undefined errors
  const displayedReviews = showAll ? reviews : (reviews || []).slice(0, 6);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-500 mr-3">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-red-800 font-medium">Error loading reviews</p>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No reviews yet</p>
          <p className="text-gray-400">Be the first to review this property!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Reviews Header */}
      <div className="flex items-center space-x-4 mb-6">
        <h3 className="text-2xl font-semibold">Reviews</h3>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500 text-lg">★</span>
          <span className="font-medium text-lg">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-gray-600">
            ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
          </span>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="border-b pb-4 last:border-b-0 md:border-b-0 md:pb-0"
          >
            {/* Reviewer Info */}
            <div className="flex items-center mb-3">
              <img
                src={review.avatar || "/assets/images/default-avatar.png"}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e) => {
                  // Fallback to a default avatar if image fails to load
                  (e.target as HTMLImageElement).src =
                    "/assets/images/default-avatar.png";
                }}
              />
              <div>
                <p className="font-semibold text-gray-900">{review.name}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-gray-500 text-sm">
                    {formatDate(review.date)}
                  </span>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-2 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition duration-200"
        >
          {showAll ? "Show less" : `Show all ${reviews.length} reviews`}
        </button>
      )}
    </div>
  );
};

export default ReviewSection;
