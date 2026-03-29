import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Brain, Palette, MessageSquare, Timer, Users, BookOpen } from 'lucide-react';

const traits = [
  { id: 'logic', label: 'Tư duy Logic', icon: <Brain />, desc: 'Khả năng giải quyết vấn đề' },
  { id: 'creativity', label: 'Sáng tạo', icon: <Palette />, desc: 'Tư duy ngoài khuôn khổ' },
  { id: 'communication', label: 'Giao tiếp', icon: <MessageSquare />, desc: 'Truyền đạt ý tưởng' },
  { id: 'discipline', label: 'Kỷ luật', icon: <Timer />, desc: 'Quản lý thời gian' },
  { id: 'teamwork', label: 'Làm việc nhóm', icon: <Users />, desc: 'Phối hợp & Hỗ trợ' },
  { id: 'selfLearning', label: 'Tự học', icon: <BookOpen />, desc: 'Chủ động nghiên cứu' }
];

export default function PreTestPage() {
  const [scores, setScores] = useState<any>({
    logic: 50, creativity: 50, communication: 50, discipline: 50, teamwork: 50, selfLearning: 50
  });
  const { setPreTestResult } = useStore();
  const navigate = useNavigate();

  const handleNext = () => {
    setPreTestResult(scores);
    navigate('/full-test');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 py-10">
      <section className="bg-white/5 border border-slate-200/10 dark:border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-primary text-sm font-bold uppercase tracking-wider">Bước 01 / 03</span>
              <h3 className="text-xl md:text-2xl font-bold mt-1">Khởi đầu: Bạn tự đánh giá mình thế nào?</h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">33% hoàn thành</p>
          </div>
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary via-purple-500 to-orange-400 w-1/3 rounded-full"></div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {traits.map((trait) => (
          <div key={trait.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:scale-110 transition-transform">
                {trait.icon}
              </div>
              <span className="font-bold text-lg">{trait.label}</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-400">{trait.desc}</span>
                <span className="text-primary font-bold">{scores[trait.id]}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={scores[trait.id]}
                onChange={(e) => setScores({ ...scores, [trait.id]: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800">
        <button onClick={() => navigate('/')} className="px-8 py-3 rounded-xl border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          Quay lại
        </button>
        <button onClick={handleNext} className="bg-primary text-white px-12 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          Tiếp tục Bước 2
        </button>
      </div>
    </div>
  );
}
