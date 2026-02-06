// app/api/chat/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai/aiService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, context } = body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate AI response
    const aiResponse = await AIService.generateResponse(message, context);

    // Simulate processing time (remove in production)
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      data: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate response',
        message: 'Something went wrong. Please try again.'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Chat API is running',
    version: '1.0.0',
    endpoints: {
      POST: '/api/chat - Send message and get AI response'
    }
  });
}