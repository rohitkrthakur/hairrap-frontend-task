"use client";

import { Booking } from "@/types/booking";
import { ChevronRight, MapPin, User, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  booking: Booking;
  onCancel: (id: string) => void;
}

export default function BookingItem({ booking, onCancel }: Props) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-50 text-green-600 border-green-200";
      case "CANCELLED":
        return "bg-red-50 text-red-600 border-red-200";
      case "PENDING":
        return "bg-orange-50 text-orange-600 border-orange-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    if (status === "CONFIRMED") return "Completed";
    if (status === "CANCELLED") return "Canceled";
    return "Pending";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      {/* Header Section */}
      <div className="flex items-start gap-4 mb-4">
        {/* Salon Image */}
        {booking.salonImage && (
          <div className="flex-shrink-0">
            <Image
              src={booking.salonImage}
              alt={booking.salonName || "Salon"}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        {/* Booking Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {booking.salonName || "Salon"} | {booking.serviceName}
              </h3>
              <p className="text-sm text-gray-500">#{booking.id}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                booking.status
              )}`}
            >
              {getStatusText(booking.status)}
            </span>
          </div>

          {/* Location */}
          {booking.salonLocation && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
              <MapPin size={14} className="text-gray-400" />
              <span>{booking.salonLocation}</span>
            </div>
          )}

          {/* Customer Info */}
          {booking.firstName && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
              <User size={14} className="text-gray-400" />
              <span>
                {booking.firstName} {booking.lastName}
              </span>
              {booking.email && (
                <span className="text-gray-400"> • {booking.email}</span>
              )}
              {booking.phone && (
                <span className="text-gray-400"> • {booking.phone}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-8">
          {/* Date & Time */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Booking Date & Time</p>
            <div className="flex items-center gap-3 text-sm font-medium text-gray-900">
              <div className="flex items-center gap-1">
                <Calendar size={14} className="text-gray-400" />
                <span>{new Date(booking.date).toLocaleDateString()}</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-gray-400" />
                <span>{booking.time}</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Paid</p>
            <p className="text-sm font-semibold text-gray-900">
              ₹{booking.price || 459}
            </p>
          </div>

          {/* Additional Details */}
          {(booking.stylist || booking.serviceCategory) && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Service Details</p>
              <p className="text-sm text-gray-900">
                {booking.serviceCategory && <span>{booking.serviceCategory}</span>}
                {booking.stylist && booking.serviceCategory && (
                  <span className="text-gray-400"> • </span>
                )}
                {booking.stylist && <span>{booking.stylist}</span>}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {booking.status === "PENDING" && (
            <button
              onClick={() => onCancel(booking.id)}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => router.push(`/bookings/${booking.id}`)}
            className="flex items-center gap-1 text-sm font-medium text-[#C9507F] hover:text-[#b8467] transition-colors"
          >
            Booking Details
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
