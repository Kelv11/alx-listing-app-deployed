// components/property/PropertyDetail.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import { PropertyProps } from "@/interfaces/index";
import ReviewSection from "./ReviewSection";

interface PropertyDetailProps {
  property: PropertyProps;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(property.price);
  const [serviceFee] = useState(65);

  // Calculate total nights and price when dates change
  const calculateTotal = () => {
    if (checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      const nights = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (nights > 0) {
        setTotalNights(nights);
        setTotalPrice(property.price * nights);
      }
    }
  };

  const handleReserveClick = () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    // Only pass essential booking data
    const bookingData = {
      propertyId: property.id,
      checkIn,
      checkOut,
      guests: parseInt(guests),
      totalNights,
      totalPrice: totalPrice + serviceFee,
    };

    // Navigate to booking page with minimal data
    router.push({
      pathname: "/booking",
      query: bookingData,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Property Images */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="lg:col-span-1">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="lg:col-span-1 grid grid-cols-2 gap-4">
          {/* Additional images */}
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-44 object-cover rounded-lg"
          />
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-44 object-cover rounded-lg"
          />
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-44 object-cover rounded-lg"
          />
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-44 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{property.name}</h1>

          <div className="flex items-center mb-4">
            <span className="text-yellow-500 mr-2">★</span>
            <span className="font-semibold">{property.rating}</span>
            <span className="text-gray-600 ml-2">
              ({property.reviews?.length || 0} reviews)
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {property.description ||
                "This is a beautiful property with amazing amenities and great location."}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              {property.amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {amenity}
                </div>
              )) || (
                <>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Free WiFi
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Air Conditioning
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Kitchen
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Parking
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <ReviewSection propertyId={property.id} />
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 shadow-lg sticky top-6">
            <div className="mb-4">
              <span className="text-3xl font-bold">${property.price}</span>
              <span className="text-gray-600"> / night</span>
            </div>

            <div className="mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      calculateTotal();
                    }}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => {
                      setCheckOut(e.target.value);
                      calculateTotal();
                    }}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5">5+ guests</option>
              </select>
            </div>

            <button
              onClick={handleReserveClick}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Reserve Now
            </button>

            <div className="mt-4 text-center text-gray-600">
              <p className="text-sm">You will not be charged yet</p>
            </div>

            <div className="mt-4 pt-4 border-t">
              {totalNights > 0 ? (
                <>
                  <div className="flex justify-between mb-2">
                    <span>
                      ${property.price} × {totalNights} nights
                    </span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service fee</span>
                    <span>${serviceFee}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${totalPrice + serviceFee}</span>
                  </div>
                </>
              ) : (
                <div className="text-gray-500 text-sm">
                  Select dates to see total
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
