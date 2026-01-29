// types/booking.ts
export type BookingStatus = "CONFIRMED" | "CANCELLED" | "PENDING";

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  salonName?: string; // ✅ ADD THIS LINE
  date: string; // ISO 8601 format
  time: string; // e.g., "14:30"
  note?: string;
  status: BookingStatus;
}