import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/useStore';
import {
  Brain,
  Palette,
  MessageSquare,
  Timer,
  Users,
  BookOpen,
  GraduationCap,
  Trash2,
} from 'lucide-react';

const traits = [
  { id: 'logic', label: 'Tư duy Logic', icon: <Brain />, desc: 'Khả năng giải quyết vấn đề' },
  { id: 'creativity', label: 'Sáng tạo', icon: <Palette />, desc: 'Tư duy ngoài khuôn khổ' },
  { id: 'communication', label: 'Giao tiếp', icon: <MessageSquare />, desc: 'Truyền đạt ý tưởng' },
  { id: 'discipline', label: 'Kỷ luật', icon: <Timer />, desc: 'Quản lý thời gian' },
  { id: 'teamwork', label: 'Làm việc nhóm', icon: <Users />, desc: 'Phối hợp & Hỗ trợ' },
  { id: 'selfLearning', label: 'Tự học', icon: <BookOpen />, desc: 'Chủ động nghiên cứu' },
];

export default function PreTestPage() {
  const [scores, setScores] = useState<any>({
    logic: 50,
    creativity: 50,
    communication: 50,
    discipline: 50,
    teamwork: 50,
    selfLearning: 50,
  });

  const [useAcademicScores, setUseAcademicScores] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [subjectScores, setSubjectScores] = useState<
    Array<{ id: string; name: string; score: number }>
  >([
    { id: 'math', name: 'Toán học', score: 8.0 },
    { id: 'literature', name: 'Ngữ văn', score: 8.0 },
    { id: 'english', name: 'Tiếng Anh', score: 8.0 },
  ]);

  const { setPreTestResult, setAcademicScores } = useStore();
  const navigate = useNavigate();

  const handleAddSubject = () => {
    if (!newSubjectName.trim()) return;

    if (
      subjectScores.some((sub) => sub.name.toLowerCase() === newSubjectName.trim().toLowerCase())
    ) {
      alert('Môn học này đã tồn tại!');
      return;
    }

    const newSub = {
      id: Date.now().toString(),
      name: newSubjectName.trim(),
      score: 8.0,
    };

    setSubjectScores([...subjectScores, newSub]);
    setNewSubjectName('');
  };

  const handleRemoveSubject = (id: string) => {
    setSubjectScores(subjectScores.filter((sub) => sub.id !== id));
  };

  const handleScoreChange = (id: string, newScore: number) => {
    setSubjectScores(
      subjectScores.map((sub) => (sub.id === id ? { ...sub, score: newScore } : sub))
    );
  };

  const handleNext = () => {
    setPreTestResult(scores);
    if (useAcademicScores) {
      const scoresRecord: Record<string, number> = {};
      subjectScores.forEach((sub) => {
        scoresRecord[sub.name] = sub.score;
      });
      setAcademicScores(scoresRecord);
    } else {
      setAcademicScores(null);
    }
    navigate('/full-test');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 py-10">
      <section className="bg-white/5 border border-slate-200/10 dark:border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-primary text-sm font-bold uppercase tracking-wider">
                Bước 01 / 03
              </span>
              <h3 className="text-xl md:text-2xl font-bold mt-1">
                Khởi đầu: Bạn tự đánh giá mình thế nào?
              </h3>
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
          <div
            key={trait.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
          >
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

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl shadow-primary/5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
              <GraduationCap size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold">Điểm số học tập (Tùy chọn)</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Cung cấp điểm số giúp AI phân tích sâu hơn về lộ trình học vấn.
              </p>
            </div>
          </div>
          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={useAcademicScores}
              onChange={(e) => setUseAcademicScores(e.target.checked)}
            />

            {/* Toggle */}
            <div
              className={`relative w-12 h-7 rounded-full transition-colors duration-300 peer-focus:ring-2 peer-focus:ring-primary/40 ${
                useAcademicScores ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                  useAcademicScores ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </label>
        </div>

        {useAcademicScores && (
          <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex gap-3 max-w-md">
              <input
                type="text"
                placeholder="Nhập tên môn học mới..."
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary"
                onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
              />
              <button
                onClick={handleAddSubject}
                className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl text-sm font-bold transition-all"
              >
                + Thêm môn
              </button>
            </div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <AnimatePresence>
                {subjectScores.map((subject) => (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-primary/50 transition-colors group"
                  >
                    <button
                      onClick={() => handleRemoveSubject(subject.id)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="flex justify-between items-center mb-2 pr-6">
                      <span className="font-semibold text-sm truncate" title={subject.name}>
                        {subject.name}
                      </span>
                      <span className="text-primary font-bold text-sm">
                        {subject.score.toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={subject.score}
                      onChange={(e) => handleScoreChange(subject.id, parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {subjectScores.length === 0 && (
              <p className="text-center text-sm text-slate-400 py-4">
                Chưa có môn học nào. Hãy thêm môn học ở trên.
              </p>
            )}
          </div>
        )}
      </section>

      <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 rounded-xl border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Quay lại
        </button>
        <button
          onClick={handleNext}
          className="bg-primary text-white px-12 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          Tiếp tục Bước 2
        </button>
      </div>
    </div>
  );
}
