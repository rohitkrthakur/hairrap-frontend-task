// types/service.ts
export interface Service {
  id: string;
  name: string;  // This should be service name (e.g., "Haircut")
  salonName: string;  // Add this: salon name (e.g., "Glow & Glam Studio")
  price: number;
  duration: number;
  rating?: number;  // Optional: for star ratings
  location?: string;  // Optional: for address
}