import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { useStore } from '../../../store/useStore';
import { careers, mentors } from '../../../api/mockData';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingDown, Lightbulb, UserPlus, FileText } from 'lucide-react';

export default function ResultPage() {
  const { testResult, preTestResult, theme } = useStore();

  if (!testResult) return <div>Vui lòng hoàn thành bài test.</div>;

  const data = [
    { trait: 'LOGIC', actual: testResult.logic, perception: preTestResult?.logic || 50 },
    { trait: 'CREATIVITY', actual: testResult.creativity, perception: preTestResult?.creativity || 50 },
    { trait: 'COMMUNICATION', actual: testResult.communication, perception: preTestResult?.communication || 50 },
    { trait: 'DISCIPLINE', actual: testResult.discipline, perception: preTestResult?.discipline || 50 },
    { trait: 'TEAMWORK', actual: testResult.teamwork, perception: preTestResult?.teamwork || 50 },
    { trait: 'SELF-LEARNING', actual: testResult.selfLearning, perception: preTestResult?.selfLearning || 50 },
  ];

  const bias = Math.round(
    Object.keys(testResult).reduce((acc, key) => acc + Math.abs((testResult as any)[key] - (preTestResult as any)[key]), 0) / 6
  );

  return (
    <div className="space-y-12 py-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            Phân tích chuyên sâu
          </span>
          <h1 className="text-4xl font-black tracking-tight">Kết quả: Nhận thức vs Thực tế</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
            Khám phá khoảng cách giữa cách bạn tự đánh giá bản thân và kết quả thực tế.
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-slate-500 text-sm font-medium mb-1">Khoảng cách Bias</span>
          <div className="text-4xl font-black text-primary flex items-center gap-2">
            {bias}% <TrendingDown className="text-green-500" />
          </div>
          <span className="text-xs text-slate-400">Giảm 5% so với tháng trước</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
          <h3 className="font-bold text-lg mb-8">Biểu đồ Radar Năng lực</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                <PolarAngleAxis dataKey="trait" tick={{ fill: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: 12 }} />
                <Radar
                  name="Perception"
                  dataKey="perception"
                  stroke={theme === 'dark' ? '#475569' : '#94a3b8'}
                  fill={theme === 'dark' ? '#475569' : '#94a3b8'}
                  fillOpacity={0.1}
                  strokeDasharray="4 4"
                />
                <Radar
                  name="Actual"
                  dataKey="actual"
                  stroke="#6467f2"
                  fill="#6467f2"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-slate-400 border-t border-dashed"></span>
              <span className="text-xs text-slate-500">Nhận thức</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-primary rounded-full"></span>
              <span className="text-xs text-slate-500">Thực tế</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-8 rounded-lg bg-primary text-white flex items-center justify-center">
                <Lightbulb size={18} />
              </div>
              <h3 className="font-bold text-primary">AI Insight</h3>
            </div>
            <p className="text-lg leading-relaxed mb-4 italic">
              "Bạn nghĩ mình rất kỷ luật (85%), nhưng thực tế kết quả cho thấy bạn linh hoạt hơn (62%)."
            </p>
            <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg text-sm text-slate-600 dark:text-slate-400 border border-primary/10">
              Khoảng cách này cho thấy tiềm năng lớn ở các vị trí cần sự ứng biến nhanh thay vì chỉ làm việc theo quy trình cố định.
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="font-bold flex items-center gap-2">
              <ArrowRight className="text-amber-500" /> Khám phá tiếp theo
            </h4>
            <div className="space-y-2">
              <Link to="/careers" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <div className="size-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center"><FileText size={18} /></div>
                <div>
                  <p className="font-semibold text-sm">Xem Roadmap hành động</p>
                  <p className="text-xs text-slate-500">Lộ trình rèn luyện để cân bằng Bias</p>
                </div>
              </Link>
              <Link to="/mentors" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <div className="size-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center"><UserPlus size={18} /></div>
                <div>
                  <p className="font-semibold text-sm">Kết nối Mentor phù hợp</p>
                  <p className="text-xs text-slate-500">Học hỏi từ những người đi trước</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Gợi ý nghề nghiệp phù hợp</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {careers.map(career => (
            <Link key={career.id} to={`/careers/${career.id}`} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                <img src={career.image} alt={career.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{career.vietnameseName}</h3>
                  <p className="text-sm text-slate-500">{career.name}</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{career.description}</p>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="text-primary">Lương: {career.salary}</span>
                  <span className="text-emerald-500">Tăng trưởng: {career.growth}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
