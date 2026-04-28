import { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar as RadarArea } from 'recharts';
import { useStore } from '../../../store/useStore';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingDown, Lightbulb, UserPlus, FileText, Loader2 } from 'lucide-react';

export default function ResultPage() {
  const { testResult, assessmentResult, preTestResult, theme } = useStore();

  if (!testResult || !assessmentResult) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400">
          <FileText size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Chưa có kết quả đánh giá</h2>
          <p className="text-slate-500 max-w-sm">
            Bạn cần hoàn thành bài kiểm tra năng lực để AI phân tích lộ trình phù hợp.
          </p>
        </div>
        <Link to="/full-test" className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/20">
          Làm bài test ngay
        </Link>
      </div>
    );
  }


  const data = [
    { trait: 'LOGIC', actual: testResult.logic, perception: preTestResult?.logic || 50 },
    { trait: 'CREATIVITY', actual: testResult.creativity, perception: preTestResult?.creativity || 50 },
    { trait: 'COMMUNICATION', actual: testResult.communication, perception: preTestResult?.communication || 50 },
    { trait: 'DISCIPLINE', actual: testResult.discipline, perception: preTestResult?.discipline || 50 },
    { trait: 'TEAMWORK', actual: testResult.teamwork, perception: preTestResult?.teamwork || 50 },
    { trait: 'SELF-LEARNING', actual: testResult.selfLearning, perception: preTestResult?.selfLearning || 50 },
  ];

  const topFactors = Object.entries(assessmentResult.factorScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="space-y-12 py-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            Phan tich chuyen sau
          </span>
          <h1 className="text-4xl font-black tracking-tight">Ket qua danh gia nang luc</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
            Backend da tinh toan profile cua ban, doi chieu nghe phu hop va xin them nhan xet tu AI.
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-slate-500 text-sm font-medium mb-1">Khoang cach Bias</span>
          <div className="text-4xl font-black text-primary flex items-center gap-2">
            {assessmentResult.biasPercentage}% <TrendingDown className="text-green-500" />
          </div>
          <span className="text-xs text-slate-400">So sanh giua nhan thuc ban dau va ket qua thuc te</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
          <h3 className="font-bold text-lg mb-8">Bieu do Radar nang luc</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                <PolarAngleAxis dataKey="trait" tick={{ fill: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: 12 }} />
                <RadarArea
                  name="Perception"
                  dataKey="perception"
                  stroke={theme === 'dark' ? '#475569' : '#94a3b8'}
                  fill={theme === 'dark' ? '#475569' : '#94a3b8'}
                  fillOpacity={0.1}
                  strokeDasharray="4 4"
                />
                <RadarArea
                  name="Actual"
                  dataKey="actual"
                  stroke="#6467f2"
                  fill="#6467f2"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {topFactors.map(([factor, score]) => (
              <span key={factor} className="px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium">
                {factor}: {score}%
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-8 rounded-lg bg-primary text-white flex items-center justify-center">
                <Lightbulb size={18} />
              </div>
              <h3 className="font-bold text-primary">{assessmentResult.insight.headline}</h3>
            </div>
            <p className="text-lg leading-relaxed mb-4 italic">
              {assessmentResult.insight.summary}
            </p>
            <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg text-sm text-slate-600 dark:text-slate-400 border border-primary/10">
              {assessmentResult.insight.recommendation}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="font-bold flex items-center gap-2">
              <ArrowRight className="text-amber-500" /> Kham pha tiep theo
            </h4>
            <div className="space-y-2">
              <Link to="/careers" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <div className="size-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center"><FileText size={18} /></div>
                <div>
                  <p className="font-semibold text-sm">Xem thu vien nghe nghiep</p>
                  <p className="text-xs text-slate-500">So sanh them roadmap va mo ta cong viec</p>
                </div>
              </Link>
              <Link to="/mentors" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <div className="size-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center"><UserPlus size={18} /></div>
                <div>
                  <p className="font-semibold text-sm">Ket noi mentor phu hop</p>
                  <p className="text-xs text-slate-500">Nhan huong dan hoc tap va phat trien ky nang</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Nghe nghiep phu hop</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {assessmentResult.recommendedCareers.map((career) => (
            <Link
              key={career.careerId}
              to={`/careers/${career.careerId}`}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
            >
              <div className="p-6 flex-1 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{career.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-2">{career.description}</p>
                  </div>
                  <div className="shrink-0 px-3 py-2 rounded-xl bg-primary/10 text-primary font-bold">
                    {career.matchScore}%
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
