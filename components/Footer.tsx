"use client";

import Button from "./ui/Button";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { 
  FaTwitter,
  FaWhatsapp 
} from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr_1fr_1fr_1.2fr]">
          {/* Column 1 - Product */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">Features</li>
              <li className="hover:text-gray-900 cursor-pointer">Pricing</li>
              <li className="hover:text-gray-900 cursor-pointer">Case studies</li>
              <li className="hover:text-gray-900 cursor-pointer">Reviews</li>
              <li className="hover:text-gray-900 cursor-pointer">Updates</li>
            </ul>
          </div>

          {/* Column 2 - Support */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">Getting started</li>
              <li className="hover:text-gray-900 cursor-pointer">Help center</li>
              <li className="hover:text-gray-900 cursor-pointer">Server status</li>
              <li className="hover:text-gray-900 cursor-pointer">Report a bug</li>
              <li className="hover:text-gray-900 cursor-pointer">Chat support</li>
            </ul>
          </div>

          {/* Column 3 - For Provider */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-4">For Provider</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">About</li>
              <li className="hover:text-gray-900 cursor-pointer">Contact us</li>
              <li className="hover:text-gray-900 cursor-pointer">Careers</li>
              <li className="hover:text-gray-900 cursor-pointer">Faq's</li>
              <li className="hover:text-gray-900 cursor-pointer">Blog</li>
            </ul>
          </div>

          {/* Column 4 - Support (duplicate) */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">Getting started</li>
              <li className="hover:text-gray-900 cursor-pointer">Help center</li>
              <li className="hover:text-gray-900 cursor-pointer">Other Products</li>
              <li className="hover:text-gray-900 cursor-pointer">Report a bug</li>
              <li className="hover:text-gray-900 cursor-pointer">Chat support</li>
            </ul>
          </div>

          {/* Column 5 – Subscription */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-5">
              SignUp For Subscription
            </h4>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9507F] focus:border-transparent placeholder:text-gray-400"
            />
            <button 
              className="w-full bg-[#B56584] hover:bg-[#b8467] text-white font-medium py-3 rounded-lg mb-5 transition-colors"
            >
              Subscribe
            </button>

          
          </div>
            <div className="flex gap-2.5">
              <Image 
                src="/assets/apple.png" 
                alt="Download on App Store"
                width={135}
                height={45}
                className="h-11 w-auto cursor-pointer hover:opacity-90 transition-opacity" 
              />
              <Image 
                src="/assets/gpay.png" 
                alt="Get it on Google Play"
                width={135}
                height={45}
                className="h-11 w-auto cursor-pointer hover:opacity-90 transition-opacity" 
              />
            </div>
        </div>

        {/* Social Icons & Language/Currency */}
        <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-8">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} fill="white" />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={16} />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={16} />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white hover:bg-blue-800 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>

          {/* Language & Currency */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-lg">🇺🇸</span>
              <select className="border-none bg-transparent text-gray-700 cursor-pointer focus:outline-none">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            <div className="text-gray-300">|</div>

            <select className="border-none bg-transparent text-sm text-gray-700 cursor-pointer focus:outline-none">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>INR</option>
            </select>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
          <p>Copyright © 2025 - All Rights Reserved SalonWala</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900 hover:underline">Terms and Conditions</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-gray-900 hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}