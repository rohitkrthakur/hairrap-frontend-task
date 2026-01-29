import axios from "axios";
import { Service } from "@/types/service";
import { Booking } from "@/types/booking";

const api = axios.create({
  baseURL: "/api",
});

export const getServices = async (): Promise<Service[]> => {
  const res = await api.get("/services");
  return res.data.data;
};

export const getBookings = async (): Promise<Booking[]> => {
  const res = await api.get("/bookings");
  return res.data.data;
};

export const createBooking = async (payload: {
  userId: string;
  serviceId: string;
  serviceName: string;
  salonName?: string; // ✅ ADD THIS LINE
  date: string;
  time: string;
  note?: string;
}) => {
  const res = await api.post("/bookings", payload);
  return res.data;
};

export const cancelBooking = async (id: string) => {
  const res = await api.patch("/bookings", { id });
  return res.data;
};