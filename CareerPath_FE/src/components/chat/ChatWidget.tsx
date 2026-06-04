import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, ArrowLeft, Bot, Loader2,
  Search, ChevronRight, Users, MessageSquare
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Client } from '@stomp/stompjs';

type View = 'list' | 'chat';

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

const ChatWidget: React.FC = () => {
  const { user } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>('list');
  const [roomsList, setRoomsList] = useState<ChatRoom[]>([]);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<any>(null);

  // Fetch active chat rooms from Backend
  const fetchRooms = async () => {
    if (!user) return;
    try {
      const response = await fetch('/api/chat/rooms');
      const data = await response.json();
      if (data.success && data.data) {
        setRoomsList(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách phòng chat:', error);
    }
  };

  useEffect(() => {
    if (user && isOpen) {
      fetchRooms();
    }
  }, [user, isOpen]);

  // Setup WebSocket connection (STOMP Client)
  useEffect(() => {
    if (!user || !isOpen) {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
      }
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL || '';
    const socketUrl = apiUrl 
      ? apiUrl.replace(/^http/, 'ws').replace(/\/$/, '') + '/ws'
      : `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws`;
    console.log('Connecting to WebSocket:', socketUrl);

    const client = new Client({
      brokerURL: socketUrl,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('WebSocket connected successfully');
      },
      onStompError: (frame) => {
        console.error('STOMP broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      onDisconnect: () => {
        console.log('WebSocket disconnected');
      }
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
      stompClientRef.current = null;
    };
  }, [user, isOpen]);

  // Subscribe to active room messages
  useEffect(() => {
    if (!stompClientRef.current || !activeRoom) {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
      return;
    }

    const client = stompClientRef.current;

    const setupSubscription = () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      subscriptionRef.current = client.subscribe(`/topic/room/${activeRoom.roomId}`, (message) => {
        if (message.body) {
          const newMsg = JSON.parse(message.body);
          
          // Tránh ghi đè trùng lặp tin nhắn
          setMessages(prev => {
            if (prev.some(m => m.messageId === newMsg.messageId)) return prev;
            return [...prev, newMsg];
          });

          // Cập nhật tin nhắn cuối trong Rooms list
          setRoomsList(prevRooms => {
            const updated = prevRooms.map(r => 
              r.roomId === activeRoom.roomId 
                ? { ...r, lastMessage: newMsg, updatedAt: new Date().toISOString() }
                : r
            );
            // Sắp xếp các phòng hoạt động mới nhất lên trên
            return [...updated].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          });
        }
      });
    };

    if (client.connected) {
      setupSubscription();
    } else {
      const originalOnConnect = client.onConnect;
      client.onConnect = (frame) => {
        if (originalOnConnect) originalOnConnect(frame);
        setupSubscription();
      };
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [activeRoom]);

  // Load messages for a room
  const loadRoomMessages = async (roomId: number) => {
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

  const openExistingRoom = async (room: ChatRoom) => {
    setActiveRoom(room);
    setView('chat');
    await loadRoomMessages(room.roomId);
  };

  // Send Message via STOMP WS
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeRoom) return;

    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify({
          roomId: activeRoom.roomId,
          content: input,
        }),
      });
      setInput('');
    } else {
      console.error('Không thể gửi tin nhắn, kết nối WebSocket bị ngắt');
    }
  };

  // Auto-scroll mechanics
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, view]);

  useEffect(() => {
    if (view === 'chat' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [view, activeRoom]);

  // Search Filter: Lọc phòng chat đang hoạt động
  const filteredRooms = roomsList.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (room.lastMessage?.content || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper format timestamp
  const formatTime = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="w-[360px] h-[520px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
          >
            {/* === FALLBACK: NOT LOGGED IN === */}
            {!user ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-950">
                <div className="flex items-center justify-between w-full absolute top-0 px-4 py-3 bg-gradient-to-br from-primary to-orange-500 text-white flex-shrink-0">
                  <h3 className="font-bold text-base">Trò chuyện</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-4 mt-6">
                  <MessageSquare size={32} className="text-primary animate-pulse" />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white text-base mb-1">
                  Kết nối với Mentor
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[240px] leading-relaxed">
                  Vui lòng đăng nhập vào tài khoản của bạn để có thể trò chuyện Realtime 1:1 trực tiếp cùng các chuyên gia hàng đầu.
                </p>
              </div>
            ) : (
              <>
                {/* === LIST VIEW === */}
                {view === 'list' && (
                  <>
                    {/* Header */}
                    <div className="px-4 pt-4 pb-3 bg-gradient-to-br from-primary to-orange-500 text-white flex-shrink-0">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-base">Tin nhắn</h3>
                          <p className="text-xs text-white/70">
                            {roomsList.length > 0
                              ? `${roomsList.length} cuộc hội thoại`
                              : 'Trò chuyện cùng Mentor'}
                          </p>
                        </div>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      {/* Search */}
                      {roomsList.length > 0 && (
                        <div className="relative">
                          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Tìm kiếm cuộc trò chuyện..."
                            className="w-full pl-8 pr-3 py-2 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 rounded-lg text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                          />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto flex flex-col bg-slate-50 dark:bg-slate-950">
                      {roomsList.length === 0 ? (
                        /* Empty state when no rooms are available */
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-3">
                            <MessageCircle size={26} className="text-primary" />
                          </div>
                          <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">
                            Chưa có cuộc trò chuyện nào
                          </h4>
                          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[200px] leading-relaxed">
                            Hãy kết nối và trò chuyện với Mentor bằng cách chọn nút "Nhắn tin" trên trang danh sách chuyên gia.
                          </p>
                        </div>
                      ) : filteredRooms.length === 0 ? (
                        /* Empty state when search yields no results */
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                          <p className="text-sm text-slate-400 dark:text-slate-500">
                            Không tìm thấy cuộc hội thoại nào phù hợp
                          </p>
                        </div>
                      ) : (
                        /* List of active rooms */
                        <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                          {filteredRooms.map(room => (
                            <button
                              key={room.roomId}
                              onClick={() => openExistingRoom(room)}
                              className="w-full flex items-center gap-3 px-4 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left border-b border-slate-100/50 dark:border-slate-800/30"
                            >
                              <div className="relative flex-shrink-0">
                                <img
                                  src={room.otherParticipant?.image || 'https://i.pravatar.cc/150'}
                                  alt={room.name}
                                  className="w-10 h-10 rounded-xl object-cover border border-slate-100 dark:border-slate-800"
                                />
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white dark:ring-slate-900" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                  <span className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                                    {room.name}
                                  </span>
                                  <span className="text-[10px] text-slate-400 ml-2 flex-shrink-0">
                                    {formatTime(room.lastMessage?.createdAt)}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                  {room.lastMessage ? (
                                    <>
                                      {room.lastMessage.senderId.toString() === user.id ? 'Bạn: ' : ''}
                                      {room.lastMessage.content}
                                    </>
                                  ) : (
                                    <span className="italic">Nhấn để bắt đầu trò chuyện</span>
                                  )}
                                </p>
                              </div>
                              <ChevronRight size={14} className="text-slate-300 flex-shrink-0" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* === CHAT VIEW === */}
                {view === 'chat' && activeRoom && (
                  <>
                    {/* Header */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary to-orange-500 text-white flex-shrink-0">
                      <button
                        onClick={() => { setView('list'); setInput(''); }}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                      >
                        <ArrowLeft size={18} />
                      </button>
                      <div className="relative flex-shrink-0">
                        <img
                          src={activeRoom.otherParticipant?.image || 'https://i.pravatar.cc/150'}
                          alt={activeRoom.name}
                          className="w-9 h-9 rounded-xl object-cover border-2 border-white/40"
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{activeRoom.name}</p>
                        <p className="text-[10px] text-white/70 truncate">{activeRoom.otherParticipant?.role || 'Mentor'}</p>
                      </div>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Messages Area */}
                    <div
                      ref={scrollRef}
                      className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth bg-slate-50 dark:bg-slate-950"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-2 opacity-60">
                          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Bot size={24} className="text-primary" />
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                            Bắt đầu cuộc trò chuyện cùng<br />
                            <strong className="text-primary">{activeRoom.name}</strong>
                          </p>
                        </div>
                      ) : (
                        <AnimatePresence initial={false}>
                          {messages.map(msg => {
                            const isMe = msg.senderId.toString() === user.id;
                            return (
                              <motion.div
                                key={msg.messageId || Math.random().toString()}
                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                              >
                                {!isMe && (
                                  <img
                                    src={activeRoom.otherParticipant?.image || 'https://i.pravatar.cc/150'}
                                    alt={activeRoom.name}
                                    className="w-6 h-6 rounded-lg object-cover mr-2 flex-shrink-0 mt-1 border border-slate-100 dark:border-slate-800"
                                  />
                                )}
                                <div
                                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs leading-relaxed shadow-sm ${
                                    isMe
                                      ? 'bg-primary text-white rounded-tr-sm'
                                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-100/50 dark:border-slate-800/50'
                                  }`}
                                >
                                  <p className="whitespace-pre-wrap">{msg.content}</p>
                                  <p className={`text-[9px] mt-1 opacity-60 ${isMe ? 'text-right' : 'text-left'}`}>
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
                      className="px-3 py-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0"
                    >
                      <div className="flex gap-2 items-center">
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={e => setInput(e.target.value)}
                          placeholder={`Nhắn tin với ${activeRoom.name}...`}
                          className="flex-1 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-slate-900 dark:text-white placeholder-slate-400"
                        />
                        <button
                          type="submit"
                          disabled={!input.trim()}
                          className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 shadow-md shadow-primary/20"
                        >
                          <Send size={15} />
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 bg-gradient-to-br from-primary to-orange-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center cursor-pointer animate-none"
        style={{ boxShadow: '0 8px 32px rgba(var(--color-primary-rgb, 99,102,241), 0.4)' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring when not open */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl animate-ping bg-primary/30 pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
