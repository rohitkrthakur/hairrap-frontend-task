import { NextResponse } from "next/server";
import { bookings } from "@/lib/mockData";
import { Booking } from "@/types/booking";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: bookings,
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  const newBooking: Booking = {
    id: `b${Date.now()}`,
    userId: body.userId,
    serviceId: body.serviceId,
    serviceName: body.serviceName,
    
    // Salon details
    salonName: body.salonName,
    salonImage: body.salonImage,
    salonLocation: body.salonLocation,
    
    // User details
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    
    // Booking preferences
    gender: body.gender,
    stylist: body.stylist,
    preferredGender: body.preferredGender,
    serviceCategory: body.serviceCategory,
    
    // Date & time
    date: body.date,
    time: body.time,
    note: body.note,
    
    // Pricing
    price: body.price,
    originalPrice: body.originalPrice,
    discount: body.discount,
    
    // Status
    status: "PENDING",
    
    // Timestamp
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);

  return NextResponse.json({
    success: true,
    message: "Booking created successfully",
    data: newBooking,
  });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { id } = body;

  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    return NextResponse.json(
      { success: false, message: "Booking not found" },
      { status: 404 }
    );
  }

  booking.status = "CANCELLED";

  return NextResponse.json({
    success: true,
    message: "Booking cancelled",
    data: booking,
  });
}