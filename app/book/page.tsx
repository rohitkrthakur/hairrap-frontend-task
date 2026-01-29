"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import Hero from "@/components/Hero";

function BookPageContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");

  return (
    <>
      <Hero title="Booking" subtitle="Home > Services > Booking" />
      
      <div className="py-8">
        <BookingForm preselectedServiceId={serviceId} />
      </div>
    </>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <Hero title="Booking" subtitle="Home > Services > Booking" />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9507F]"></div>
        </div>
      </div>
    }>
      <BookPageContent />
    </Suspense>
  );
}