"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Service } from "@/types/service";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";
import { createBooking, getServices } from "@/lib/api";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Star,
  CheckCircle,
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

interface Props {
  preselectedServiceId?: string | null;
}

function BookingFormContent({ preselectedServiceId }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get salon details from URL
  const urlSalonName = searchParams.get("salonName");
  const urlSalonImage = searchParams.get("salonImage");
  const urlSalonLocation = searchParams.get("salonLocation");
  const urlServiceName = searchParams.get("serviceName");
  const urlPrice = searchParams.get("price");

  const [services, setServices] = useState<Service[]>([]);
  const [serviceId, setServiceId] = useState(preselectedServiceId || searchParams.get("serviceId") || "");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [stylist, setStylist] = useState("");
  const [preferredGender, setPreferredGender] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceId || !date || !time || !firstName || !email || !phone) {
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
        salonName: service.salonName || urlSalonName || "",
        salonImage: service.salonImage || urlSalonImage || "",
        salonLocation: service.salonLocation || urlSalonLocation || "",
        firstName,
        lastName,
        email,
        phone,
        gender,
        stylist,
        preferredGender,
        serviceCategory,
        date,
        time,
        note,
        price: service.price,
        originalPrice: service.price + 200,
        discount: 200,
      });

      setMessage("Booking Done! Your appointment has been confirmed.");
      
      // Redirect to bookings page after 2 seconds
      setTimeout(() => {
        router.push("/bookings");
      }, 2000);
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate price
  const selectedService = services.find((s) => s.id === serviceId);
  const basePrice = selectedService?.price || parseInt(urlPrice || "1499");
  const discount = 200;
  const total = basePrice;
  const originalPrice = basePrice + discount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* Salon Header Card */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-8">
        <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6">
          {/* Salon Image */}
          <div className="flex-shrink-0 w-full sm:w-auto">
            <Image
              src={urlSalonImage || "/assets/s1.jpg"}
              alt="Salon"
              width={120}
              height={120}
              className="rounded-xl object-cover w-full sm:w-[120px] h-[200px] sm:h-[120px]"
            />
          </div>

          {/* Salon Info */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Column 1 */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">4.9</span>
                <span className="text-xs sm:text-sm text-gray-500">(255 reviews)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {urlSalonName || "Glow & Glam Studio"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-3">
                We connect top talents with companies who truly do AMAZING
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  🏢 Salon Industry
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  📅 Member Since 18 Aug 2023
                </span>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2">
                <Mail size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-900 break-all">
                    salon@example.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-sm text-gray-900">+1 880 800 XXXX</p>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2">
                <Globe size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Language Known</p>
                  <p className="text-sm text-gray-900">English, Arabic, French +4 More</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm text-gray-900">{urlSalonLocation || "Texas, USA"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles & View Button */}
          <div className="flex-shrink-0 w-full lg:w-auto flex lg:flex-col items-center lg:items-end gap-3 justify-between lg:justify-start">
            <Button className="bg-[#C9507F] hover:bg-[#b8467] text-white px-4 sm:px-6 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base">
              <CheckCircle size={16} />
              View Salon
            </Button>
            <div className="lg:mt-auto">
              <p className="text-xs text-gray-500 mb-2 text-right hidden lg:block">Social Profiles</p>
              <div className="flex gap-2">
                {/* Social icons */}
                <a href="#" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                  <Instagram size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                  <FaXTwitter size={14} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Book an Appointment
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
          Ready to take the first step toward your dream property? Fill out the
          form below, and our real estate wizards will work their magic to find
          your perfect match. Don't wait; let's embark on this exciting journey
          together.
        </p>

        {message && (
          <div
            className={`mb-6 p-3 sm:p-4 rounded-lg ${
              message.includes("Done")
                ? "bg-green-50 border border-green-200"
                : message.includes("required")
                ? "bg-red-50 border border-red-200"
                : "bg-blue-50 border border-blue-200"
            }`}
          >
            <p
              className={`text-xs sm:text-sm font-medium ${
                message.includes("Done")
                  ? "text-green-800"
                  : message.includes("required")
                  ? "text-red-800"
                  : "text-blue-800"
              }`}
            >
              {message}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Row 1: First Name, Last Name, Email, Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                First Name
              </label>
              <Input
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Last Name
              </label>
              <Input
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Phone
              </label>
              <Input
                type="tel"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Row 2: Choose Whom */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
              Choose Whom
            </label>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </div>

          {/* Row 3: Stylist, Gender, Services, Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Choose Stylist
              </label>
              <Select
                value={stylist}
                onChange={(e) => setStylist(e.target.value)}
              >
                <option value="">Select Stylist</option>
                <option value="stylist1">Stylist 1</option>
                <option value="stylist2">Stylist 2</option>
              </Select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Gender
              </label>
              <Select
                value={preferredGender}
                onChange={(e) => setPreferredGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Services Type
              </label>
              <Select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
              >
                <option value="">Select Services</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Service Category
              </label>
              <Select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="haircut">Hair Cut</option>
                <option value="coloring">Hair Coloring</option>
                <option value="spa">Spa</option>
              </Select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Select Date
              </label>
              <Input
                type="date"
                placeholder="Select Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Time
              </label>
              <Input
                type="time"
                placeholder="Select Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
              Message (Optional)
            </label>
            <textarea
              placeholder="Enter your Message here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9507F] focus:border-transparent resize-none"
            />
          </div>

          {/* Price Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 py-4 border-t border-gray-200">
            <div className="flex items-baseline gap-2">
              <span className="text-xs sm:text-sm text-gray-600">Total</span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">₹{total.toLocaleString()}</span>
              <span className="text-xs sm:text-sm text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
            </div>
            <div className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded">
              30% OFF
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-stretch sm:justify-end pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[#C9507F] hover:bg-[#b8467] text-white px-8 sm:px-12 py-3 font-medium rounded-lg text-sm sm:text-base"
            >
              {loading ? "Booking..." : "Book Now"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Export with Suspense wrapper
export default function BookingForm(props: Props) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9507F]"></div>
      </div>
    }>
      <BookingFormContent {...props} />
    </Suspense>
  );
}