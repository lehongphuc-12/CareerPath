import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, ChevronRight, User } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { mentors } from '../../api/mockData';

const ChatListPage: React.FC = () => {
  const { chats } = useStore();
  const navigate = useNavigate();

  const activeChats = chats.map(chat => {
    const mentor = mentors.find(m => m.id === chat.mentorId);
    const lastMessage = chat.messages[chat.messages.length - 1];
    return {
      mentor,
      lastMessage,
    };
  }).filter(c => c.mentor !== undefined);

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-black">Tin nhắn</h1>
        <p className="text-slate-500 dark:text-slate-400">Tiếp tục cuộc trò chuyện với các mentor của bạn.</p>
      </header>

      <div className="space-y-4">
        {activeChats.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <MessageSquare size={48} className="mx-auto mb-4 text-slate-300" />
            <p className="text-slate-500">Bạn chưa có cuộc trò chuyện nào.</p>
            <button 
              onClick={() => navigate('/mentors')}
              className="mt-4 text-primary font-bold hover:underline"
            >
              Tìm kiếm mentor ngay
            </button>
          </div>
        ) : (
          activeChats.map(({ mentor, lastMessage }) => (
            <motion.div
              key={mentor!.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => navigate(`/chat/${mentor!.id}`)}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer flex items-center gap-4 group shadow-sm"
            >
              <img 
                src={mentor!.image} 
                alt={mentor!.name} 
                className="w-14 h-14 rounded-xl object-cover border-2 border-transparent group-hover:border-primary/20 transition-all"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 dark:text-white truncate">{mentor!.name}</h3>
                  <span className="text-[10px] text-gray-400">{lastMessage?.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                  {lastMessage?.sender === 'user' ? 'Bạn: ' : ''}{lastMessage?.text}
                </p>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-primary transition-colors" />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatListPage;
