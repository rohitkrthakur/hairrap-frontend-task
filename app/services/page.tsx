"use client";

import { useEffect, useState } from "react";
import { getServices } from "@/lib/api";
import { Service } from "@/types/service";
import ServiceCard from "@/components/ServiceCard";
import ServiceFilters from "@/components/ServiceFilters";
import Hero from "@/components/Hero";


export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return (
  <>
    <Hero title="Services" subtitle="Home > Services" />

    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Salon Services</h1>
        <p className="text-sm text-gray-500 mt-1">
          Find the perfect service for you
        </p>
      </div>

      {/* Layout */}
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <ServiceFilters />

        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              Found <span className="font-semibold">{services.length}</span>{" "}
              Services
            </p>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort:</span>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>Price Low to High</option>
                <option>Price High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

}
