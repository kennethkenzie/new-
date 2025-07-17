import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In-memory storage for conversation history (in production, use a database)
const conversationHistory = new Map();

// Multi-language support
const TRANSLATIONS = {
  en: {
    welcomeMessage: "Hello! I'm your hotel assistant. How can I help you today?",
    systemPrompt: "You are a helpful hotel assistant for La Brezi Suites. You can help with room bookings, hotel information, amenities, and general inquiries. Always be polite and professional.",
    bookingPrompt: "I can help you book a room. Let me check availability for your dates.",
    errorMessage: "I apologize, but I'm having trouble processing your request. Please try again."
  },
  es: {
    welcomeMessage: "¡Hola! Soy su asistente del hotel. ¿Cómo puedo ayudarle hoy?",
    systemPrompt: "Eres un asistente útil del hotel La Brezi Suites. Puedes ayudar con reservas de habitaciones, información del hotel, amenidades e consultas generales. Siempre sé cortés y profesional.",
    bookingPrompt: "Puedo ayudarte a reservar una habitación. Déjame verificar disponibilidad para tus fechas.",
    errorMessage: "Me disculpo, pero tengo problemas para procesar tu solicitud. Por favor, inténtalo de nuevo."
  },
  fr: {
    welcomeMessage: "Bonjour! Je suis votre assistant hôtel. Comment puis-je vous aider aujourd'hui?",
    systemPrompt: "Vous êtes un assistant hôtelier utile pour La Brezi Suites. Vous pouvez aider avec les réservations de chambres, les informations sur l'hôtel, les commodités et les demandes générales. Soyez toujours poli et professionnel.",
    bookingPrompt: "Je peux vous aider à réserver une chambre. Laissez-moi vérifier la disponibilité pour vos dates.",
    errorMessage: "Je m'excuse, mais j'ai des difficultés à traiter votre demande. Veuillez réessayer."
  },
  de: {
    welcomeMessage: "Hallo! Ich bin Ihr Hotel-Assistent. Wie kann ich Ihnen heute helfen?",
    systemPrompt: "Sie sind ein hilfreicher Hotel-Assistent für La Brezi Suites. Sie können bei Zimmerbuchungen, Hotelinformationen, Annehmlichkeiten und allgemeinen Anfragen helfen. Seien Sie immer höflich und professionell.",
    bookingPrompt: "Ich kann Ihnen bei der Zimmerbuchung helfen. Lassen Sie mich die Verfügbarkeit für Ihre Daten prüfen.",
    errorMessage: "Entschuldigung, aber ich habe Schwierigkeiten, Ihre Anfrage zu bearbeiten. Bitte versuchen Sie es erneut."
  }
};

export async function POST(request) {
  try {
    const { message, sessionId, language = 'en' } = await request.json();
    
    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400 }
      );
    }

    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;
    
    // Get or create conversation history for this session
    if (!conversationHistory.has(sessionId)) {
      conversationHistory.set(sessionId, [
        {
          role: 'system',
          content: `${translations.systemPrompt}

Hotel Information:
- Hotel Name: La Brezi Suites
- Location: Premium location with Southern California vibe
- Rooms: Double Room ($278/night), Twin Suite ($499/night), Executive Suite ($599/night)
- Amenities: Wellness & Restoration, Meditative Retreats, Coastal Beach Cuisine, Curated Experiences, African Inspired Events
- Services: Spa, Restaurant, Room Service, Concierge

If user asks about booking, check availability and guide them through the booking process.
If user asks about prices or rooms, provide specific information about our room types.
Respond in ${language === 'en' ? 'English' : language === 'es' ? 'Spanish' : language === 'fr' ? 'French' : 'German'}.`
        }
      ]);
    }

    const history = conversationHistory.get(sessionId);
    
    // Add user message to history
    history.push({ role: 'user', content: message });
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: history,
      max_tokens: 500,
      temperature: 0.7,
    });

    const assistantResponse = completion.choices[0].message.content;
    
    // Add assistant response to history
    history.push({ role: 'assistant', content: assistantResponse });
    
    // Keep conversation history manageable (last 20 messages)
    if (history.length > 21) {
      history.splice(1, 2); // Remove oldest user/assistant pair, keep system message
    }
    
    // Check if user is asking about booking
    const isBookingIntent = message.toLowerCase().includes('book') || 
                           message.toLowerCase().includes('reserve') ||
                           message.toLowerCase().includes('availability') ||
                           message.toLowerCase().includes('dates');

    return NextResponse.json({
      response: assistantResponse,
      sessionId,
      isBookingIntent,
      suggestions: isBookingIntent ? [
        language === 'es' ? 'Verificar disponibilidad' : 
        language === 'fr' ? 'Vérifier la disponibilité' : 
        language === 'de' ? 'Verfügbarkeit prüfen' : 'Check availability',
        language === 'es' ? 'Ver habitaciones' : 
        language === 'fr' ? 'Voir les chambres' : 
        language === 'de' ? 'Zimmer anzeigen' : 'View rooms',
        language === 'es' ? 'Precios' : 
        language === 'fr' ? 'Prix' : 
        language === 'de' ? 'Preise' : 'Pricing'
      ] : []
    });

  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const language = searchParams.get('language') || 'en';
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'SessionId is required' },
        { status: 400 }
      );
    }

    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;
    
    // Get conversation history for this session
    const history = conversationHistory.get(sessionId) || [];
    
    return NextResponse.json({
      history: history.filter(msg => msg.role !== 'system'),
      welcomeMessage: translations.welcomeMessage,
      sessionId
    });
  } catch (error) {
    console.error('GET Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Failed to load conversation history' },
      { status: 500 }
    );
  }
}