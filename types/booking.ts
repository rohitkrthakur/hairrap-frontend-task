// types/booking.ts
export type BookingStatus = "CONFIRMED" | "CANCELLED" | "PENDING";

// types/booking.ts

export interface Booking {
  id: string;
  userId: string;
  
  // Service & Salon Info
  serviceId: string;
  serviceName: string;
  salonName?: string;
  salonImage?: string;
  salonLocation?: string;
  
  // User Details
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  
  // Booking Preferences
  gender?: string; // Choose Whom
  stylist?: string;
  preferredGender?: string; // Stylist gender preference
  serviceCategory?: string;
  
  // Date & Time
  date: string;
  time: string;
  
  // Additional Info
  note?: string;
  
  // Status
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  
  // Pricing (optional)
  price?: number;
  originalPrice?: number;
  discount?: number;
  
  // Timestamps
  createdAt?: string;
}