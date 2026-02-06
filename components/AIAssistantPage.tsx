"use client";

import { useState, useRef, useEffect } from "react";
import { IoSend, IoMicOutline, IoSettingsOutline, IoAddOutline, IoPersonCircleOutline, IoCheckmarkCircle } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi2";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  type: "user" | "ai" | "notification";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  bookingDetails?: {
    service: string;
    date: string;
    time: string;
  };
}

interface BookingState {
  step: 'idle' | 'selecting_service' | 'selecting_date' | 'selecting_time' | 'complete';
  service?: string;
  date?: string;
  time?: string;
}

interface ChatHistory {
  id: string;
  title: string;
  description: string;
  date: string;
}

export default function AIAssistantPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hey! How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [bookingState, setBookingState] = useState<BookingState>({ step: 'idle' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatHistory: ChatHistory[] = [
    {
      id: "1",
      title: "Wellness Coach",
      description: "Hair & scalp care tips for today",
      date: "Today",
    },
    {
      id: "2",
      title: "Explore Services",
      description: "Prices, duration & service details",
      date: "Today",
    },
    {
      id: "3",
      title: "Salon Products",
      description: "Hair care, beard care & styling products",
      date: "Today",
    },
    {
      id: "4",
      title: "Offers & Memberships",
      description: "Current deals, packages & loyalty plans",
      date: "Today",
    },
    {
      id: "5",
      title: "My Appointments",
      description: "View, reschedule or cancel bookings",
      date: "Yesterday",
    },
  ];

  const quickActions = [
    {
      icon: "✂️",
      title: "Book an Appointment",
      description: "Haircut, styling, spa & more",
      action: () => handleQuickQuestion("I want to book an appointment"),
    },
    {
      icon: "👑",
      title: "Explore Services",
      description: "Prices, duration & details",
      action: () => handleQuickQuestion("Show me all services"),
    },
    {
      icon: "💆",
      title: "Salon Products",
      description: "Hair care & styling products",
      action: () => handleQuickQuestion("Show me salon products"),
    },
    {
      icon: "📋",
      title: "My Bookings",
      description: "View, reschedule or cancel",
      action: () => router.push("/bookings"),
    },
    {
      icon: "💬",
      title: "Talk to Expert",
      description: "Hair & skin consultation",
      action: () => handleQuickQuestion("I need expert consultation"),
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, type: "user" | "ai", suggestions?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      suggestions,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleConversationalBooking = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();

    // Step 1: User wants to book
    if (bookingState.step === 'idle' && (lowerInput.includes('book') || lowerInput.includes('appointment'))) {
      setBookingState({ step: 'selecting_service' });
      
      setTimeout(() => {
        addMessage(
          "Great! I'd love to help you book an appointment. 😊\n\nWhich service would you like to book?",
          "ai",
          ["Haircut", "Hair Spa", "Facial", "Beard Trim", "Hair Color"]
        );
        setIsTyping(false);
      }, 800);
      return true;
    }

    // Step 2: User selects service
    if (bookingState.step === 'selecting_service') {
      const services = ['haircut', 'hair spa', 'facial', 'beard trim', 'hair color', 'manicure', 'massage', 'keratin'];
      const selectedService = services.find(s => lowerInput.includes(s));
      
      if (selectedService) {
        const serviceFormatted = selectedService.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        setBookingState({ ...bookingState, step: 'selecting_date', service: serviceFormatted });
        
        setTimeout(() => {
          addMessage(
            `Perfect! ${serviceFormatted} is an excellent choice! 💇\n\nWhen would you like to come in?`,
            "ai",
            ["Today", "Tomorrow", "This Weekend"]
          );
          setIsTyping(false);
        }, 800);
        return true;
      }
    }

    // Step 3: User selects date
    if (bookingState.step === 'selecting_date') {
      let selectedDate = "";
      
      if (lowerInput.includes('today')) {
        selectedDate = new Date().toISOString().split('T')[0];
      } else if (lowerInput.includes('tomorrow')) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        selectedDate = tomorrow.toISOString().split('T')[0];
      } else if (lowerInput.includes('weekend')) {
        const saturday = new Date();
        saturday.setDate(saturday.getDate() + (6 - saturday.getDay()));
        selectedDate = saturday.toISOString().split('T')[0];
      }

      if (selectedDate) {
        setBookingState({ ...bookingState, step: 'selecting_time', date: selectedDate });
        
        setTimeout(() => {
          const dateFormatted = new Date(selectedDate).toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          });
          
          addMessage(
            `Great choice! 📅\n\n${dateFormatted} works perfectly. What time would be best for you?`,
            "ai",
            ["10:00 AM", "11:30 AM", "2:00 PM", "4:00 PM", "6:30 PM"]
          );
          setIsTyping(false);
        }, 800);
        return true;
      }
    }

    // Step 4: User selects time - COMPLETE BOOKING
    if (bookingState.step === 'selecting_time') {
      const timeRegex = /(\d{1,2}):?(\d{2})?\s*(am|pm)/i;
      const match = lowerInput.match(timeRegex);
      
      if (match) {
        const selectedTime = match[0];
        
        setTimeout(() => {
          addMessage(
            `Awesome! Let me confirm that for you... ⏳`,
            "ai"
          );
          
          // Show booking confirmation after 1 second
          setTimeout(() => {
            const bookingNotification: Message = {
              id: Date.now().toString(),
              type: "notification",
              content: "Thanks for booking!",
              timestamp: new Date(),
              bookingDetails: {
                service: bookingState.service!,
                date: bookingState.date!,
                time: selectedTime,
              },
            };
            
            setMessages((prev) => [...prev, bookingNotification]);
            
            // Reset booking state
            setBookingState({ step: 'idle' });
            
            // Ask if they need anything else
            setTimeout(() => {
              addMessage(
                "Your appointment is all set! 🎉\n\nIs there anything else I can help you with?",
                "ai",
                ["Book another appointment", "View my bookings", "Ask a question"]
              );
            }, 500);
          }, 1000);
          
          setIsTyping(false);
        }, 800);
        return true;
      }
    }

    return false;
  };

  const generateNormalResponse = (input: string): { response: string, suggestions?: string[] } => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('service') || lowerInput.includes('price') || lowerInput.includes('what do you offer')) {
      return {
        response: "We offer 8 premium salon services:\n\n💇 Hair Services:\n• Haircut - ₹500 (30 mins)\n• Beard Trim - ₹300 (20 mins)\n• Hair Color - ₹1500 (90 mins)\n• Hair Spa - ₹1200 (60 mins)\n\n✨ Special Treatments:\n• Facial - ₹900 (45 mins)\n• Head Massage - ₹400 (20 mins)\n• Keratin Treatment - ₹2500 (120 mins)\n• Manicure & Pedicure - ₹700 (50 mins)\n\nWhich service interests you?",
        suggestions: ["Book Haircut", "Book Hair Spa", "Book Facial"]
      };
    }

    if (lowerInput.includes('product')) {
      return {
        response: "We offer premium salon products:\n\n🧴 Hair Care:\n• Professional shampoos & conditioners\n• Hair oils & serums\n• Hair masks & treatments\n\n💈 Beard Care:\n• Beard oils & balms\n• Grooming kits\n\n💇 Styling:\n• Hair gels & waxes\n• Styling sprays\n\nAll products are available at our salons!",
        suggestions: ["See prices", "Book appointment"]
      };
    }

    if (lowerInput.includes('expert') || lowerInput.includes('consultation')) {
      return {
        response: "Our expert stylists offer personalized consultations! 👨‍💼\n\nWe can help with:\n• Hair & scalp analysis\n• Style recommendations\n• Product suggestions\n• Treatment plans\n• Color consultation\n\nConsultations are complimentary with any service booking.\n\nWould you like to book a consultation?",
        suggestions: ["Book consultation", "Tell me more", "See expert profiles"]
      };
    }

    if (lowerInput.includes('cancel')) {
      return {
        response: "To cancel your booking:\n\n1. Go to 'My Bookings' page\n2. Find your pending booking\n3. Click the 'Cancel' button\n4. Confirm cancellation\n\nWould you like me to take you to your bookings?",
        suggestions: ["Go to My Bookings", "Contact support"]
      };
    }

    if (lowerInput.includes('location') || lowerInput.includes('where')) {
      return {
        response: "We have salons at:\n\n📍 Maryland City, MD, USA - 4.9⭐\n📍 New Jersey, USA - 4.7⭐\n📍 California, USA - 4.5⭐\n📍 Texas, USA - 4.8⭐\n\nWhich location would you like to visit?",
        suggestions: ["Book at Maryland", "See all locations"]
      };
    }

    return {
      response: "I'm your salon booking assistant! 😊\n\nI can help you with:\n• Booking appointments\n• Exploring services\n• Product information\n• Expert consultations\n• Finding locations\n\nWhat would you like to know?",
      suggestions: ["Book appointment", "See services", "View locations"]
    };
  };

  const handleQuickQuestion = async (question: string) => {
    addMessage(question, "user");
    setIsTyping(true);

    // Check if it's a booking conversation
    const isBookingFlow = handleConversationalBooking(question);
    
    if (!isBookingFlow) {
      // Normal response
      setTimeout(() => {
        const { response, suggestions } = generateNormalResponse(question);
        addMessage(response, "ai", suggestions);
        setIsTyping(false);
      }, 800);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input;
    addMessage(userInput, "user");
    setInput("");
    setIsTyping(true);

    // Check if it's a booking conversation
    const isBookingFlow = handleConversationalBooking(userInput);
    
    if (!isBookingFlow) {
      // Normal response
      setTimeout(() => {
        const { response, suggestions } = generateNormalResponse(userInput);
        addMessage(response, "ai", suggestions);
        setIsTyping(false);
      }, 800);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleQuickQuestion(suggestion);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Desktop: Fixed, Mobile: Overlay */}
      <div
        className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:static
          inset-y-0 left-0
          z-50 lg:z-0
          w-64 bg-white border-r border-gray-200 
          flex flex-col flex-shrink-0
          transition-transform duration-300 ease-in-out
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0 flex items-center justify-between">
          <Image
            src="/assets/logo.jpg"
            alt="Logo"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
          {/* Close button for mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={() => {
            setMessages([{
              id: "1",
              type: "ai",
              content: "Hey! How can I assist you today?",
              timestamp: new Date(),
            }]);
            setBookingState({ step: 'idle' });
            setIsSidebarOpen(false);
          }}
          className="m-4 flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
        >
          <IoAddOutline size={20} />
          <span className="font-medium">New Chat</span>
        </button>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-3 font-medium">Chat History</p>
            <p className="text-xs text-gray-400 mb-2">Today</p>
            <div className="space-y-2">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {chat.title}
                  </p>
                  <p className="text-xs text-gray-500">{chat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar - FIXED */}
        <div className="h-14 lg:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 gap-4 flex-shrink-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Title for mobile */}
          <h1 className="lg:hidden text-lg font-semibold text-gray-900">AI Assistant</h1>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <IoSettingsOutline size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <IoPersonCircleOutline size={20} className="text-white" />
              </div>
            </button>
          </div>
        </div>

        {/* Messages Area - SCROLLABLE ONLY */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Message - Only when no conversation */}
            {messages.length === 1 && (
              <>
                <div className="text-center mb-6 lg:mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
                    <HiSparkles className="text-white text-3xl lg:text-4xl" />
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Hey! How can I assist you today?
                  </h1>
                  <p className="text-sm lg:text-base text-gray-600">
                    Ask me anything about bookings, services, or salon products
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="mb-6 lg:mb-8">
                  <p className="text-xs lg:text-sm text-gray-500 mb-4">Browse help topics</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        className="p-3 lg:p-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-left transition-colors cursor-pointer"
                      >
                        <div className="text-2xl lg:text-3xl mb-2">{action.icon}</div>
                        <p className="text-sm lg:text-base font-semibold text-gray-900 mb-1">
                          {action.title}
                        </p>
                        <p className="text-xs lg:text-sm text-gray-600">{action.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Messages */}
            <div className="space-y-4">
              {messages.slice(1).map((message) => (
                <div key={message.id}>
                  {/* Booking Notification */}
                  {message.type === "notification" && message.bookingDetails && (
                    <div className="flex justify-center mb-4">
                      <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-4 lg:p-6 max-w-md w-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <IoCheckmarkCircle size={24} className="text-white lg:w-7 lg:h-7" />
                          </div>
                          <div>
                            <h3 className="text-lg lg:text-xl font-bold text-green-800">
                              {message.content}
                            </h3>
                            <p className="text-xs lg:text-sm text-green-600">
                              Your appointment has been confirmed
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-3 lg:p-4 space-y-2 lg:space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs lg:text-sm text-gray-600">Service</span>
                            <span className="text-sm lg:text-base font-semibold text-gray-900">
                              {message.bookingDetails.service}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs lg:text-sm text-gray-600">Date</span>
                            <span className="text-sm lg:text-base font-semibold text-gray-900">
                              {new Date(message.bookingDetails.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs lg:text-sm text-gray-600">Time</span>
                            <span className="text-sm lg:text-base font-semibold text-gray-900">
                              {message.bookingDetails.time}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => router.push("/bookings")}
                          className="w-full mt-3 lg:mt-4 bg-green-500 hover:bg-green-600 text-white text-sm lg:text-base font-medium py-2.5 lg:py-3 rounded-lg transition-colors cursor-pointer"
                        >
                          View My Bookings
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Regular Messages */}
                  {message.type !== "notification" && (
                    <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] lg:max-w-[70%] rounded-2xl px-3 lg:px-4 py-2 lg:py-3 ${
                          message.type === "user"
                            ? "bg-[#C9507F] text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-xs lg:text-sm whitespace-pre-line">{message.content}</p>
                        <p
                          className={`text-[10px] lg:text-xs mt-1 ${
                            message.type === "user" ? "text-pink-100" : "text-gray-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Suggestions */}
                  {message.suggestions && message.type === "ai" && (
                    <div className="flex gap-2 mt-2 ml-2 flex-wrap">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-2.5 lg:px-3 py-1 lg:py-1.5 bg-white border border-gray-200 hover:border-[#C9507F] rounded-full text-[11px] lg:text-xs text-gray-700 hover:text-[#C9507F] transition-colors cursor-pointer"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-3 lg:px-4 py-2 lg:py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area - FIXED */}
        <div className="bg-white border-t border-gray-200 p-3 lg:p-4 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 lg:gap-3 bg-gray-100 rounded-xl px-3 lg:px-4 py-2 lg:py-3">
              <button className="p-1.5 lg:p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer flex-shrink-0">
                <IoAddOutline size={18} className="lg:w-5 lg:h-5 text-gray-600" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1 bg-transparent border-none outline-none text-sm lg:text-base text-gray-900 placeholder-gray-500 disabled:opacity-50 min-w-0"
              />

              <button className="p-1.5 lg:p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer flex-shrink-0">
                <IoMicOutline size={18} className="lg:w-5 lg:h-5 text-gray-600" />
              </button>

              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-1.5 lg:p-2 bg-[#C9507F] hover:bg-[#b8467] disabled:bg-gray-300 rounded-lg transition-colors cursor-pointer flex-shrink-0"
              >
                <IoSend size={18} className="lg:w-5 lg:h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}