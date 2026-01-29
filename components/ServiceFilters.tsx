"use client";

import { useState } from "react";
import Input from "./ui/Input";
import { ChevronDown, MapPin } from "lucide-react";
import { FilterState } from "@/lib/filterServices";

interface Props {
  onFilterChange: (filters: FilterState) => void;
}

export default function ServiceFilters({ onFilterChange }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    location: "",
    minPrice: 0,
    maxPrice: 2000,
    tags: [],
  });
  const [priceRange, setPriceRange] = useState(2000);
  const [showCategories, setShowCategories] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = ["Hair Color", "Hair Spa", "Hair Cut"];
  const categories = [
    "Hair Cut",
    "Hair Spa", 
    "Facial",
    "Hair Color",
    "Massage",
    "Hair Treatment",
    "Nails"
  ];
  const locations = [
    "Maryland City, MD, USA",
    "New Jersey, USA",
    "California, USA",
    "Maryland, USA",
    "Texas, USA"
  ];

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    const newFilters = { ...filters, tags: newTags };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleLocationChange = (value: string) => {
    const newFilters = { ...filters, location: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: number) => {
    setPriceRange(value);
    const newFilters = { ...filters, maxPrice: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      categories: [],
      location: "",
      minPrice: 0,
      maxPrice: 2000,
      tags: [],
    };
    setFilters(resetFilters);
    setPriceRange(2000);
    setSelectedTags([]);
    onFilterChange(resetFilters);
  };

  return (
    <aside className="w-full max-w-[340px] mx-auto lg:mx-0 rounded-lg border bg-white p-4 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Filters</h3>
        <button 
          onClick={handleReset}
          className="text-xs sm:text-sm text-blue-600 hover:underline font-medium"
        >
          Reset Filter
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Tags - Responsive */}
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-full border transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-blue-50 text-blue-600 border-blue-200"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div>
          <label className="text-xs sm:text-sm font-semibold text-gray-900 block mb-2 sm:mb-3">
            Search By Keyword
          </label>
          <Input 
            placeholder="What are you looking for?" 
            className="text-xs sm:text-sm"
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Categories - Responsive */}
        <div>
          <button 
            onClick={() => setShowCategories(!showCategories)}
            className="w-full flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3"
          >
            Categories
            <ChevronDown size={16} className={`transition-transform ${showCategories ? 'rotate-180' : ''}`} />
          </button>
          {showCategories && (
            <div className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm text-gray-700">
              <label className="flex items-center gap-2 sm:gap-2.5 cursor-pointer hover:text-gray-900">
                <input 
                  type="checkbox" 
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300"
                  checked={filters.categories.length === 0}
                  onChange={() => {
                    const newFilters = { ...filters, categories: [] };
                    setFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                />
                <span>All Categories</span>
              </label>
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 sm:gap-2.5 cursor-pointer hover:text-gray-900">
                  <input 
                    type="checkbox" 
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="text-xs sm:text-sm font-semibold text-gray-900 block mb-2 sm:mb-3">
            Location
          </label>
          <div className="relative">
            <select 
              className="w-full border border-gray-300 rounded-lg px-2 sm:px-3 py-2 sm:py-2.5 pl-8 sm:pl-9 text-xs sm:text-sm text-gray-500 appearance-none bg-white pr-6 sm:pr-8"
              value={filters.location}
              onChange={(e) => handleLocationChange(e.target.value)}
            >
              <option value="">Select Location</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <MapPin 
              size={14} 
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <ChevronDown 
              size={14} 
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Price Range - Responsive */}
        <div>
          <label className="text-xs sm:text-sm font-semibold text-gray-900 block mb-2 sm:mb-3">
            Price Range
          </label>
          <div className="bg-gray-50 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">₹369</span>
              <span className="text-xs font-medium text-gray-600">₹{priceRange}</span>
            </div>
          </div>
          <div className="relative pt-1">
            <input
              type="range"
              min={369}
              max={2000}
              value={priceRange}
              onChange={(e) => handlePriceChange(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Price: ₹05 - ₹2000</span>
          </div>
        </div>
      </div>
    </aside>
  );
}