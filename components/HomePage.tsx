"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Search, MapPin, Calendar, ThumbsUp, Star, MessageSquare, Moon, Sun } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearch = () => {
    router.push("/services");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <Sun size={18} className="text-yellow-500" />
        ) : (
          <Moon size={18} className="text-gray-700" />
        )}
      </button>

      {/* Hero Section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12">
            {/* Left Side - Content */}
            <div className="w-full lg:w-1/2">
              {/* Hero Text */}
              <div className="mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-snug">
                  Discover & Book the Best <span className="text-[#C9507F]">Salons</span> Near You
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  Book hair, beauty & grooming services from top-rated salons near you.
                </p>
              </div>

              {/* Search Bar */}
              <div className={`rounded-xl shadow-md p-4 md:p-5 mb-8 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              } border`}>
                <div className="space-y-3">
                  {/* Service Dropdown */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className={`w-full appearance-none rounded-lg pl-10 pr-8 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9507F] ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-200' 
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      } border`}
                    >
                      <option value="" className="text-gray-500">Service</option>
                      <option value="haircut">Haircut</option>
                      <option value="hair-color">Hair Color</option>
                      <option value="facial">Facial</option>
                      <option value="spa">Hair Spa</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>

                  {/* Location Input */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <MapPin size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Location"
                      className={`w-full rounded-lg pl-10 pr-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C9507F] ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-200' 
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      } border`}
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Calendar size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={dateTime}
                      onChange={(e) => setDateTime(e.target.value)}
                      placeholder="dd-mm-yyyy"
                      className={`w-full rounded-lg pl-10 pr-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C9507F] ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-200' 
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      } border`}
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
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <ThumbsUp size={18} className="text-[#C9507F]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">2500+</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Salons</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <Star size={18} className="text-[#C9507F]" fill="#C9507F" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">12,000+</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Services</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <MessageSquare size={18} className="text-[#C9507F]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">Review</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">25K+ (4.8+)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/assets/HomeImg.jpg"
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