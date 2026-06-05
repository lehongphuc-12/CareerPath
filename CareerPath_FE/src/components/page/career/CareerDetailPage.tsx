import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mentorApi, Mentor } from '../../../api/mentorApi';
import { chatApi } from '../../../api/chatApi';
import {
  Bookmark,
  Users,
  ArrowRight,
  Loader2,
  ArrowLeft,
  DollarSign,
  BarChart2,
  Check,
  GraduationCap,
  Sparkles,
  Briefcase,
  AlertCircle,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { useCareerDetail } from '../../../hooks/useCareerDetail';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop';

const DEMAND_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: 'Rất thấp', color: 'text-slate-400 bg-slate-400/10 border-slate-400/25' },
  2: { label: 'Thấp', color: 'text-slate-500 bg-slate-500/10 border-slate-500/25' },
  3: { label: 'Trung bình yếu', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/25' },
  4: { label: 'Trung bình', color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/25' },
  5: { label: 'Khá cao', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25' },
  6: { label: 'Cao', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25' },
  7: { label: 'Rất cao', color: 'text-teal-500 bg-teal-500/10 border-teal-500/25' },
  8: { label: 'Cực kỳ cao', color: 'text-orange-500 bg-orange-500/10 border-orange-500/25' },
  9: { label: 'Bùng nổ', color: 'text-red-500 bg-red-500/10 border-red-500/25' },
  10: { label: 'Kịch trần', color: 'text-red-650 bg-red-650/10 border-red-650/25' },
};

export default function CareerDetailPage() {
  const navigate = useNavigate();
  const { user, savedCareers, saveCareer, unsaveCareer } = useStore();
  const { career, isLoading, error } = useCareerDetail();
  const [showAllMajors, setShowAllMajors] = useState(false);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [mentorsLoading, setMentorsLoading] = useState(false);
  const [chatLoadingId, setChatLoadingId] = useState<number | null>(null);

  useEffect(() => {
    if (!career?.careerId) return;

    setMentorsLoading(true);
    mentorApi
      .getMentors(career.careerId)
      .then(setMentors)
      .catch((err) => {
        console.error('Lỗi khi tải mentor:', err);
        setMentors([]);
      })
      .finally(() => setMentorsLoading(false));
  }, [career?.careerId]);

  const handleMentorChat = async (mentor: Mentor) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setChatLoadingId(mentor.userId);
    try {
      const result = await chatApi.createPrivateRoom(mentor.userId);
      navigate(`/chat/${result.data.roomId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Yêu cầu đăng nhập';
      if (message.includes('đăng nhập')) {
        navigate('/login');
      } else {
        console.error('Lỗi khi mở phòng chat:', err);
      }
    } finally {
      setChatLoadingId(null);
    }
  };

  const MAJORS_INITIAL_COUNT = 6;

  // Lấy danh sách ngành từ API relatedMajors (ưu tiên) hoặc fallback về career.majors (string cũ)
  const allMajors = useMemo(() => {
    if (career?.relatedMajors && career.relatedMajors.length > 0) {
      return career.relatedMajors;
    }
    // Fallback: parse old string-based majors field
    if (career?.majors) {
      return career.majors.split(/[,;\n]+/).map((m, idx) => ({
        id: idx,
        majorCode: '',
        majorName: m.trim(),
        isPrimary: false,
      })).filter(m => m.majorName);
    }
    return [];
  }, [career?.relatedMajors, career?.majors]);

  const visibleMajors = showAllMajors ? allMajors : allMajors.slice(0, MAJORS_INITIAL_COUNT);
  const hasMoreMajors = allMajors.length > MAJORS_INITIAL_COUNT;

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

  const isSaved = savedCareers.includes(career.careerId.toString());
  const demandInfo = career.demand_level ? DEMAND_LABELS[career.demand_level] : null;

  // Split responsibilities
  const responsibilitiesList = career.responsibilities
    ? career.responsibilities.split(/[;\n]+/).map(r => r.trim()).filter(Boolean)
    : [];

  return (
    <div className="space-y-12 py-10 px-4 max-w-6xl mx-auto">
      {/* Hero Header */}
      <header className="relative h-[280px] md:h-[380px] rounded-3xl overflow-hidden shadow-lg shadow-slate-200/20 dark:shadow-none">
        <img
          src={career.image || DEFAULT_IMAGE}
          alt={career.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex flex-col justify-end p-6 md:p-10">
          <div className="max-w-4xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-primary text-white text-xs font-black uppercase tracking-wider rounded-full shadow-sm">
                Xu hướng 2025
              </span>
              <button
                onClick={() =>
                  isSaved ? unsaveCareer(career.careerId.toString()) : saveCareer(career.careerId.toString())
                }
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md transition-all font-bold text-xs md:text-sm ${
                  isSaved 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
                }`}
              >
                <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                {isSaved ? 'Đã lưu ngành' : 'Lưu ngành'}
              </button>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
              {career.name}
            </h1>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left Column) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-8">
                  {/* Overview & Stats */}
                  <section className="space-y-6">
                    <p className="text-base md:text-lg text-slate-650 dark:text-slate-400 leading-relaxed font-medium">
                      {career.description}
                    </p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                        <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                          <DollarSign className="text-primary" size={24} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase mb-0.5 tracking-wider">
                            Lương trung bình
                          </p>
                          <p className="text-xl md:text-2xl font-black text-primary">
                            {career.min_salary && career.max_salary
                              ? `${(Number(career.min_salary) / 1000000).toFixed(0)} - ${(Number(career.max_salary) / 1000000).toFixed(0)} triệu VND`
                              : 'Chưa cập nhật'}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                        <div className="p-3 bg-emerald-500/10 rounded-xl shrink-0">
                          <BarChart2 className="text-emerald-500" size={24} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase mb-0.5 tracking-wider">
                            Nhu cầu thị trường
                          </p>
                          <p className={`text-xl md:text-2xl font-black ${demandInfo ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>
                            {demandInfo ? demandInfo.label : 'Chưa cập nhật'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Daily Responsibilities */}
                  <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
                    <h3 className="font-extrabold text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <Briefcase className="text-primary" size={20} /> Công việc chính hàng ngày
                    </h3>
                    {responsibilitiesList.length > 0 ? (
                      <ul className="space-y-3.5">
                        {responsibilitiesList.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-650 dark:text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                            <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 shrink-0 mt-1">
                              <Check size={12} className="stroke-[3]" />
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center gap-2.5 p-5 bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-450 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl text-sm md:text-base">
                        <AlertCircle size={18} className="text-slate-400 shrink-0" />
                        <span>Chưa có dữ liệu công việc chính cho nghề này.</span>
                      </div>
                    )}
                  </section>
                  {/* Majors Section */}
                  <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <GraduationCap className="text-primary" size={22} /> Ngành học phù hợp
                      </h3>
                      {allMajors.length > 0 && (
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                          {allMajors.length} ngành
                        </span>
                      )}
                    </div>
                    {allMajors.length > 0 ? (
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2.5">
                          {visibleMajors.map((major) => (
                            <span
                              key={major.id}
                              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-sm transition-colors shadow-xs ${
                                major.isPrimary
                                  ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30 text-primary hover:bg-primary/15'
                                  : 'bg-slate-50 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                              title={major.majorCode ? `Mã ngành: ${major.majorCode}` : undefined}
                            >
                              <GraduationCap size={15} className={major.isPrimary ? 'text-primary' : 'text-slate-400'} />
                              {major.majorName}
                              {major.majorCode && (
                                <span className="text-[11px] font-semibold opacity-50 ml-0.5">({major.majorCode})</span>
                              )}
                            </span>
                          ))}
                        </div>
                        {hasMoreMajors && (
                          <button
                            onClick={() => setShowAllMajors(!showAllMajors)}
                            className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer mt-1"
                          >
                            {showAllMajors ? (
                              <><ChevronUp size={16} /> Thu gọn</>
                            ) : (
                              <><ChevronDown size={16} /> Xem thêm {allMajors.length - MAJORS_INITIAL_COUNT} ngành khác</>
                            )}
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5 p-5 bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-450 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl text-sm md:text-base">
                        <AlertCircle size={18} className="text-slate-400 shrink-0" />
                        <span>Chưa có dữ liệu ngành học đề xuất cho nghề này.</span>
                      </div>
                    )}
                  </section>
          </div>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="space-y-8">
          {/* Mentor Suggestions */}
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 md:p-8 space-y-6">
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-150 flex items-center gap-2">
              <Users className="text-primary" /> Mentor gợi ý
            </h3>
            <div className="space-y-4">
              {mentorsLoading ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="animate-spin text-primary" size={24} />
                </div>
              ) : mentors.length > 0 ? (
                mentors.map((mentor) => (
                  <div
                    key={mentor.userId}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-xs"
                  >
                    <img
                      src={mentor.image || `https://i.pravatar.cc/150?u=${mentor.userId}`}
                      alt={mentor.fullName}
                      className="size-11 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-sm text-slate-800 dark:text-slate-150 truncate">{mentor.fullName}</p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{mentor.role}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleMentorChat(mentor)}
                      disabled={chatLoadingId === mentor.userId}
                      title={user ? 'Chat với mentor' : 'Đăng nhập để chat'}
                      className="text-primary hover:scale-115 transition-transform shrink-0 disabled:opacity-50"
                    >
                      {chatLoadingId === mentor.userId ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <ArrowRight size={18} />
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2.5 p-4 bg-white/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-450 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl text-sm">
                  <AlertCircle size={16} className="text-slate-400 shrink-0" />
                  <span>Chưa có mentor cho ngành nghề này.</span>
                </div>
              )}
            </div>
          </div>

          {/* Back Button */}
          <Link
            to="/careers"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-slate-200 dark:border-slate-800 font-extrabold text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors shadow-xs"
          >
            <ArrowLeft size={16} /> Xem tất cả ngành nghề
          </Link>
        </div>
      </div>
    </div>
  );
}
