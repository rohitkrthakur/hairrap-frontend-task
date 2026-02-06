"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOpenFullChat = () => {
    router.push("/assistant");
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50 group"
        >
          <MessageCircle size={24} className="text-white group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      )}

      {/* Mini Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">AI Assistant</p>
                <p className="text-xs text-white text-opacity-80">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {/* AI Message */}
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
                  <p className="text-sm text-gray-900">
                    Hey! How can I assist you today? 👋
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Just now</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500">Quick actions:</p>
                <button
                  onClick={handleOpenFullChat}
                  className="w-full text-left p-3 bg-white hover:bg-gray-100 rounded-xl transition-colors text-sm"
                >
                  ✂️ Book an Appointment
                </button>
                <button
                  onClick={handleOpenFullChat}
                  className="w-full text-left p-3 bg-white hover:bg-gray-100 rounded-xl transition-colors text-sm"
                >
                  👑 Explore Services
                </button>
                <button
                  onClick={handleOpenFullChat}
                  className="w-full text-left p-3 bg-white hover:bg-gray-100 rounded-xl transition-colors text-sm"
                >
                  📋 My Bookings
                </button>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <input
                type="text"
                placeholder="Type your message..."
                onClick={handleOpenFullChat}
                className="flex-1 bg-transparent border-none outline-none text-sm"
                readOnly
              />
              <button
                onClick={handleOpenFullChat}
                className="p-2 bg-[#C9507F] hover:bg-[#b8467] rounded-lg transition-colors"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
            <button
              onClick={handleOpenFullChat}
              className="w-full mt-2 text-xs text-[#C9507F] hover:text-[#b8467] font-medium"
            >
              Open full chat →
            </button>
          </div>
        </div>
      )}
    </>
  );
}