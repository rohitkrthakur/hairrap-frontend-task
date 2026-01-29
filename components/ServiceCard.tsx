import { Service } from "@/types/service";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Star, MapPin } from "lucide-react";

interface Props {
  service: Service;
}

const images = ["/assets/s1.jpg", "/assets/s2.jpg", "/assets/s3.jpg", "/assets/s4.jpg"];
const avatars = ["/assets/p1.png", "/assets/p2.png", "/assets/p3.png", "/assets/p4.png"];

export default function ServiceCard({ service }: Props) {
  const router = useRouter();

  const handleBook = () => {
    // Pass service details as URL parameters
    const params = new URLSearchParams({
      serviceId: service.id,
      serviceName: service.name,
      salonName: service.salonName || "Salon",
      salonImage: service.salonImage || images[0],
      salonLocation: service.salonLocation || "Location",
      price: service.price.toString(),
    });
    
    router.push(`/book?${params.toString()}`);
  };

  // Pick image based on service id
  const imgIndex = (parseInt(service.id, 10) - 1) % images.length;
  const imgSrc = service.salonImage || images[imgIndex];
  const avatarIndex = (parseInt(service.id, 10) - 1) % avatars.length;
  const avatarSrc = avatars[avatarIndex];

  const rating = service.salonRating || (4.2 + (parseInt(service.id, 10) % 8) / 10);
  const reviews = service.salonReviews || 120;
  const originalPrice = service.price + 200;

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-56 w-full">
        <Image
          src={imgSrc}
          alt={service.name}
          fill
          className="object-cover"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-xs px-3 py-1.5 rounded-full font-medium text-gray-700 shadow-sm">
          {service.category || service.name}
        </div>

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-sm">
          <Heart size={18} className="text-gray-600" />
        </button>

        {/* Avatar Badge - Fixed with image */}
        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden">
          <Image
            src={avatarSrc}
            alt="Stylist"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {service.salonName || "Salon Name"}
        </h3>

        <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
          <MapPin size={14} className="text-gray-400" />
          <span>{service.salonLocation || "Location"}</span>
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-900">{rating.toFixed(1)}</span>
          <span className="text-sm text-gray-500">({reviews} reviews)</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₹{service.price}
            </span>
            <span className="text-sm line-through text-gray-400">
              ₹{originalPrice}
            </span>
          </div>
        </div>

        <Button 
          onClick={handleBook} 
          className="w-full bg-[#B56584] hover:bg-[#A05472] text-white font-medium py-2.5 rounded-lg"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}