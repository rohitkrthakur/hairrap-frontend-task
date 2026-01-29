"use client";

import Input from "./ui/Input";
import { ChevronDown, MapPin } from "lucide-react";

export default function ServiceFilters() {
  return (
    <aside className="w-full max-w-[340px] rounded-lg border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button className="text-sm text-blue-600 hover:underline font-medium">
          Reset Filter
        </button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="text-sm font-semibold text-gray-900 block mb-3">
            Search By Keyword
          </label>
          <Input 
            placeholder="What are you looking for?" 
            className="text-sm"
          />
        </div>

        {/* Categories */}
        <div>
          <button className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 mb-3">
            Categories
            <ChevronDown size={18} />
          </button>
          <div className="space-y-2.5 text-sm text-gray-700">
            <label className="flex items-center gap-2.5 cursor-pointer hover:text-gray-900">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <span>All Categories</span>
            </label>
            {[
              "Hair Cut and Blow Dry",
              "Royal Hair Cut",
              "Kids Cut",
              "Elegant Hair Wash",
              "Root Touch up",
              "Hair Color",
            ].map((item) => (
              <label key={item} className="flex items-center gap-2.5 cursor-pointer hover:text-gray-900">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <button className="text-sm text-blue-600 hover:underline font-medium mt-3 flex items-center gap-1">
            View More
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Sub Category */}
        <div>
          <label className="text-sm font-semibold text-gray-900 block mb-3">
            Sub Category
          </label>
          <div className="relative">
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-500 appearance-none bg-white pr-8">
              <option>Select Sub Category</option>
            </select>
            <ChevronDown 
              size={16} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-semibold text-gray-900 block mb-3">
            Location
          </label>
          <div className="relative">
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pl-9 text-sm text-gray-500 appearance-none bg-white pr-8">
              <option>Select Location</option>
            </select>
            <MapPin 
              size={16} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <ChevronDown 
              size={16} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-sm font-semibold text-gray-900 block mb-3">
            Price Range
          </label>
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-600">₹369</span>
              <span className="text-xs font-medium text-gray-600">₹999</span>
            </div>
          </div>
          <div className="relative pt-1">
            <input
              type="range"
              min={0}
              max={2000}
              defaultValue={0}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Price: ₹05 - ₹2000+</span>
          </div>
        </div>

        {/* Ratings */}
        <div>
          <button className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 mb-3">
            Ratings
            <ChevronDown size={18} />
          </button>
          <div className="space-y-2.5">
            {[
              { stars: 5, count: 55 },
              { stars: 4, count: 48 },
              { stars: 3, count: 13 },
            ].map(({ stars, count }) => (
              <label key={stars} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < stars ? "fill-yellow-400" : "fill-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-500">({count})</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}