// components/property/BookingSection.tsx
import React, { useState, useEffect } from "react";
import { BookingFormData } from "@/interfaces/index";

interface BookingSectionProps {
  price: number;
  rating: number;
  reviewCount?: number;
}

const BookingSection: React.FC<BookingSectionProps> = ({
  price,
  rating,
  reviewCount = 0,
}) => {
  const [bookingData, setBookingData] = useState<BookingFormData>({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [nights, setNights] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Calculate nights and total cost whenever dates change
  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkInDate = new Date(bookingData.checkIn);
      const checkOutDate = new Date(bookingData.checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const nightsCount = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (nightsCount > 0) {
        setNights(nightsCount);
        setTotalCost(nightsCount * price);
      } else {
        setNights(0);
        setTotalCost(0);
      }
    }
  }, [bookingData.checkIn, bookingData.checkOut, price]);

  const handleInputChange = (
    field: keyof BookingFormData,
    value: string | number
  ) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReserve = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    if (nights <= 0) {
      alert("Check-out date must be after check-in date");
      return;
    }

    // Here you would typically handle the booking submission
    alert(`Booking confirmed for ${nights} nights. Total: $${totalCost}`);
  };

  return (
    <div className="sticky top-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
        {/* Price and Rating Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold">${price}</span>
            <span className="text-gray-600 ml-1">night</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">{rating}</span>
            {reviewCount > 0 && (
              <span className="text-gray-600">({reviewCount} reviews)</span>
            )}
          </div>
        </div>

        {/* Date Selection */}
        <div className="border border-gray-300 rounded-lg mb-4">
          <div className="grid grid-cols-2">
            <div className="p-3 border-r border-gray-300">
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Check-in
              </label>
              <input
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => handleInputChange("checkIn", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full text-sm border-none focus:outline-none"
              />
            </div>
            <div className="p-3">
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Check-out
              </label>
              <input
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => handleInputChange("checkOut", e.target.value)}
                min={
                  bookingData.checkIn || new Date().toISOString().split("T")[0]
                }
                className="w-full text-sm border-none focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 border-t border-gray-300">
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Guests
            </label>
            <select
              value={bookingData.guests}
              onChange={(e) =>
                handleInputChange("guests", parseInt(e.target.value))
              }
              className="w-full text-sm border-none focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} guest{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reserve Button */}
        <button
          onClick={handleReserve}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 mb-4"
        >
          Reserve
        </button>

        <p className="text-center text-gray-500 text-sm mb-4">
          You will not be charged yet
        </p>

        {/* Cost Breakdown */}
        {nights > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">
                ${price} x {nights} nights
              </span>
              <span>${price * nights}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service fee</span>
              <span>${Math.round(totalCost * 0.1)}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${totalCost + Math.round(totalCost * 0.1)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSection;
