"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cancelBooking, getBookings } from "@/lib/api";
import { Booking } from "@/types/booking";
import BookingItem from "@/components/BookingItem";
import { 
  LayoutGrid, 
  Calendar, 
  Heart, 
  Wallet, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronRight,
  ChevronLeft,
  ArrowLeft
} from "lucide-react";
import Image from "next/image";

type TabType = "all" | "pending" | "cancelled" | "confirmed";

// Helper function to sort bookings by date (most recent first)
const sortBookingsByDate = (bookings: Booking[]): Booking[] => {
  return [...bookings].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB.getTime() - dateA.getTime(); // Most recent first
  });
};

// Hero Component
function Hero({
  title,
  subtitle,
  background = "/assets/bg.jpg",
}: {
  title: string;
  subtitle?: string;
  background?: string;
}) {
  return (
    <section
      className="relative h-56 w-full flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm text-white/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4; // Show only 4 bookings per page

  const load = () => {
    getBookings().then(bookings => {
      // Sort bookings by date (most recent first)
      const sortedBookings = sortBookingsByDate(bookings);
      setBookings(sortedBookings);
      // Reset to page 1 when bookings load or tab changes
      setCurrentPage(1);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const handleCancel = async (id: string) => {
    await cancelBooking(id);
    load();
  };

  const handleBack = () => {
    router.back();
  };

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true;
    if (activeTab === "confirmed") return booking.status === "CONFIRMED";
    if (activeTab === "cancelled") return booking.status === "CANCELLED";
    if (activeTab === "pending") return booking.status === "PENDING";
    return true;
  });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  // Count bookings by status
  const allCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
  const cancelledCount = bookings.filter((b) => b.status === "CANCELLED").length;
  const confirmedCount = bookings.filter((b) => b.status === "CONFIRMED").length;

  const tabs = [
    { id: "all", label: "All", count: allCount },
    { id: "pending", label: "Pending", count: pendingCount },
    { id: "cancelled", label: "Canceled", count: cancelledCount },
    { id: "confirmed", label: "Completed", count: confirmedCount },
  ];

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Reset to page 1 when tab changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero title="My Bookings" subtitle="Home > My Bookings" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button at the top */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit">
            {/* Profile */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/assets/p2.png"
                  alt="Rohit"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Rohit</h3>
              <p className="text-sm text-gray-500">Member Since Sep 2021</p>
            </div>

            {/* Menu */}
            <nav className="space-y-2">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <LayoutGrid size={20} />
                <span className="font-medium">Dashboard</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-white bg-[#C9507F] rounded-lg cursor-pointer"
              >
                <Calendar size={20} />
                <span className="font-medium">Bookings</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <Heart size={20} />
                <span className="font-medium">Favorites</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <Wallet size={20} />
                <span className="font-medium">Wallet</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <MessageSquare size={20} />
                <span className="font-medium">Reviews</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <MessageSquare size={20} />
                <span className="font-medium">Chat</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Settings size={20} />
                  <span className="font-medium">Settings</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <main>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              {/* Header with Tabs */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div className="flex gap-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id as TabType)}
                      className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                        activeTab === tab.id
                          ? "border-[#C9507F] text-gray-900 font-semibold"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Sort by</span>
                  <button className="flex items-center gap-1 font-medium text-gray-900 cursor-pointer">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Bookings List */}
              {currentBookings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No bookings found.</p>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  {currentBookings.map((booking) => (
                    <BookingItem
                      key={booking.id}
                      booking={booking}
                      onCancel={handleCancel}
                    />
                  ))}
                </div>
              )}

              {/* Pagination - Show only if there are bookings */}
              {filteredBookings.length > 0 && (
                <div className="flex items-center justify-center gap-2 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {/* Generate page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                        currentPage === page
                          ? "bg-[#C9507F] text-white border-[#C9507F]"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}