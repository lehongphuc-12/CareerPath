import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/useStore';
import { assessmentApi } from '../../../api/assessmentApi';
import { Question } from '../../../types/assessment';
import { ArrowLeft, Info, Loader2 } from 'lucide-react';

export default function FullTestPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setTestResult, setAssessmentResult, preTestResult, addXP } = useStore();
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

  const [loadingStep, setLoadingStep] = useState(0);

  const loadingPhrases = [
    "Đang tổng hợp câu trả lời...",
    "AI đang phân tích thế mạnh của bạn...",
    "Đang đối chiếu dữ liệu với 100+ ngành nghề...",
    "Đang chuẩn bị lộ trình phát triển..."
  ];

  const submitAssessment = async (selectedAnswers: number[]) => {
    try {
      setSubmitting(true);
      setError(null);

      const stepInterval = setInterval(() => {
        setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
      }, 1000);

      const payload = selectedAnswers
        .map((choiceId, index) => {
          const question = questions[index];
          if (!question || choiceId == null) {
            return null;
          }

          return {
            questionId: question.questionId,
            choiceId,
          };
        })
        .filter((item): item is { questionId: number; choiceId: number } => item !== null);

      const result = await assessmentApi.submitAssessment(payload, preTestResult);
      
      await new Promise((resolve) => setTimeout(resolve, 4000));
      clearInterval(stepInterval);

      setAssessmentResult(result);
      setTestResult(result.traitScores);
      addXP(50);
      navigate('/result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Khong the nop bai test.');
      setSubmitting(false);
    }
  };

  const handleAnswer = (optionId: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = optionId;
    setAnswers(newAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  if (submitting) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6">
        <div className="relative flex items-center justify-center">
          <div className="absolute size-24 bg-primary/20 rounded-full animate-ping" />
          <div className="size-12 bg-primary rounded-full flex items-center justify-center text-white relative">
            <Loader2 className="animate-spin" size={24} />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold animate-pulse">{loadingPhrases[loadingStep]}</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Hệ thống AI đang tính toán kết quả và đối chiếu lộ trình phù hợp cho bạn.
          </p>
        </div>
      </div>
    );
  }

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
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Tien do</span>
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
                onClick={() => !submitting && handleAnswer(option.choiceId)}
                disabled={submitting}
                className={`group relative flex items-center p-5 rounded-xl border-2 bg-slate-50 dark:bg-slate-800/30 transition-all text-left disabled:opacity-70 ${
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
          disabled={currentIdx === 0 || submitting}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
        >
          <ArrowLeft size={20} /> Quay lại
        </button>

        {currentIdx === questions.length - 1 ? (
          <button
            onClick={() => submitAssessment(answers)}
            disabled={submitting || answers[currentIdx] === undefined}
            className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            Nộp bài
          </button>
        ) : (
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Info size={16} /> {submitting ? 'Đang phân tích kết quả...' : 'Lựa chọn của bạn giúp AI định hướng chính xác hơn.'}
          </div>
        )}
      </div>
    </div>
  );
}
