"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBookings } from "@/lib/api";
import { Booking } from "@/types/booking";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Share2
} from "lucide-react";
import Image from "next/image";

// Hero Component
function Hero({
  title,
  subtitle,
  background = "/assets/bg.jpg",
}: {
  title: string;
  subtitle?: string;
  background?: string;
}) {
  return (
    <section
      className="relative h-40 sm:h-48 md:h-56 w-full flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-xs sm:text-sm text-white/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const config = {
    CONFIRMED: {
      icon: CheckCircle,
      className: "bg-green-50 text-green-700 border-green-200",
      label: "Confirmed",
    },
    PENDING: {
      icon: AlertCircle,
      className: "bg-yellow-50 text-yellow-700 border-yellow-200",
      label: "Pending",
    },
    CANCELLED: {
      icon: XCircle,
      className: "bg-red-50 text-red-700 border-red-200",
      label: "Cancelled",
    },
  };

  const { icon: Icon, className, label } = config[status as keyof typeof config] || config.PENDING;

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${className}`}>
      <Icon size={18} />
      <span className="font-semibold text-sm">{label}</span>
    </div>
  );
}

export default function BookingDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings().then((all) => {
      const found = all.find((b) => b.id === id);
      setBooking(found || null);
      setLoading(false);
    });
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Hero title="Booking Details" subtitle="Home > Bookings > Details" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9507F]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Hero title="Booking Not Found" subtitle="Home > Bookings > Details" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <XCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
            <p className="text-gray-600 mb-6">The booking you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={handleBack}
              className="bg-[#C9507F] hover:bg-[#b8467] text-white px-6 py-2 rounded-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero title="Booking Details" subtitle="Home > Bookings > Details" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Bookings</span>
        </button>

        {/* Status Banner */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Booking #{booking.id.slice(0, 8).toUpperCase()}
              </h1>
              <p className="text-sm text-gray-600">
                Booked on {new Date(booking.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <StatusBadge status={booking.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Salon Information */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-[#C9507F]" />
                Salon Information
              </h2>
              
              <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* Salon Image */}
                <div className="flex-shrink-0 w-full sm:w-32 h-32">
                  <Image
                    src={booking.salonImage || "/assets/s1.jpg"}
                    alt={booking.salonName || "Salon"}
                    width={128}
                    height={128}
                    className="rounded-xl object-cover w-full h-full"
                  />
                </div>

                {/* Salon Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {booking.salonName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{booking.salonLocation}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                      Premium Salon
                    </span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Tag size={20} className="text-[#C9507F]" />
                Service Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {booking.serviceName}
                    </h3>
                    <p className="text-sm text-gray-600">Professional service</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{(booking.price || 0).toLocaleString()}
                    </div>
                    {booking.originalPrice && booking.price && booking.originalPrice > booking.price && (
                      <div className="text-sm text-gray-400 line-through">
                        ₹{booking.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Appointment Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-[#C9507F] rounded-lg flex items-center justify-center">
                      <Calendar size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Appointment Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(booking.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-[#C9507F] rounded-lg flex items-center justify-center">
                      <Clock size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Appointment Time</p>
                      <p className="font-semibold text-gray-900">{booking.time}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {booking.note && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs font-semibold text-amber-900 mb-1">Special Note</p>
                    <p className="text-sm text-amber-800">{booking.note}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-[#C9507F]" />
                Customer Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <User size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">
                      {booking.firstName} {booking.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Mail size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-900 break-all">{booking.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Phone size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{booking.phone}</p>
                  </div>
                </div>

                {booking.gender && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <User size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="font-medium text-gray-900 capitalize">{booking.gender}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Summary */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Price Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Price</span>
                  <span className="font-medium text-gray-900">
                    ₹{((booking.originalPrice || booking.price) || 0).toLocaleString()}
                  </span>
                </div>
                
                {booking.discount && booking.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount</span>
                    <span className="font-medium text-green-600">
                      -₹{booking.discount.toLocaleString()}
                    </span>
                  </div>
                )}
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-[#C9507F]">
                      ₹{(booking.price || 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                {booking.discount && booking.discount > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-green-800 text-center">
                      You saved ₹{booking.discount.toLocaleString()} on this booking!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#C9507F] hover:bg-[#b8467] text-white rounded-lg transition-colors">
                  <Download size={18} />
                  <span>Download Receipt</span>
                </button>
                
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg transition-colors">
                  <Share2 size={18} />
                  <span>Share Booking</span>
                </button>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl border border-purple-200 p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Contact our support team for any assistance with your booking.
              </p>
              <button className="w-full px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg transition-colors font-medium text-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}