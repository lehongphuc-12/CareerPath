import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, User, Bot, Loader2 } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { mentors } from '../../../api/mockData';
import { GoogleGenAI } from "@google/genai";

const ChatPage: React.FC = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const navigate = useNavigate();
  const { chats, addChatMessage, theme } = useStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const mentor = mentors.find(m => m.id === Number(mentorId));
  const chat = chats.find(c => c.mentorId === Number(mentorId));
  const messages = chat?.messages || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!mentor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Mentor không tồn tại</h2>
        <button onClick={() => navigate('/mentors')} className="btn-primary"> Quay lại </button>
      </div>
    );
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user' as const,
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    addChatMessage(mentor.id, userMessage);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = "gemini-3-flash-preview";
      
      const systemInstruction = `Bạn là ${mentor.name}, một chuyên gia trong lĩnh vực ${mentor.role}. 
      Phong cách của bạn là ${mentor.style}. 
      Hãy trả lời người dùng (một học sinh trung học) một cách thân thiện, chuyên nghiệp và đầy cảm hứng. 
      Ngôn ngữ: Tiếng Việt.`;

      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model,
        contents: [...history, { role: 'user', parts: [{ text: input }] }],
        config: {
          systemInstruction,
        }
      });

      const mentorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'mentor' as const,
        text: response.text || "Xin lỗi, mình đang gặp chút trục trặc. Bạn có thể nhắc lại được không?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      addChatMessage(mentor.id, mentorMessage);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'mentor' as const,
        text: "Có lỗi xảy ra khi kết nối với mentor. Vui lòng thử lại sau.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      addChatMessage(mentor.id, errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
      {/* Header */}
      <div className="p-4 border-bottom border-gray-100 dark:border-gray-800 flex items-center gap-4 bg-gray-50/50 dark:bg-gray-800/50">
        <button 
          onClick={() => navigate('/mentors')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <img src={mentor.image} alt={mentor.name} className="w-10 h-10 rounded-full object-cover border-2 border-primary" />
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{mentor.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{mentor.role}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="text-center py-10 opacity-50">
            <Bot size={48} className="mx-auto mb-2 text-primary" />
            <p>Bắt đầu cuộc trò chuyện với {mentor.name}</p>
          </div>
        )}
        
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 opacity-70 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-primary" />
              <span className="text-xs text-gray-500 italic">{mentor.name} đang soạn tin...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="bg-primary text-white p-2 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
