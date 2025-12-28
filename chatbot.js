// NextIn AI Chatbot - Patient Assistant
class NextInChatbot {
  constructor() {
    this.messagesContainer = document.getElementById("chatbotMessages");
    this.inputField = document.getElementById("chatbotInputField");
    this.sendBtn = document.getElementById("chatbotSendBtn");
    this.fab = document.getElementById("chatbotFab");
    this.container = document.getElementById("chatbotContainer");
    this.closeBtn = document.getElementById("chatbotClose");

    this.conversationHistory = [];
    this.isTyping = false;

    this.initializeEventListeners();
    this.setupKnowledgeBase();
  }

  setupKnowledgeBase() {
    // FAQ and responses knowledge base
    this.knowledgeBase = {
      greetings: {
        keywords: ["hi", "hello", "hey", "greetings", "namaste", "hola"],
        responses: [
          "Hi there! 👋 How can I assist you with your appointment today?",
          "Hello! Welcome to NextIn. What can I help you with?",
          "Hey! 😊 Looking to book an appointment or learn more about our services?"
        ]
      },

      booking: {
        keywords: [
          "book",
          "appointment",
          "booking",
          "schedule",
          "reserve",
          "slot",
          "how to book",
          "book appointment"
        ],
        responses: [
          "📅 To book an appointment:\n\n1. Sign up or log in to your account\n2. Go to 'Book Appointment'\n3. Enter your details (name, contact)\n4. Search for slots by date and location\n5. Select a doctor from the dropdown\n6. Review the details and confirm\n7. Get your token number!\n\nWould you like help with any of these steps?"
        ]
      },

      doctors: {
        keywords: [
          "doctor",
          "doctors",
          "find doctor",
          "specialist",
          "specialization",
          "cardiologist",
          "dentist",
          "pediatrician"
        ],
        responses: [
          "🏥 We have doctors across various specializations like:\n\n• Cardiology (Heart specialist)\n• Dental (Dentist)\n• Pediatrics (Child doctor)\n• Orthopedics (Bone specialist)\n• General Medicine\n• And more!\n\nYou can search for doctors by location and specialization during booking. Which specialist are you looking for?"
        ]
      },

      slots: {
        keywords: ["slot", "available", "time", "timing", "when", "schedule", "slot availability"],
        responses: [
          "⏰ Available slots vary by:\n\n• Doctor's availability\n• Date selected\n• Hospital location\n• Specialization\n\nDoctors typically create 10 slots per day. Once you search, you'll see a dropdown with all available slots for that date and location. The available count is shown next to each slot!\n\nWhat date are you looking to book?"
        ]
      },

      token: {
        keywords: ["token", "token number", "receipt", "confirmation", "confirm"],
        responses: [
          "✅ Your token number is:\n\n• Generated after successful booking\n• Unique identifier for your appointment\n• Used to track your turn at the hospital\n• Shown on your confirmation page\n• Also visible in 'View Appointments'\n\nMake sure to save or note your token number for reference!"
        ]
      },

      hospital: {
        keywords: ["hospital", "clinic", "create slot", "hospital login", "hospital signup"],
        responses: [
          "🏥 For hospitals and clinics:\n\n1. Sign up with hospital credentials\n2. Go to 'Create Slot' page\n3. Add doctor information\n4. Set date and time\n5. Specify number of slots (default: 10)\n6. Click 'Create Slot'\n\nYou can then manage all bookings and view real-time updates. Are you registering as a hospital?"
        ]
      },

      payment: {
        keywords: ["payment", "price", "cost", "fee", "charges", "subscription", "plan"],
        responses: [
          "💰 We offer flexible subscription plans:\n\n📦 Basic Plan: ₹299/month\n   • 200 monthly appointments\n   • Basic support\n   • Token system\n\n📦 Professional: ₹799/month\n   • Unlimited appointments\n   • Priority support\n   • Real-time reports\n\n📦 Enterprise: Custom pricing\n   • Multi-branch support\n   • Queue dashboard\n   • Dedicated manager\n\nWould you like more details about any plan?"
        ]
      },

      security: {
        keywords: [
          "secure",
          "security",
          "password",
          "privacy",
          "safe",
          "data",
          "encryption"
        ],
        responses: [
          "🔒 Your data is safe with us!\n\n✅ Password encryption using bcrypt\n✅ JWT token authentication\n✅ Secure HTTPS connection\n✅ Personal data is encrypted\n✅ No data sharing with third parties\n\nWe take your privacy seriously and follow industry best practices for security."
        ]
      },

      contacts: {
        keywords: [
          "contact",
          "support",
          "help",
          "customer service",
          "phone",
          "email",
          "reach out"
        ],
        responses: [
          "📞 Get in touch with us:\n\n📧 Email: support@nextin.com\n📱 Phone: 1-800-NEXTIN-1 (1-800-639-8461)\n💬 Live Chat: Available 24/7\n🕒 Support Hours: Monday-Saturday, 9 AM - 8 PM\n\nWe're here to help! What's your concern?"
        ]
      },

      location: {
        keywords: [
          "location",
          "city",
          "near me",
          "nearby",
          "where",
          "area",
          "address"
        ],
        responses: [
          "📍 How to find hospitals near you:\n\n1. Go to 'Book Appointment'\n2. Enter your location (city/area)\n3. Search for available slots\n4. All results show hospital location\n\nCurrently serving major cities across India. Which location are you in?"
        ]
      },

      account: {
        keywords: [
          "account",
          "profile",
          "signup",
          "login",
          "create account",
          "register",
          "user account"
        ],
        responses: [
          "👤 Account management:\n\n✅ Sign up: Provide username, email, phone, location, password\n✅ Login: Use email and password\n✅ View Profile: Check your details in 'User Details'\n✅ Change Password: Available in settings\n✅ View Bookings: See all your appointments\n\nDo you need help with account creation?"
        ]
      },

      cancel: {
        keywords: [
          "cancel",
          "cancellation",
          "reschedule",
          "change appointment",
          "modify"
        ],
        responses: [
          "❌ Appointment cancellation/modification:\n\n⏰ You can cancel up to 24 hours before your appointment\n🔄 Rescheduling: Cancel and book a new slot\n💰 Refund policy: 100% refund for cancellations 24+ hours before\n\nGo to 'View Appointments' and select the option to cancel. Need more help?"
        ]
      },

      features: {
        keywords: [
          "feature",
          "features",
          "what can",
          "capabilities",
          "service",
          "services"
        ],
        responses: [
          "✨ Key features of NextIn:\n\n📱 Smart Slot Booking - Real-time slot availability\n✅ Verified Tokens - Transparent token system\n🔍 Doctor Search - Find specialists by location\n📊 Real-time Updates - Instant notification of changes\n⏰ Auto-refresh - Updates every 10 seconds\n🔐 Secure - Encrypted and secure bookings\n\nWhich feature interests you?"
        ]
      },

      realtime: {
        keywords: ["real-time", "realtime", "update", "live", "instant"],
        responses: [
          "⚡ Real-time features:\n\n✅ Slot availability updates every 10 seconds\n✅ See when slots get booked by others\n✅ Token numbers generated instantly\n✅ Appointment confirmation immediate\n✅ Doctor schedules update live\n\nThis ensures you always have the latest information!"
        ]
      },

      faq: {
        keywords: ["faq", "question", "common", "problem", "issue"],
        responses: [
          "❓ Common questions:\n\n1️⃣ How do I book? Use the 'Book Appointment' page\n2️⃣ What's a token? Your appointment reference number\n3️⃣ Can I cancel? Yes, up to 24 hours before\n4️⃣ Where to view bookings? 'View Appointments' page\n5️⃣ How to contact support? Email or live chat\n6️⃣ What about security? Your data is encrypted\n\nAnything specific you'd like to know?"
        ]
      }
    };
  }

  initializeEventListeners() {
    this.fab.addEventListener("click", () => this.openChat());
    this.closeBtn.addEventListener("click", () => this.closeChat());
    this.sendBtn.addEventListener("click", () => this.sendMessage());
    this.inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    });
  }

  openChat() {
    this.container.classList.remove("hidden");
    this.fab.classList.add("hidden");
    this.inputField.focus();
  }

  closeChat() {
    this.container.classList.add("hidden");
    this.fab.classList.remove("hidden");
  }

  sendMessage() {
    const message = this.inputField.value.trim();
    if (!message) return;

    // Add user message
    this.addMessage(message, "user");
    this.inputField.value = "";

    // Show typing indicator
    this.showTypingIndicator();

    // Get bot response with slight delay for natural feel
    setTimeout(() => {
      this.removeTypingIndicator();
      const response = this.generateResponse(message);
      this.addMessage(response, "bot");
    }, 800 + Math.random() * 600); // Random delay 800-1400ms
  }

  addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    const avatar = document.createElement("div");
    avatar.className = "chatbot-avatar";
    avatar.textContent = sender === "bot" ? "🤖" : "👤";

    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = text;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);

    this.messagesContainer.appendChild(messageDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

    this.conversationHistory.push({ sender, text, timestamp: new Date() });
  }

  showTypingIndicator() {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message bot";
    messageDiv.id = "typing-indicator";

    const avatar = document.createElement("div");
    avatar.className = "chatbot-avatar";
    avatar.textContent = "🤖";

    const typingDiv = document.createElement("div");
    typingDiv.className = "typing-indicator";
    typingDiv.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(typingDiv);
    this.messagesContainer.appendChild(messageDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
      indicator.remove();
    }
  }

  generateResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Check for exact matches first
    for (const [category, data] of Object.entries(this.knowledgeBase)) {
      for (const keyword of data.keywords) {
        if (message.includes(keyword)) {
          return this.getRandomResponse(data.responses);
        }
      }
    }

    // If no match found, return default responses
    return this.getDefaultResponse(userMessage);
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  getDefaultResponse(userMessage) {
    const defaultResponses = [
      `I understand you're asking about "${userMessage}". I don't have specific information about that, but I can help with:\n\n• Appointment booking 📅\n• Finding doctors 🏥\n• Slot information ⏰\n• Subscription plans 💰\n• Account setup 👤\n• Security & privacy 🔒\n\nWould you like to know about any of these?`,

      `That's a great question! While I don't have details about "${userMessage}", I'm here to help with NextIn services. Try asking about:\n\n• How to book an appointment\n• Doctor specializations\n• Slot availability\n• Payment plans\n• Support contact\n\nWhat would help you the most?`,

      `Hmm, I'm not sure about "${userMessage}". Let me help with what I do know:\n\n📱 Appointment booking\n🏥 Hospital & doctor info\n⏰ Scheduling & slots\n💰 Pricing & plans\n🔐 Security & privacy\n\nCan I assist with any of these?`
    ];

    return this.getRandomResponse(defaultResponses);
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new NextInChatbot();
});
