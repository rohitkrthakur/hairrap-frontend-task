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
    salonName: body.salonName, // ✅ ADD THIS LINE
    date: body.date,
    time: body.time,
    note: body.note,
    status: "PENDING",
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