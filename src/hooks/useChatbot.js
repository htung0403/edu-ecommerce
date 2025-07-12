import { useState } from 'react';
import { chatbotService } from '../services/api';

export const useChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Chào bạn! Tôi là trợ lý AI. Tôi có thể giúp bạn tìm khóa học phù hợp. Bạn muốn học về lĩnh vực nào?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await chatbotService.sendMessage(messageText);
      
      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: response.data?.message || 'Xin lỗi, tôi không hiểu câu hỏi của bạn.',
        sender: 'bot',
        timestamp: new Date(),
        suggestions: response.data?.suggestions || []
      };

      setMessages(prev => [...prev, botMessage]);
    } catch {
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Xin lỗi, tôi không thể trả lời lúc này. Vui lòng thử lại sau.',
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: 'Chào bạn! Tôi là trợ lý AI. Tôi có thể giúp bạn tìm khóa học phù hợp. Bạn muốn học về lĩnh vực nào?',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  return {
    messages,
    loading,
    isOpen,
    sendMessage,
    clearChat,
    toggleChat
  };
};
