import { Service } from "../types/service";
import { Booking } from "@/types/booking";

export const services: Service[] = [
 {
    id: "1",
    name: "Haircut",
    salonName: "Glow & Glam Studio",
    price: 500,
    duration: 30,
    rating: 4.9,
    location: "Maryland City, MD, USA"
  },
  {
    id: "2",
    name: "Beard Trim",
    salonName: "The Velvet Touch",
    price: 300,
    duration: 20,
    rating: 4.9,
    location: "New Jersey, USA"
  },
  {
    id: "3",
    name: "Hair Spa",
    salonName: "Aura Luxe Salon",
    price: 1200,
    duration: 60,
    rating: 4.5,
    location: "California, USA"
  },
  {
    id: "4",
    name: "Facial",
    salonName: "Makeup Nails",
    price: 900,
    duration: 45,
    rating: 4.8,
    location: "Texas, USA"
  },
  {
    id: "5",
    name: "Hair Color",
    salonName: "Opal Beauty Lounge",
    price: 1500,
    duration: 90,
    rating: 4.8,
    location: "Maryland, USA"
  },
  {
    id: "6",
    name: "Head Massage",
    salonName: "The Glam Society",
    price: 400,
    duration: 20,
    rating: 4.2,
    location: "Texas, USA"
  },
  {
    id: "7",
    name: "Keratin Treatment",
    salonName: "Crown & Curl",
    price: 2500,
    duration: 120,
    rating: 4.9,
    location: "Texas, USA"
  },
  {
    id: "8",
    name: "Manicure & Pedicure",
    salonName: "Bliss Beauty Bar",
    price: 700,
    duration: 50,
    rating: 4.7,
    location: "California, USA"
  },
];

export let bookings: Booking[] = [
  {
    id: "b1",
    userId: "123",
    serviceId: "1",
    serviceName: "Haircut",
    date: "2026-02-10",
    time: "11:00",
    status: "CONFIRMED",
  },
  {
    id: "b2",
    userId: "123",
    serviceId: "3",
    serviceName: "Hair Spa",
    date: "2026-02-15",
    time: "14:00",
    status: "PENDING",
  },
  {
    id: "b3",
    userId: "123",
    serviceId: "2",
    serviceName: "Beard Trim",
    date: "2026-02-08",
    time: "10:00",
    status: "CANCELLED",
  },
];