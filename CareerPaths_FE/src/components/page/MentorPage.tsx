import React, { useState } from 'react';
import { mentors } from '../../api/mockData';
import { Search, Filter, Star, MessageCircle, Calendar, X, MessageSquare } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function MentorPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { addBooking, addXP } = useStore();

  const filteredMentors = mentors.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    addBooking({
      mentorId: selectedMentor.id,
      mentorName: selectedMentor.name,
      date: new Date().toLocaleDateString(),
      status: 'Confirmed'
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

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm mentor theo tên, công ty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <Filter size={20} /> Lọc ngành
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredMentors.map(mentor => (
          <div key={mentor.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:border-primary/50 transition-all group flex flex-col shadow-lg shadow-black/5">
            <div className="flex justify-between items-start mb-6">
              <div className="relative">
                <img src={mentor.image} alt={mentor.name} className="size-20 rounded-2xl object-cover ring-4 ring-primary/10" />
                <span className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="px-2 py-1 rounded-md bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <MessageCircle size={12} /> Anon Chat
                </span>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold">{mentor.rating}</span>
                </div>
              </div>
            </div>
            <div className="space-y-1 mb-6">
              <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{mentor.name}</h4>
              <p className="text-sm text-primary font-medium">{mentor.role}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {mentor.style.map((s: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate(`/chat/${mentor.id}`)}
                className="flex-1 py-4 bg-white dark:bg-slate-800 text-primary border border-primary/20 font-bold rounded-xl hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare size={18} /> Chat ngay
              </button>
              <button 
                onClick={() => { setSelectedMentor(mentor); setIsBookingModalOpen(true); }}
                className="flex-1 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                Đặt lịch 1:1
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isBookingModalOpen && (
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
              <button onClick={() => setIsBookingModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"><X /></button>
              <h3 className="text-2xl font-bold mb-6">Đặt lịch với {selectedMentor?.name}</h3>
              <form onSubmit={handleBooking} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Chọn ngày</label>
                  <input type="date" required className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Chọn giờ</label>
                  <select className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary">
                    <option>09:00 AM</option>
                    <option>10:30 AM</option>
                    <option>02:00 PM</option>
                    <option>04:30 PM</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">
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
