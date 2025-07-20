// pages/booking/index.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";
import CancellationPolicy from "@/components/booking/CancellationPolicy";
import { PropertyProps } from "@/interfaces";

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingAddress: string;
  propertyId?: string;
  checkIn?: string;
  checkOut?: string;
}

interface BookingDetails {
  propertyName: string;
  price: number;
  bookingFee: number;
  totalNights: number;
  startDate: string;
  endDate: string;
  guests: number;
  total: number;
  image: string;
  propertyId: string;
}

export default function BookingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );
  const [fetchingProperty, setFetchingProperty] = useState(true);

  // Fetch property details when component mounts and router is ready
  useEffect(() => {
    // Wait for router to be ready
    if (!router.isReady) {
      return;
    }

    const fetchPropertyDetails = async () => {
      // Get booking data from query params
      const { propertyId, checkIn, checkOut, guests, totalNights, totalPrice } =
        router.query;

      if (!propertyId) {
        setError("Property ID is required");
        setFetchingProperty(false);
        return;
      }

      try {
        setFetchingProperty(true);
        setError(null);

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";
        const response = await axios.get(`${baseUrl}/properties/${propertyId}`);
        const propertyData: PropertyProps = response.data;

        // Calculate booking details
        const calculatedBookingData: BookingDetails = {
          propertyName: propertyData.name,
          price: propertyData.price,
          bookingFee: 65, // Fixed service fee
          totalNights: Number(totalNights) || 0,
          startDate: checkIn as string,
          endDate: checkOut as string,
          guests: Number(guests) || 1,
          total: Number(totalPrice) || propertyData.price,
          image: propertyData.image,
          propertyId: propertyId as string,
        };

        setBookingDetails(calculatedBookingData);
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Failed to load property details. Please try again.");
      } finally {
        setFetchingProperty(false);
      }
    };

    fetchPropertyDetails();
  }, [router.isReady, router.query]);

  const handleBookingSubmit = async (formData: BookingFormData) => {
    if (!bookingDetails) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Combine form data with booking details
      const bookingData = {
        ...formData,
        propertyId: bookingDetails.propertyId,
        checkIn: bookingDetails.startDate,
        checkOut: bookingDetails.endDate,
        totalAmount: bookingDetails.total + bookingDetails.bookingFee,
        totalNights: bookingDetails.totalNights,
        guests: bookingDetails.guests,
      };

      // Replace with your actual booking API endpoint
      // const response = await axios.post("/api/bookings", bookingData);

      // Simulate success
      setSuccess(true);
      setTimeout(() => {
        router.push(`/booking/confirmation/12345`);
      }, 2000);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit booking. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Loading state while fetching property
  if (fetchingProperty) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="h-96 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !bookingDetails) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4">
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
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Go back to property
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-md mx-auto text-center bg-green-50 p-8 rounded-lg border border-green-200">
          <div className="text-green-500 mb-4">
            <svg
              className="mx-auto h-16 w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-4">
            Your booking has been successfully submitted. You will receive a
            confirmation email shortly.
          </p>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">
            Redirecting to confirmation page...
          </p>
        </div>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">No booking details found.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:text-blue-800 underline"
          >
            ← Go back to property
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {error && (
        <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4">
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
              <p className="text-red-800 font-medium">Booking Error</p>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <BookingForm onSubmit={handleBookingSubmit} loading={loading} />
          <CancellationPolicy />
        </div>
        <div className="lg:sticky lg:top-6 lg:self-start">
          <OrderSummary bookingDetails={bookingDetails} />
        </div>
      </div>
    </div>
  );
}
