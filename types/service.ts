// types/service.ts

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  
  // Salon Details
  salonName?: string;
  salonImage?: string;
  salonLocation?: string;
  salonRating?: number;
  salonReviews?: number;
  
  // Service Details
  category?: string;
  description?: string;
  image?: string;
}