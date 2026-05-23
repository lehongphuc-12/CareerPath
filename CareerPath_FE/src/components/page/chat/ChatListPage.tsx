import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, ChevronRight, Loader2 } from 'lucide-react';

interface Mentor {
  userId: number;
  fullName: string;
  email: string;
  image?: string;
  role: string;
}

interface ChatMessage {
  messageId: number;
  roomId: number;
  senderId: number;
  senderName: string;
  content: string;
  createdAt: string;
}

interface ChatRoom {
  roomId: number;
  name: string;
  isGroup: boolean;
  createdAt: string;
  updatedAt: string;
  otherParticipant: Mentor;
  lastMessage?: ChatMessage;
}

const ChatListPage: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/chat/rooms');
        const data = await response.json();
        if (data.success && data.data) {
          setRooms(data.data);
        }
      } catch (error) {
        console.error('Lỗi khi tải danh sách phòng chat:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const formatTime = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-black">Tin nhắn</h1>
        <p className="text-slate-500 dark:text-slate-400">Tiếp tục cuộc trò chuyện với các mentor của bạn.</p>
      </header>

      <div className="space-y-3">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={32} className="text-primary animate-spin" />
            <p className="text-slate-500 dark:text-slate-400 text-sm">Đang tải tin nhắn...</p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <MessageSquare size={48} className="mx-auto mb-4 text-slate-300" />
            <p className="text-slate-500 dark:text-slate-400 mb-2">Bạn chưa có cuộc trò chuyện nào.</p>
            <button
              onClick={() => navigate('/mentors')}
              className="mt-2 text-primary font-bold hover:underline"
            >
              Tìm kiếm mentor ngay →
            </button>
          </div>
        ) : (
          rooms.map((room, idx) => (
            <motion.div
              key={room.roomId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate(`/chat/${room.roomId}`)}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer flex items-center gap-4 group shadow-sm hover:shadow-md"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={room.otherParticipant?.image || `https://i.pravatar.cc/150?u=${room.otherParticipant?.userId}`}
                  alt={room.name}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-transparent group-hover:border-primary/20 transition-all"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full ring-2 ring-white dark:ring-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
                    {room.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 ml-2 flex-shrink-0">
                    {formatTime(room.lastMessage?.createdAt || room.updatedAt)}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {room.lastMessage ? room.lastMessage.content : <span className="italic">Bắt đầu cuộc trò chuyện</span>}
                </p>
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-colors flex-shrink-0" />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatListPage;
