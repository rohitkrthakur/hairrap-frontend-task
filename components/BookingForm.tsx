"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Service } from "@/types/service";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";
import { createBooking, getServices } from "@/lib/api";
import { Mail, Phone, MapPin, Globe, Star, Check } from "lucide-react";
import Image from "next/image";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp, 
  FaLinkedinIn 
} from "react-icons/fa";

interface Props {
  preselectedServiceId?: string | null;
}

// Salon images array - should match ServiceCard images
const salonImages = [
  "/assets/s1.jpg", // For Glow & Glam Studio
  "/assets/s2.jpg", // For The Velvet Touch
  "/assets/s3.jpg", // For Aura Luxe Salon
  "/assets/s4.jpg", // For Makeup Nails
  "/assets/s5.jpg", // For Opal Beauty Lounge
  "/assets/s6.jpg", // For The Glam Society
  "/assets/s7.jpg", // For Crown & Curl
  "/assets/s8.jpg", // For Bliss Beauty Bar
];

export default function BookingForm({ preselectedServiceId }: Props) {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [serviceId, setServiceId] = useState(preselectedServiceId || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  // Get the selected service object
  const selectedService = services.find((s) => s.id === serviceId);
  
  // Get the salon image based on service index
  const getSalonImage = () => {
    if (!selectedService) return "/assets/s1.jpg"; // Default image
    
    const index = (parseInt(selectedService.id, 10) - 1) % salonImages.length;
    return salonImages[index];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceId || !date || !time) {
      setMessage("Please fill all required fields.");
      return;
    }

    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    try {
      setLoading(true);
      const res = await createBooking({
        userId: "123",
        serviceId,
        serviceName: service.name,
        salonName: service.salonName, // Add salonName to booking
        date,
        time,
        note,
      });

      setMessage("Booking Done! Your appointment has been confirmed.");
      
      // Redirect to bookings page after 2 seconds
      setTimeout(() => {
        router.push("/bookings");
      }, 2000);
      
      // Reset form
      setDate("");
      setTime("");
      setNote("");
      setServiceId("");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Salon Header Card - NOW DYNAMIC */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-start gap-6">
          {/* Salon Image - NOW DYNAMIC */}
          <div className="flex-shrink-0">
            <Image
              src={getSalonImage()}
              alt={selectedService?.salonName || "Salon"}
              width={120}
              height={120}
              className="rounded-xl object-cover"
            />
          </div>

          {/* Salon Info */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {selectedService?.rating?.toFixed(1) || "4.9"}
                </span>
                <span className="text-sm text-gray-500">(255 reviews)</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedService?.salonName || "Select a service"}
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                {selectedService?.name ? 
                  `Professional ${selectedService.name.toLowerCase()} services` : 
                  "We connect top talents with companies who truly do AMAZING"
                }
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  🏢 Salon Industry
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  📅 Member Since 18 Aug 2023
                </span>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">
                    {selectedService?.salonName ? 
                      `${selectedService.salonName.toLowerCase().replace(/\s+/g, '')}@example.com` : 
                      "salon@example.com"
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-sm text-gray-900">+1 880 800 X-XXX-X</p>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Globe size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Language Known</p>
                  <p className="text-sm text-gray-900">English, Arabic, French +4 More</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm text-gray-900">
                    {selectedService?.location || "Texas, USA"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles & Save Button */}
          <div className="flex-shrink-0 flex flex-col items-end gap-3">
            <Button className="bg-[#C9507F] hover:bg-[#b8467] text-white px-6 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
              <Check size={16} />
              View Salon
            </Button>
            <div>
              <p className="text-xs text-gray-500 mb-2 text-right">Social Profiles</p>
              <div className="flex gap-2">
                <a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={14} />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
                  aria-label="Instagram"
                >
                  <FaInstagram size={14} />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors cursor-pointer"
                  aria-label="Twitter"
                >
                  <FaTwitter size={14} />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors cursor-pointer"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={14} />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white hover:bg-blue-800 transition-colors cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Book an Appointment
        </h2>
        <p className="text-gray-600 mb-8">
          Ready to take the first step toward your dream property? Fill out the
          form below, and our real estate wizards will work their magic to find
          your perfect match. Don't wait; let's embark on this exciting journey
          together.
        </p>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes("Done") 
              ? "bg-green-50 border border-green-200" 
              : message.includes("required")
              ? "bg-red-50 border border-red-200"
              : "bg-blue-50 border border-blue-200"
          }`}>
            <p className={`text-sm font-medium ${
              message.includes("Done") 
                ? "text-green-800" 
                : message.includes("required")
                ? "text-red-800"
                : "text-blue-800"
            }`}>
              {message.includes("Done") 
                ? "✓ Booking Done! Your appointment has been confirmed. Redirecting to bookings..."
                : message
              }
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2 cursor-pointer">
              Services Type
            </label>
            <Select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full cursor-pointer"
            >
              <option value="">Select Services</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} - {s.salonName}
                </option>
              ))}
            </Select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2 cursor-pointer">
                Select Date
              </label>
              <Input
                type="date"
                placeholder="Select Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2 cursor-pointer">
                Time
              </label>
              <Input
                type="time"
                placeholder="Select Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2 cursor-pointer">
              Message (Optional)
            </label>
            <textarea
              placeholder="Enter your Message here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9507F] focus:border-transparent resize-none cursor-pointer"
            />
          </div>

          {/* Price Summary - NOW DYNAMIC */}
          <div className="flex items-center justify-between py-4 border-t border-gray-200">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                ₹{selectedService?.price || "1,499"}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{(selectedService?.price || 1499) + 200}
              </span>
            </div>
            <div className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded cursor-pointer">
              30% OFF
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#C9507F] hover:bg-[#b8467] text-white px-12 py-3 font-medium rounded-lg cursor-pointer"
            >
              {loading ? "Booking..." : "Book Now"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}