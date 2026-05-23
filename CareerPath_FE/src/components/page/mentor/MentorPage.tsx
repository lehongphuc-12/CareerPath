import React, { useState, useEffect } from 'react';
import { Search, Star, MessageCircle, MessageSquare, Loader2 } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Mentor {
  userId: number;
  fullName: string;
  email: string;
  image?: string;
  role: string;
}

export default function MentorPage() {
  const navigate = useNavigate();
  const { user, addBooking, addXP } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [chatLoadingId, setChatLoadingId] = useState<number | null>(null);

  // Fetch mentors from backend
  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/chat/mentors');
        const data = await response.json();
        if (data.success && data.data) {
          setMentors(data.data);
        }
      } catch (error) {
        console.error('Lỗi khi tải danh sách mentor:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter(m =>
    m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tạo/lấy phòng chat 1:1 rồi điều hướng đến trang chat
  const handleChat = async (mentor: Mentor) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setChatLoadingId(mentor.userId);
    try {
      const response = await fetch('/api/chat/rooms/private', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId: mentor.userId }),
      });
      const data = await response.json();
      if (data.success && data.data) {
        navigate(`/chat/${data.data.roomId}`);
      }
    } catch (error) {
      console.error('Lỗi khi mở phòng chat:', error);
    } finally {
      setChatLoadingId(null);
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;
    addBooking({
      mentorId: selectedMentor.userId,
      mentorName: selectedMentor.fullName,
      date: new Date().toLocaleDateString(),
      status: 'Confirmed',
    });
    addXP(30);
    setIsBookingModalOpen(false);
    alert('Đặt lịch thành công! Mentor sẽ sớm liên hệ với bạn.');
  };

  return (
    <div className="space-y-10 py-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-black">Kết nối Mentor</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
          Học hỏi kinh nghiệm thực chiến từ những chuyên gia hàng đầu.
        </p>
      </header>

      {/* Search bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm mentor theo tên, vai trò..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 size={36} className="text-primary animate-spin" />
          <p className="text-slate-500 dark:text-slate-400 text-sm">Đang tải danh sách Mentor...</p>
        </div>
      ) : filteredMentors.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <MessageSquare size={48} className="mx-auto mb-4 text-slate-300" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {searchTerm ? 'Không tìm thấy mentor phù hợp' : 'Chưa có mentor nào trong hệ thống'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredMentors.map((mentor, idx) => (
            <motion.div
              key={mentor.userId}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:border-primary/50 transition-all group flex flex-col shadow-lg shadow-black/5"
            >
              {/* Avatar & badge */}
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <img
                    src={mentor.image || `https://i.pravatar.cc/150?u=${mentor.userId}`}
                    alt={mentor.fullName}
                    className="size-20 rounded-2xl object-cover ring-4 ring-primary/10"
                  />
                  <span className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-2 py-1 rounded-md bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <MessageCircle size={12} /> Mentor
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold">5.0</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-1 mb-6 flex-1">
                <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{mentor.fullName}</h4>
                <p className="text-sm text-primary font-medium">{mentor.role}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => handleChat(mentor)}
                  disabled={chatLoadingId === mentor.userId}
                  className="flex-1 py-4 bg-white dark:bg-slate-800 text-primary border border-primary/20 font-bold rounded-xl hover:bg-primary/5 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {chatLoadingId === mentor.userId
                    ? <Loader2 size={18} className="animate-spin" />
                    : <MessageSquare size={18} />}
                  {chatLoadingId === mentor.userId ? 'Đang mở...' : 'Chat ngay'}
                </button>
                <button
                  onClick={() => { setSelectedMentor(mentor); setIsBookingModalOpen(true); }}
                  className="flex-1 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  Đặt lịch 1:1
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Booking modal */}
      <AnimatePresence>
        {isBookingModalOpen && selectedMentor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <button onClick={() => setIsBookingModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">✕</button>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedMentor.image || `https://i.pravatar.cc/150?u=${selectedMentor.userId}`}
                  alt={selectedMentor.fullName}
                  className="w-14 h-14 rounded-2xl object-cover ring-4 ring-primary/10"
                />
                <div>
                  <h3 className="text-xl font-bold">{selectedMentor.fullName}</h3>
                  <p className="text-sm text-primary font-medium">{selectedMentor.role}</p>
                </div>
              </div>
              <form onSubmit={handleBooking} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Chọn ngày</label>
                  <input type="date" required className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Chọn giờ</label>
                  <select className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none">
                    <option>09:00 AM</option>
                    <option>10:30 AM</option>
                    <option>02:00 PM</option>
                    <option>04:30 PM</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                  Xác nhận đặt lịch
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
