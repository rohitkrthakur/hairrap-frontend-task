// lib/ai/aiService.ts

interface AIResponse {
  response: string;
  suggestions?: string[];
  actions?: {
    type: 'navigate' | 'book' | 'show_slots';
    data?: any;
  }[];
}

/**
 * AI Service - Handles all AI-related logic
 * This can be easily swapped with OpenAI/Gemini in the future
 */
export class AIService {
  /**
   * Generate AI response based on user input
   */
  static async generateResponse(userMessage: string, context?: any): Promise<AIResponse> {
    const lowerMessage = userMessage.toLowerCase();

    // Booking Intent
    if (this.hasBookingIntent(lowerMessage)) {
      return this.handleBookingIntent(lowerMessage);
    }

    // Service Information
    if (this.hasServiceIntent(lowerMessage)) {
      return this.handleServiceIntent(lowerMessage);
    }

    // Availability Check
    if (this.hasAvailabilityIntent(lowerMessage)) {
      return this.handleAvailabilityIntent(lowerMessage);
    }

    // Cancellation Help
    if (this.hasCancellationIntent(lowerMessage)) {
      return this.handleCancellationIntent();
    }

    // Product Information
    if (this.hasProductIntent(lowerMessage)) {
      return this.handleProductIntent();
    }

    // Expert Consultation
    if (this.hasConsultationIntent(lowerMessage)) {
      return this.handleConsultationIntent();
    }

    // Location Information
    if (this.hasLocationIntent(lowerMessage)) {
      return this.handleLocationIntent();
    }

    // Pricing Information
    if (this.hasPricingIntent(lowerMessage)) {
      return this.handlePricingIntent(lowerMessage);
    }

    // Default helpful response
    return this.getDefaultResponse();
  }

  // Intent Detection Methods
  private static hasBookingIntent(msg: string): boolean {
    return msg.includes('book') || msg.includes('appointment') || 
           msg.includes('schedule') || msg.includes('reserve');
  }

  private static hasServiceIntent(msg: string): boolean {
    return msg.includes('service') || msg.includes('what do you offer') ||
           msg.includes('what can i get');
  }

  private static hasAvailabilityIntent(msg: string): boolean {
    return msg.includes('available') || msg.includes('slot') || 
           msg.includes('time') || msg.includes('when');
  }

  private static hasCancellationIntent(msg: string): boolean {
    return msg.includes('cancel') || msg.includes('refund') ||
           msg.includes('reschedule');
  }

  private static hasProductIntent(msg: string): boolean {
    return msg.includes('product') || msg.includes('buy') ||
           msg.includes('purchase') || msg.includes('shop');
  }

  private static hasConsultationIntent(msg: string): boolean {
    return msg.includes('expert') || msg.includes('consultation') ||
           msg.includes('advice') || msg.includes('help with style');
  }

  private static hasLocationIntent(msg: string): boolean {
    return msg.includes('location') || msg.includes('where') ||
           msg.includes('address') || msg.includes('branch');
  }

  private static hasPricingIntent(msg: string): boolean {
    return msg.includes('price') || msg.includes('cost') ||
           msg.includes('how much') || msg.includes('rate');
  }

  // Response Handlers
  private static handleBookingIntent(msg: string): AIResponse {
    return {
      response: "I can help you book an appointment! We offer various services:\n\n" +
                "• Haircut - ₹500 (30 mins)\n" +
                "• Beard Trim - ₹300 (20 mins)\n" +
                "• Hair Spa - ₹1200 (60 mins)\n" +
                "• Facial - ₹900 (45 mins)\n" +
                "• Hair Color - ₹1500 (90 mins)\n\n" +
                "Would you like to see available time slots?",
      suggestions: ["Show available slots", "Tell me more about Hair Spa", "Book Haircut"],
      actions: [
        { type: 'navigate', data: { url: '/services' } }
      ]
    };
  }

  private static handleServiceIntent(msg: string): AIResponse {
    return {
      response: "We offer 8 premium salon services:\n\n" +
                "💇 Hair Services:\n" +
                "• Haircut - ₹500 (30 mins)\n" +
                "• Beard Trim - ₹300 (20 mins)\n" +
                "• Hair Color - ₹1500 (90 mins)\n" +
                "• Hair Spa - ₹1200 (60 mins)\n\n" +
                "✨ Special Treatments:\n" +
                "• Facial - ₹900 (45 mins)\n" +
                "• Head Massage - ₹400 (20 mins)\n" +
                "• Keratin Treatment - ₹2500 (120 mins)\n" +
                "• Manicure & Pedicure - ₹700 (50 mins)\n\n" +
                "Which service interests you?",
      suggestions: ["Book now", "Show prices", "Check availability"],
      actions: [
        { type: 'navigate', data: { url: '/services' } }
      ]
    };
  }

  private static handleAvailabilityIntent(msg: string): AIResponse {
    const today = new Date();
    const slots = this.getAvailableSlots(today);
    
    return {
      response: `We have the following slots available today (${today.toLocaleDateString()}):\n\n` +
                slots.map(slot => `• ${slot}`).join('\n') +
                "\n\nWhich time works best for you?",
      suggestions: ["Book 10:00 AM", "Book 2:00 PM", "Show tomorrow's slots"],
      actions: [
        { type: 'show_slots', data: { date: today, slots } }
      ]
    };
  }

  private static handleCancellationIntent(): AIResponse {
    return {
      response: "To cancel your booking:\n\n" +
                "1. Go to 'My Bookings' page\n" +
                "2. Find your pending booking\n" +
                "3. Click the 'Cancel' button\n" +
                "4. Confirm cancellation\n\n" +
                "Note: You can only cancel pending bookings. Confirmed bookings may require contacting us.\n\n" +
                "Would you like me to take you to your bookings?",
      suggestions: ["Go to My Bookings", "Contact support", "View cancellation policy"],
      actions: [
        { type: 'navigate', data: { url: '/bookings' } }
      ]
    };
  }

  private static handleProductIntent(): AIResponse {
    return {
      response: "We offer premium salon products:\n\n" +
                "🧴 Hair Care:\n" +
                "• Professional shampoos & conditioners\n" +
                "• Hair oils & serums\n" +
                "• Hair masks & treatments\n\n" +
                "💈 Beard Care:\n" +
                "• Beard oils & balms\n" +
                "• Grooming kits\n\n" +
                "💇 Styling:\n" +
                "• Hair gels & waxes\n" +
                "• Styling sprays\n" +
                "• Heat protection products\n\n" +
                "All products are available for purchase at our salons!",
      suggestions: ["See all products", "Book appointment", "Ask about specific product"]
    };
  }

  private static handleConsultationIntent(): AIResponse {
    return {
      response: "Our expert stylists offer personalized consultations! 👨‍💼\n\n" +
                "We can help with:\n" +
                "• Hair & scalp analysis\n" +
                "• Style recommendations based on face shape\n" +
                "• Product suggestions for your hair type\n" +
                "• Treatment plans for hair concerns\n" +
                "• Color consultation\n\n" +
                "Consultations are complimentary with any service booking.\n\n" +
                "Would you like to book a consultation?",
      suggestions: ["Book consultation", "Tell me more", "See expert profiles"],
      actions: [
        { type: 'navigate', data: { url: '/services' } }
      ]
    };
  }

  private static handleLocationIntent(): AIResponse {
    return {
      response: "We have salons at the following locations:\n\n" +
                "📍 Maryland City, MD, USA\n" +
                "   Glow & Glam Studio\n" +
                "   Rating: 4.9 ⭐ (255 reviews)\n\n" +
                "📍 New Jersey, USA\n" +
                "   The Velvet Touch\n" +
                "   Rating: 4.7 ⭐ (180 reviews)\n\n" +
                "📍 California, USA\n" +
                "   Aura Luxe Salon\n" +
                "   Rating: 4.5 ⭐ (320 reviews)\n\n" +
                "📍 Texas, USA\n" +
                "   Multiple locations\n" +
                "   Rating: 4.8 ⭐ (280 reviews)\n\n" +
                "Which location would you like to visit?",
      suggestions: ["Book at Maryland", "Book at California", "See all locations"]
    };
  }

  private static handlePricingIntent(msg: string): AIResponse {
    return {
      response: "Here's our complete pricing:\n\n" +
                "💇 Basic Services:\n" +
                "• Haircut - ₹500\n" +
                "• Beard Trim - ₹300\n" +
                "• Head Massage - ₹400\n\n" +
                "✨ Premium Services:\n" +
                "• Hair Spa - ₹1200\n" +
                "• Facial - ₹900\n" +
                "• Manicure & Pedicure - ₹700\n\n" +
                "🌟 Special Treatments:\n" +
                "• Hair Color - ₹1500\n" +
                "• Keratin Treatment - ₹2500\n\n" +
                "💰 We also offer package deals with 20-30% discounts!\n\n" +
                "Interested in any specific service?",
      suggestions: ["See packages", "Book service", "Compare prices"]
    };
  }

  private static getDefaultResponse(): AIResponse {
    return {
      response: "I'm your salon booking assistant! I can help you with:\n\n" +
                "📅 Booking appointments\n" +
                "💇 Exploring our services\n" +
                "⏰ Checking available time slots\n" +
                "❌ Canceling or rescheduling bookings\n" +
                "🛍️ Product information\n" +
                "👨‍💼 Expert consultations\n" +
                "📍 Finding our locations\n" +
                "💰 Pricing details\n\n" +
                "What would you like to know?",
      suggestions: ["Book appointment", "See services", "Check availability", "View locations"]
    };
  }

  // Helper Methods
  private static getAvailableSlots(date: Date): string[] {
    // In a real app, this would check actual availability from backend
    return [
      "10:00 AM",
      "11:30 AM",
      "2:00 PM",
      "4:00 PM",
      "6:30 PM"
    ];
  }

  /**
   * Get contextual response based on conversation history
   */
  static getContextualResponse(messages: any[]): string {
    // Analyze conversation flow for better context
    if (messages.length < 2) return "";
    
    const lastUserMessage = messages[messages.length - 1];
    const context = messages.slice(-5); // Last 5 messages
    
    // Add contextual intelligence here
    return "";
  }
}