import React from "react";
import Image from "next/image";

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

interface OrderSummaryProps {
  bookingDetails: BookingDetails;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ bookingDetails }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

      {/* Property Image and Name */}
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
          <Image
            src={bookingDetails.image}
            alt={bookingDetails.propertyName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            {bookingDetails.propertyName}
          </h3>
          <p className="text-sm text-gray-600">
            {bookingDetails.guests} guest
            {bookingDetails.guests !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Dates */}
      <div className="border-t border-b py-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Check-in</p>
            <p className="font-medium">
              {formatDate(bookingDetails.startDate)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Check-out</p>
            <p className="font-medium">{formatDate(bookingDetails.endDate)}</p>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>
            ${bookingDetails.price} × {bookingDetails.totalNights} nights
          </span>
          <span>${bookingDetails.price * bookingDetails.totalNights}</span>
        </div>
        <div className="flex justify-between">
          <span>Service fee</span>
          <span>${bookingDetails.bookingFee}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t pt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${bookingDetails.total + bookingDetails.bookingFee}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
