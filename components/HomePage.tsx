"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Search, MapPin, Calendar, ThumbsUp, Star, MessageSquare } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleSearch = () => {
    router.push("/services");
  };

  return (
    <div className="relative min-h-screen bg-white transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12">
            
            {/* Left Side */}
            <div className="w-full lg:w-1/2">
              
              {/* Hero Text */}
              <div className="mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-snug">
                  Discover & Book the Best <span className="text-[#C9507F]">Salons</span> Near You
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                  Book hair, beauty & grooming services from top-rated salons near you.
                </p>
              </div>

              {/* Search Bar */}
              <div className="rounded-xl shadow-md p-4 md:p-5 mb-8 bg-white border border-gray-100">
                <div className="space-y-3">
                  
                  {/* Service Dropdown */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full appearance-none rounded-lg pl-10 pr-8 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9507F] bg-gray-50 border-gray-200 text-gray-900 border"
                    >
                      <option value="" className="text-gray-500">Service</option>
                      <option value="haircut">Haircut</option>
                      <option value="hair-color">Hair Color</option>
                      <option value="facial">Facial</option>
                      <option value="spa">Hair Spa</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>

                  {/* Location */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <MapPin size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Location"
                      className="w-full rounded-lg pl-10 pr-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C9507F] bg-gray-50 border-gray-200 text-gray-900 border"
                    />
                  </div>

                  {/* Date */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Calendar size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={dateTime}
                      onChange={(e) => setDateTime(e.target.value)}
                      placeholder="dd-mm-yyyy"
                      className="w-full rounded-lg pl-10 pr-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C9507F] bg-gray-50 border-gray-200 text-gray-900 border"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>

                {/* Search Button */}
                <div className="mt-4">
                  <Button
                    onClick={handleSearch}
                    className="bg-[#C9507F] hover:bg-[#d65a8b] text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 w-full shadow-sm hover:shadow transition-all"
                  >
                    <Search size={18} />
                    Search
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100">
                    <ThumbsUp size={18} className="text-[#C9507F]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">2500+</div>
                    <div className="text-xs text-gray-500">Salons</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100">
                    <Star size={18} className="text-[#C9507F]" fill="#C9507F" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">12,000+</div>
                    <div className="text-xs text-gray-500">Services</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100">
                    <MessageSquare size={18} className="text-[#C9507F]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">Review</div>
                    <div className="text-xs text-gray-500">25K+ (4.8+)</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/assets/homeImg.jpg"
                  alt="Salon Interior"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
