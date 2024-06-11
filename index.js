const ChatbotService = require('./src/Services/ChatbotService.js');

// Start the chatbot
console.log('Hi there I am your virtual assistance to help you manage your reservations\nI can help you make a new reservation, modify your reservation, or cancel a reservation.\nHow may I assist you today?');

const chatbot = new ChatbotService();
chatbot.startChatbot();