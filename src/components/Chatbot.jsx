import React, { useState } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
import { useChatbot } from '../hooks/useChatbot';

const Chatbot = ({ onNavigate }) => {
  const { messages, loading, isOpen, sendMessage, clearChat, toggleChat } = useChatbot();
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      await sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleSuggestionClick = (productId) => {
    if (onNavigate) {
      onNavigate('product-detail', productId);
    } else {
      console.log('Product suggestion clicked:', productId);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-medium">AI Tư vấn</span>
            </div>
            <button
              onClick={clearChat}
              className="text-white/80 hover:text-white text-sm"
            >
              Xóa chat
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : message.isError
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  } rounded-lg p-3`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === 'bot' && (
                      <Bot size={16} className="mt-1 flex-shrink-0" />
                    )}
                    {message.sender === 'user' && (
                      <User size={16} className="mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.text}</p>
                      
                      {/* Product suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <p className="text-xs opacity-75">Gợi ý khóa học:</p>
                          {message.suggestions.map((product) => (
                            <button
                              key={product.id}
                              onClick={() => handleSuggestionClick(product.id)}
                              className="block w-full text-left p-2 bg-white/20 rounded text-xs hover:bg-white/30 transition-colors"
                            >
                              <div className="font-medium">{product.name}</div>
                              <div className="opacity-75">
                                {new Intl.NumberFormat('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                }).format(product.price)}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <div className="text-xs opacity-75 mt-1">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg p-3 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Đang suy nghĩ...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
