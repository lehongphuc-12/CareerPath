import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/useStore';
import { questions } from '../../../api/mockData';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';

export default function FullTestPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const { setTestResult, addXP } = useStore();
  const navigate = useNavigate();

  const currentQuestion = questions[currentIdx] || questions[0];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  const handleAnswer = (optionId: string) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = optionId;
    setAnswers(newAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate final result
      const result = { logic: 0, creativity: 0, communication: 0, discipline: 0, teamwork: 0, selfLearning: 0 };
      newAnswers.forEach((ans, i) => {
        const question = questions[i];
        const option = question.options.find(o => o.id === ans);
        if (option) {
          Object.entries(option.score).forEach(([trait, score]) => {
            (result as any)[trait] += score;
          });
        }
      });
      
      // Normalize to 100
      const maxScorePerTrait = 15; // Assuming 30 questions, distributed
      Object.keys(result).forEach(key => {
        (result as any)[key] = Math.min(100, Math.round(((result as any)[key] / maxScorePerTrait) * 100));
      });

      setTestResult(result);
      addXP(50);
      navigate('/result');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Tiến độ</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{currentIdx + 1}</span>
            <span className="text-slate-400">/ {questions.length}</span>
          </div>
        </div>
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 shadow-xl shadow-primary/5"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 leading-snug">
            {currentQuestion.text}
          </h2>

          <div className="grid gap-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className="group relative flex items-center p-5 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 hover:border-primary/50 transition-all text-left"
              >
                <div className="size-6 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-primary flex items-center justify-center mr-4 shrink-0">
                  <div className="size-2.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-lg font-medium">{option.text}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center">
        <button 
          onClick={() => currentIdx > 0 && setCurrentIdx(currentIdx - 1)}
          disabled={currentIdx === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
        >
          <ArrowLeft size={20} /> Quay lại
        </button>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Info size={16} /> Lựa chọn của bạn giúp AI định hướng chính xác hơn.
        </div>
      </div>
    </div>
  );
}
