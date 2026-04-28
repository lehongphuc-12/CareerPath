import { useState, useEffect } from 'react';
import { useStore } from '../../../store/useStore';
import { careers } from '../../../api/mockData';
import { Link } from 'react-router-dom';
import { Award, Bookmark, Calendar, ChevronRight, Zap, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, savedCareers, bookings } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-spin">
          <Loader2 size={24} />
        </div>
        <p className="text-slate-500 font-medium">Đang tải dữ liệu tổng quan...</p>
      </div>
    );
  }

  const savedCareerData = careers.filter((c) => savedCareers.includes(c.id));

  return (
    <div className="space-y-10 py-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm">
        <div className="flex items-center gap-6">
          <div className="size-24 rounded-2xl bg-gradient-to-tr from-primary to-pink-500 flex items-center justify-center text-white text-3xl font-black">
            {user?.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black">Chào {user?.name.split(' ').pop()}!</h1>
            <p className="text-slate-500 font-medium">Hôm nay bạn muốn khám phá điều gì mới?</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-4 bg-primary/5 border border-primary/20 rounded-2xl text-center">
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
              Level
            </p>
            <p className="text-2xl font-black text-primary">{user?.level}</p>
          </div>
          <div className="px-6 py-4 bg-orange-500/5 border border-orange-500/20 rounded-2xl text-center">
            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">
              XP
            </p>
            <p className="text-2xl font-black text-orange-500">{user?.xp}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Bookmark className="text-primary" /> Ngành nghề đã lưu
              </h2>
              <Link
                to="/careers"
                className="text-sm font-bold text-primary flex items-center gap-1"
              >
                Xem tất cả <ChevronRight size={16} />
              </Link>
            </div>
            {savedCareerData.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {savedCareerData.map((career) => (
                  <Link
                    key={career.id}
                    to={`/careers/${career.id}`}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all flex items-center gap-4"
                  >
                    <img
                      src={career.image}
                      alt={career.name}
                      className="size-16 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold">{career.vietnameseName}</h4>
                      <p className="text-xs text-slate-500">{career.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-10 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-4">
                <p className="text-slate-500">Bạn chưa lưu ngành nghề nào.</p>
                <Link
                  to="/careers"
                  className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm"
                >
                  Khám phá ngay
                </Link>
              </div>
            )}
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="text-emerald-500" /> Lịch hẹn Mentor
            </h2>
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <Zap size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold">1:1 Session với {booking.mentorName}</h4>
                        <p className="text-sm text-slate-500">{booking.date}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase">
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
                <p className="text-slate-500">Bạn chưa có lịch hẹn nào.</p>
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold">Gợi ý cho bạn</h3>
            <p className="text-sm text-slate-500">
              Dựa trên kết quả test của bạn, chúng tôi gợi ý bạn nên đọc bài viết này.
            </p>
            <Link
              to="/blog"
              className="block p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 transition-colors"
            >
              <p className="font-bold text-sm">5 kỹ năng mềm cần thiết cho Software Engineer</p>
              <p className="text-xs text-primary mt-1">Đọc ngay →</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
