import { useParams, Link } from 'react-router-dom';
import { careers, mentors } from '../../../api/mockData';
import { Bookmark, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export default function CareerDetailPage() {
  const { id } = useParams();
  const { savedCareers, saveCareer, unsaveCareer, theme } = useStore();
  const career = careers.find(c => c.id === id);

  if (!career) return <div>Không tìm thấy ngành nghề.</div>;

  const radarData = Object.entries(career.radarData).map(([trait, value]) => ({
    trait: trait.toUpperCase(),
    value
  }));

  return (
    <div className="space-y-12 py-10">
      <header className="relative h-[400px] rounded-3xl overflow-hidden">
        <img src={career.image} alt={career.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-10">
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase rounded-full">Hot Career 2024</span>
              <button 
                onClick={() => savedCareers.includes(career.id) ? unsaveCareer(career.id) : saveCareer(career.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md transition-all ${savedCareers.includes(career.id) ? 'bg-primary text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                <Bookmark size={16} /> {savedCareers.includes(career.id) ? 'Đã lưu' : 'Lưu ngành'}
              </button>
            </div>
            <h1 className="text-5xl font-black text-white">{career.vietnameseName}</h1>
            <p className="text-xl text-slate-300">{career.name}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Tổng quan</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {career.description}
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Lương trung bình</p>
                <p className="text-2xl font-black text-primary">{career.salary}</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Tăng trưởng</p>
                <p className="text-2xl font-black text-emerald-500">{career.growth}</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Cơ hội việc làm</p>
                <p className="text-2xl font-black text-orange-500">{career.demand}</p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-bold">Lộ trình 5 năm phát triển</h2>
            <div className="relative space-y-12 before:absolute before:left-8 before:top-0 before:bottom-0 before:w-1 before:bg-slate-200 dark:before:bg-slate-800">
              {career.roadmap.map((step, i) => (
                <div key={i} className="relative pl-20">
                  <div className="absolute left-6 top-0 size-5 bg-primary rounded-full ring-4 ring-white dark:ring-background-dark"></div>
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-black text-primary uppercase tracking-widest">{step.year}</span>
                    <h4 className="text-xl font-bold mt-1">{step.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Hệ năng lực yêu cầu</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                  <PolarAngleAxis dataKey="trait" tick={{ fill: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: 10 }} />
                  <Radar name="Required" dataKey="value" stroke="#6467f2" fill="#6467f2" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Users className="text-primary" /> Mentor gợi ý
            </h3>
            <div className="space-y-4">
              {mentors.map(mentor => (
                <div key={mentor.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <img src={mentor.image} alt={mentor.name} className="size-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{mentor.name}</p>
                    <p className="text-xs text-slate-500">{mentor.role}</p>
                  </div>
                  <Link to="/mentors" className="text-primary"><ArrowRight size={18} /></Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
