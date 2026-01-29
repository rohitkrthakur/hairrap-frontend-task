"use client";

import { useSearchParams } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import Hero from "@/components/Hero";

export default function BookPage() {
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