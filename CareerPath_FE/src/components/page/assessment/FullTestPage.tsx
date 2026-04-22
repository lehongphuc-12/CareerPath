import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/useStore';
import { assessmentApi } from '../../../api/assessmentApi';
import { Question } from '../../../types/assessment';
import { ArrowLeft, Info } from 'lucide-react';

export default function FullTestPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setTestResult, addXP } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await assessmentApi.getQuestions();
        setQuestions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Khong the tai danh sach cau hoi.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentIdx] || questions[0];
  const progress = questions.length ? ((currentIdx + 1) / questions.length) * 100 : 0;

  const buildResult = (selectedAnswers: number[]) => {
    const scoresByDimension = {
      MBTI: [] as number[],
      LOGIC: [] as number[],
      INTEREST: [] as number[],
    };

    selectedAnswers.forEach((answerId, index) => {
      const question = questions[index];
      const choice = question?.choices.find((item) => item.choiceId === answerId);

      if (!question || !choice) {
        return;
      }

      if (question.dimension === 'MBTI') {
        scoresByDimension.MBTI.push(choice.scoreValue);
      } else if (question.dimension === 'LOGIC') {
        scoresByDimension.LOGIC.push(choice.scoreValue);
      } else if (question.dimension === 'INTEREST') {
        scoresByDimension.INTEREST.push(choice.scoreValue);
      }
    });

    const averageToPercent = (values: number[]) => {
      if (!values.length) {
        return 0;
      }

      const average = values.reduce((sum, value) => sum + value, 0) / values.length;
      return Math.round((average / 5) * 100);
    };

    const mbtiScore = averageToPercent(scoresByDimension.MBTI);
    const logicScore = averageToPercent(scoresByDimension.LOGIC);
    const interestScore = averageToPercent(scoresByDimension.INTEREST);
    const overallScore = averageToPercent([
      ...scoresByDimension.MBTI,
      ...scoresByDimension.LOGIC,
      ...scoresByDimension.INTEREST,
    ]);

    return {
      logic: logicScore,
      creativity: interestScore,
      communication: mbtiScore,
      discipline: overallScore,
      teamwork: mbtiScore,
      selfLearning: overallScore,
    };
  };

  const handleAnswer = (optionId: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = optionId;
    setAnswers(newAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setTestResult(buildResult(newAnswers));
      addXP(50);
      navigate('/result');
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center">
          Dang tai cau hoi...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900 rounded-2xl p-8 text-center space-y-4">
          <p className="text-red-500 font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Thu lai
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length || !currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center">
          Chua co cau hoi nao de hien thi.
        </div>
      </div>
    );
  }

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
            {currentQuestion.content}
          </h2>

          <div className="grid gap-4">
            {currentQuestion.choices.map((option) => (
              <button
                key={option.choiceId}
                onClick={() => handleAnswer(option.choiceId)}
                className={`group relative flex items-center p-5 rounded-xl border-2 bg-slate-50 dark:bg-slate-800/30 transition-all text-left ${
                  answers[currentIdx] === option.choiceId
                    ? 'border-primary'
                    : 'border-slate-100 dark:border-slate-800 hover:border-primary/50'
                }`}
              >
                <div className="size-6 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-primary flex items-center justify-center mr-4 shrink-0">
                  <div
                    className={`size-2.5 rounded-full bg-primary transition-opacity ${
                      answers[currentIdx] === option.choiceId ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </div>
                <span className="text-lg font-medium">{option.content}</span>
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
