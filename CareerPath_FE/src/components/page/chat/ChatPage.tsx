import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Bot, Loader2, Phone, Video } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { Client } from '@stomp/stompjs';

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

const ChatPage: React.FC = () => {
  // URL param is now the roomId (not mentorId)
  const { mentorId: roomIdParam } = useParams<{ mentorId: string }>();
  const roomId = Number(roomIdParam);
  const navigate = useNavigate();
  const { user } = useStore();

  const [room, setRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<any>(null);

  // Load room info
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch('/api/chat/rooms');
        const data = await response.json();
        if (data.success && data.data) {
          const found = (data.data as ChatRoom[]).find(r => r.roomId === roomId);
          setRoom(found || null);
        }
      } catch (error) {
        console.error('Lỗi khi tải thông tin phòng chat:', error);
      }
    };
    fetchRoom();
  }, [roomId]);

  // Load message history
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/chat/rooms/${roomId}/messages`);
        const data = await response.json();
        if (data.success && data.data) {
          setMessages(data.data);
        }
      } catch (error) {
        console.error('Lỗi khi tải lịch sử tin nhắn:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (roomId) fetchMessages();
  }, [roomId]);

  // WebSocket STOMP connection
  useEffect(() => {
    if (!user || !roomId) return;

    const apiUrl = import.meta.env.VITE_API_URL || '';
    const socketUrl = apiUrl 
      ? apiUrl.replace(/^http/, 'ws').replace(/\/$/, '') + '/ws'
      : `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws`;
    const client = new Client({
      brokerURL: socketUrl,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscriptionRef.current = client.subscribe(`/topic/room/${roomId}`, (message) => {
          if (message.body) {
            const newMsg: ChatMessage = JSON.parse(message.body);
            setMessages(prev => {
              if (prev.some(m => m.messageId === newMsg.messageId)) return prev;
              return [...prev, newMsg];
            });
          }
        });
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
      client.deactivate();
      stompClientRef.current = null;
    };
  }, [user, roomId]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when loaded
  useEffect(() => {
    if (!isLoading && inputRef.current) inputRef.current.focus();
  }, [isLoading]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !roomId) return;

    if (stompClientRef.current?.connected) {
      stompClientRef.current.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify({ roomId, content: input }),
      });
      setInput('');
    } else {
      console.error('WebSocket chưa kết nối');
    }
  };

  const formatTime = (isoString?: string) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isLoading && !room) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold">Phòng chat không tồn tại</h2>
        <button onClick={() => navigate('/mentors')} className="px-6 py-3 bg-primary text-white rounded-xl font-bold">
          Quay lại trang Mentor
        </button>
      </div>
    );
  }

  const otherUser = room?.otherParticipant;

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-gradient-to-r from-primary/5 to-orange-500/5 dark:from-primary/10 dark:to-orange-500/10 flex-shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex-shrink-0"
        >
          <ArrowLeft size={20} />
        </button>
        {otherUser ? (
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                src={otherUser.image || `https://i.pravatar.cc/150?u=${otherUser.userId}`}
                alt={otherUser.fullName}
                className="w-10 h-10 rounded-xl object-cover border-2 border-primary/20"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 dark:text-white leading-tight truncate">{otherUser.fullName}</h3>
              <p className="text-xs text-primary font-medium">{otherUser.role}</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 h-9 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
        )}
      </div>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth bg-slate-50 dark:bg-slate-950"
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 size={28} className="text-primary animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-2 opacity-60">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Bot size={32} className="text-primary" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Bắt đầu cuộc trò chuyện cùng<br />
              <strong className="text-primary">{otherUser?.fullName}</strong>
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map(msg => {
              const isMe = msg.senderId.toString() === user?.id;
              return (
                <motion.div
                  key={msg.messageId}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.18 }}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <img
                      src={otherUser?.image || `https://i.pravatar.cc/150?u=${otherUser?.userId}`}
                      alt={otherUser?.fullName}
                      className="w-8 h-8 rounded-lg object-cover mr-2 flex-shrink-0 mt-1 border border-slate-100 dark:border-slate-800"
                    />
                  )}
                  <div
                    className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      isMe
                        ? 'bg-primary text-white rounded-tr-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-100/50 dark:border-slate-700/50'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <p className={`text-[10px] mt-1 opacity-60 ${isMe ? 'text-right' : 'text-left'}`}>
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Input bar */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0"
      >
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Nhắn tin với ${otherUser?.fullName || 'Mentor'}...`}
            className="flex-1 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 text-slate-900 dark:text-white placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 shadow-md shadow-primary/20"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
