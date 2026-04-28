import { Link } from 'react-router-dom';
import { mentors } from '../../../api/mockData';
import {
  Bookmark,
  Users,
  ArrowRight,
  Loader2,
  ArrowLeft,
  DollarSign,
  BarChart2,
} from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { useCareerDetail } from '../../../hooks/useCareerDetail';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop';

const DEMAND_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: 'Thấp', color: 'text-slate-500' },
  2: { label: 'Trung bình', color: 'text-yellow-500' },
  3: { label: 'Cao', color: 'text-emerald-500' },
  4: { label: 'Rất cao', color: 'text-orange-500' },
  5: { label: 'Cực kỳ cao', color: 'text-red-500' },
};

export default function CareerDetailPage() {
  const { savedCareers, saveCareer, unsaveCareer } = useStore();
  const { career, isLoading, error } = useCareerDetail();


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <p className="text-2xl font-bold text-slate-600 dark:text-slate-400">
          {error || 'Không tìm thấy ngành nghề.'}
        </p>
        <Link
          to="/careers"
          className="flex items-center gap-2 text-primary font-bold hover:underline"
        >
          <ArrowLeft size={18} /> Quay lại danh sách
        </Link>
      </div>
    );
  }

  const isSaved = savedCareers.includes(career.careerId);
  const demandInfo = career.demand_level ? DEMAND_LABELS[career.demand_level] : null;

  return (
    <div className="space-y-12 py-10">
      {/* Hero Header */}
      <header className="relative h-[400px] rounded-3xl overflow-hidden">
        <img
          src={career.image || DEFAULT_IMAGE}
          alt={career.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-10">
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase rounded-full">
                Hot Career 2025
              </span>
              <button
                onClick={() =>
                  isSaved ? unsaveCareer(career.careerId) : saveCareer(career.careerId)
                }
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md transition-all ${isSaved ? 'bg-primary text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
                {isSaved ? 'Đã lưu' : 'Lưu ngành'}
              </button>
            </div>
            <h1 className="text-5xl font-black text-white">{career.name}</h1>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Tổng quan</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {career.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <DollarSign className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">
                    Lương trung bình
                  </p>
                  <p className="text-2xl font-black text-primary">
                    {career.min_salary && career.max_salary
                      ? ` ${(Number(career.min_salary) / 1000000).toFixed(1)} - ${(Number(career.max_salary) / 1000000).toFixed(1)} trVND`
                      : 'Chưa cập nhật'}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <BarChart2 className="text-emerald-500" size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">
                    Nhu cầu thị trường
                  </p>
                  <p className={`text-2xl font-black ${demandInfo?.color || 'text-slate-400'}`}>
                    {demandInfo?.label || 'Chưa cập nhật'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Mentor suggestions */}
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Users className="text-primary" /> Mentor gợi ý
            </h3>
            <div className="space-y-4">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                >
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="size-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{mentor.name}</p>
                    <p className="text-xs text-slate-500">{mentor.role}</p>
                  </div>
                  <Link to="/mentors" className="text-primary">
                    <ArrowRight size={18} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Back to list */}
          <Link
            to="/careers"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            <ArrowLeft size={18} /> Xem tất cả ngành nghề
          </Link>
        </div>
      </div>
    </div>
  );
}
