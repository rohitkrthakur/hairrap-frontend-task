import { Booking } from "@/types/booking";
import Button from "./ui/Button";
import { ChevronRight } from "lucide-react";

interface Props {
  booking: Booking;
  onCancel: (id: string) => void;
}

export default function BookingItem({ booking, onCancel }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-50 text-green-600 border-green-200";
      case "CANCELLED":
        return "bg-red-50 text-red-600 border-red-200";
      case "PENDING":
        return "bg-orange-50 text-orange-600 border-orange-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    if (status === "CONFIRMED") return "Completed";
    if (status === "CANCELLED") return "Canceled";
    return status;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 w-5 h-5 rounded border-gray-300 text-[#C9507F] focus:ring-[#C9507F]"
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-base mb-1">
              {booking.serviceName}
            </h3>
            <p className="text-sm text-gray-500"># {booking.id}</p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            booking.status
          )}`}
        >
          {getStatusText(booking.status)}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-xs text-gray-500 mb-1">Booking Date</p>
            <p className="text-sm font-medium text-gray-900">
              {booking.date} • {booking.time}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Total paid</p>
            <p className="text-sm font-semibold text-gray-900">₹459</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {booking.status === "CONFIRMED" && (
            <Button
              variant="secondary"
              onClick={() => onCancel(booking.id)}
              className="text-sm"
            >
              Cancel
            </Button>
          )}
          <button className="flex items-center gap-1 text-sm font-medium text-[#C9507F] hover:text-[#b8467] transition-colors">
            Booking Details
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}