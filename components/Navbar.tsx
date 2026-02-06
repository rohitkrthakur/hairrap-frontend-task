"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Lock, UserPlus, X, MessageCircle } from "lucide-react";
import { HiMenuAlt3 } from "react-icons/hi";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "AI Assistant", href: "/assistant" }, // NEW
    { name: "Bookings", href: "/bookings" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-50">
            <Image 
              src="/assets/logo.jpg" 
              width={180} 
              height={40}
              alt="Hair Rap By Yoyo" 
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-base font-medium absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-1 transition-colors ${
                  item.name === "AI Assistant"
                    ? "text-[#C9507F] hover:text-[#b8467] font-semibold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.name === "AI Assistant" && (
                  <MessageCircle size={16} />
                )}
                {item.name}
                {item.name !== "AI Assistant" && (
                  <ChevronDown size={16} className="text-gray-500" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-md border border-red-700 px-5 py-2 text-sm font-medium text-red-700 hover:bg-red-50 transition-colors">
              <Lock size={16} />
              Login
            </button>
            <button className="flex items-center gap-2 rounded-md bg-[#C9507F] px-5 py-2 text-sm font-medium text-white hover:bg-[#b8467] transition-colors">
              <UserPlus size={16} />
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900 z-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={28} />
            ) : (
              <HiMenuAlt3 size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Mobile Nav Links */}
          <nav className="flex flex-col space-y-1 mb-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${
                  item.name === "AI Assistant"
                    ? "bg-gradient-to-r from-purple-50 to-pink-50 text-[#C9507F] font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.name === "AI Assistant" && (
                    <MessageCircle size={18} />
                  )}
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.name !== "AI Assistant" && (
                  <ChevronDown size={16} className="text-gray-500" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="space-y-3 mt-auto mb-8">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-red-700 px-5 py-3 text-base font-medium text-red-700 hover:bg-red-50 transition-colors"
            >
              <Lock size={18} />
              Login
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#C9507F] px-5 py-3 text-base font-medium text-white hover:bg-[#b8467] transition-colors"
            >
              <UserPlus size={18} />
              Register
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}