"use client";

import { useEffect, useState } from "react";
import { getServices } from "@/lib/api";
import { Service } from "@/types/service";
import ServiceCard from "@/components/ServiceCard";
import ServiceFilters from "@/components/ServiceFilters";
import Hero from "@/components/Hero";
import { filterServices, sortServices, FilterState } from "@/lib/filterServices";
import Loader from "@/components/Loader";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    location: "",
    minPrice: 0,
    maxPrice: 2000,
    tags: [],
  });

  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    setLoading(true);
    getServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    const filtered = filterServices(services, filters);
    setFilteredServices(filtered);
  }, [services, filters]);

  // Apply sorting
  const sortedServices = sortServices(filteredServices, sortBy);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Hero title="Services" subtitle="Home > Services" />

      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Salon Services</h1>
          <p className="text-sm text-gray-500 mt-1">
            Find the perfect service for you
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <ServiceFilters onFilterChange={handleFilterChange} />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-base font-medium">
                Found{" "}
                <span className="text-[#B56584] font-bold">
                  {sortedServices.length}
                </span>{" "}
                <span className="text-[#B56584] font-bold">Services</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Sort:</span>
                <select
                  className="border rounded-md px-2 py-1 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Select Sort</option>
                  <option value="price-low">Price Low to High</option>
                  <option value="price-high">Price High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
