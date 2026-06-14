import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/useStore';
import { assessmentApi } from '../../../api/assessmentApi';
import { Question } from '../../../types/assessment';
import { authService } from '../../../services/authService';
import { PATHS } from '../../../routes/paths';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, HelpCircle, Info, Loader2, LogIn, Sparkles } from 'lucide-react';

const QUESTIONS_PER_PAGE = 5;

export default function FullTestPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, setTestResult, setAssessmentResult, preTestResult, academicScores, addXP } = useStore();
  const navigate = useNavigate();

  const isAuthenticated = authService.isAuthenticated() && !!user;
  const isUserRole = user?.role?.toLowerCase() === 'user';

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await assessmentApi.getQuestions();
        setQuestions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Không thể tải danh sách câu hỏi.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center space-y-6 shadow-lg">
          <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <LogIn className="text-primary" size={28} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Yêu cầu đăng nhập</h2>
            <p className="text-slate-500">
              Bạn cần đăng nhập với tài khoản User để làm bài test MBTI và lưu lịch sử kết quả.
            </p>
          </div>
          <Link
            to={PATHS.LOGIN}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-lg transition-all"
          >
            <LogIn size={18} /> Đăng nhập ngay
          </Link>
        </div>
      </div>
    );
  }

  if (!isUserRole) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 rounded-3xl p-10 text-center space-y-4">
          <h2 className="text-xl font-bold text-amber-600">Không có quyền làm bài test</h2>
          <p className="text-slate-500">
            Chỉ tài khoản có vai trò User mới được thực hiện bài đánh giá MBTI.
          </p>
        </div>
      </div>
    );
  }

  // Smooth scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length);
  const currentPageQuestions = questions.slice(startIndex, endIndex);

  // Check how many questions are answered on this page
  const currentPageAnsweredCount = currentPageQuestions.filter((_, idx) => {
    const globalIdx = startIndex + idx;
    return answers[globalIdx] !== undefined && answers[globalIdx] !== null;
  }).length;

  const isCurrentPageComplete = currentPageAnsweredCount === currentPageQuestions.length;

  // Calculate overall progress
  const answeredCount = answers.filter((a) => a !== undefined && a !== null).length;
  const progress = questions.length ? (answeredCount / questions.length) * 100 : 0;

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

      const result = await assessmentApi.submitAssessment(payload, preTestResult, academicScores);

      await new Promise((resolve) => setTimeout(resolve, 4000));
      clearInterval(stepInterval);

      setAssessmentResult(result);
      setTestResult(result.traitScores);
      addXP(50);
      navigate('/result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể nộp bài test.');
      setSubmitting(false);
    }
  };

  const handleSelectAnswer = (globalIdx: number, optionId: number) => {
    const newAnswers = [...answers];
    newAnswers[globalIdx] = optionId;
    setAnswers(newAnswers);

    // Auto scroll to next question on the current page, or to the footer if it's the last question
    const currentQuestionLocalIdx = globalIdx - startIndex;
    if (currentQuestionLocalIdx < currentPageQuestions.length - 1) {
      const nextGlobalIdx = globalIdx + 1;
      setTimeout(() => {
        const nextEl = document.getElementById(`question-${nextGlobalIdx}`);
        if (nextEl) {
          nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      setTimeout(() => {
        const footerEl = document.getElementById('pagination-footer');
        if (footerEl) {
          footerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
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
      <div className="max-w-3xl mx-auto py-12 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-primary size-10" />
        <span className="text-slate-500 font-medium">Đang tải danh sách câu hỏi đánh giá chuyên sâu...</span>
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
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center">
          Chưa có câu hỏi nào để hiển thị.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8 px-4">
      {/* Top Banner and overall progress */}
      <section className="bg-gradient-to-r from-primary/10 to-indigo-500/10 border border-primary/20 dark:border-primary/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <Sparkles size={14} />
              <span>Bước 02 / 03</span>
            </div>
            <h3 className="text-xl font-extrabold mt-1">
              Đánh giá Năng lực chuyên sâu
            </h3>
          </div>
          <div className="text-right">
            <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold block uppercase">Trang</span>
            <span className="text-2xl font-black text-primary">
              {currentPage + 1}
            </span>
            <span className="text-slate-400 font-semibold"> / {totalPages}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Tiến trình hoàn thành: {Math.round(progress)}%</span>
            <span>Đã trả lời: {answeredCount} / {questions.length} câu</span>
          </div>
          <div className="h-3 w-full bg-slate-200/60 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Questions Stack */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {currentPageQuestions.map((q, idx) => {
            const globalIdx = startIndex + idx;
            const isAnswered = answers[globalIdx] !== undefined && answers[globalIdx] !== null;

            return (
              <div
                key={q.questionId}
                id={`question-${globalIdx}`}
                className={`bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-md transition-all duration-300 ${isAnswered
                    ? 'border-emerald-500/20 shadow-emerald-500/5 bg-emerald-50/5 dark:bg-emerald-950/5'
                    : 'border-slate-200 dark:border-slate-800/80 shadow-slate-200/10 hover:border-primary/20'
                  }`}
              >
                <div className="flex items-start gap-3 mb-5">
                  <div className={`p-1.5 rounded-lg shrink-0 ${isAnswered
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-primary/10 text-primary'
                    }`}>
                    {isAnswered ? <CheckCircle2 size={18} /> : <HelpCircle size={18} />}
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wide block ${isAnswered ? 'text-emerald-500' : 'text-slate-400'
                      }`}>
                      Câu hỏi {globalIdx + 1}
                    </span>
                    <h4 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100 mt-1 leading-snug">
                      {q.content}
                    </h4>
                  </div>
                </div>

                <div className="flex flex-col gap-4 py-6 w-full max-w-xl mx-auto select-none">
                  <div className="flex justify-between w-full md:hidden px-1 sm:px-4">
                    <button
                      type="button"
                      onClick={() => handleSelectAnswer(globalIdx, q.choices[q.choices.length - 1].choiceId)}
                      className="text-[11px] sm:text-xs font-extrabold text-purple-600 dark:text-purple-400 hover:scale-105 active:scale-95 transition-transform text-left"
                    >
                      Không đồng ý
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectAnswer(globalIdx, q.choices[0].choiceId)}
                      className="text-[11px] sm:text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:scale-105 active:scale-95 transition-transform text-right"
                    >
                      Đồng ý
                    </button>
                  </div>

                  <div className="flex items-center justify-center md:justify-between gap-2 sm:gap-4 md:gap-8 w-full">
                    {/* Left Label: Disagree (Desktop) */}
                    <button
                      type="button"
                      onClick={() => handleSelectAnswer(globalIdx, q.choices[q.choices.length - 1].choiceId)}
                      className="hidden md:block text-sm md:text-base font-extrabold text-purple-600 dark:text-purple-400 hover:scale-105 active:scale-95 transition-transform text-left shrink-0"
                    >
                      Không đồng ý
                    </button>

                    {/* Circles list */}
                    <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 flex-1">
                      {q.choices.map((option, choiceIdx) => {
                        const isSelected = answers[globalIdx] === option.choiceId;
                        const totalChoicesCount = q.choices.length;

                        // Calculate size
                        let sizeClass = "size-6 md:size-8";
                        let checkSize = 10;
                        if (choiceIdx === 0 || choiceIdx === totalChoicesCount - 1) {
                          sizeClass = "size-10 md:size-12";
                          checkSize = 18;
                        } else if (choiceIdx === 1 || choiceIdx === totalChoicesCount - 2) {
                          sizeClass = "size-8 md:size-10";
                          checkSize = 14;
                        }

                        // Colors based on choice index relative to midpoint
                        const midpoint = (totalChoicesCount - 1) / 2;
                        let borderStyle = "";
                        let selectedStyle = "";

                        if (choiceIdx < midpoint) {
                          // Purple/Disagree side (left = Không đồng ý)
                          borderStyle = "border-purple-500 hover:bg-purple-50/20 dark:hover:bg-purple-950/10";
                          selectedStyle = "border-purple-500 bg-purple-500/20 dark:bg-purple-500/30 text-purple-600 dark:text-purple-400";
                        } else if (choiceIdx === midpoint) {
                          // Neutral middle
                          borderStyle = "border-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/10";
                          selectedStyle = "border-slate-400 bg-slate-400/20 dark:bg-slate-400/30 text-slate-500 dark:text-slate-400";
                        } else {
                          // Green/Agree side (right = Đồng ý)
                          borderStyle = "border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10";
                          selectedStyle = "border-emerald-500 bg-emerald-500/20 dark:bg-emerald-500/30 text-emerald-600 dark:text-emerald-400";
                        }

                        return (
                          <button
                            key={option.choiceId}
                            type="button"
                            onClick={() => handleSelectAnswer(globalIdx, option.choiceId)}
                            className={`rounded-full border-2 flex items-center justify-center transition-all duration-205 cursor-pointer hover:scale-110 active:scale-95 ${sizeClass} ${isSelected ? selectedStyle : `${borderStyle} bg-transparent text-transparent`
                              }`}
                            title={option.content}
                          >
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.15 }}
                              >
                                <Check size={checkSize} className="stroke-[3.5]" />
                              </motion.div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Label: Agree (Desktop) */}
                    <button
                      type="button"
                      onClick={() => handleSelectAnswer(globalIdx, q.choices[0].choiceId)}
                      className="hidden md:block text-sm md:text-base font-extrabold text-emerald-600 dark:text-emerald-400 hover:scale-105 active:scale-95 transition-transform text-right shrink-0"
                    >
                      Đồng ý
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Footer */}
      <div
        id="pagination-footer"
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800"
      >
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0 || submitting}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft size={18} /> Quay lại
        </button>

        <div className="text-center text-sm font-medium text-slate-500">
          {!isCurrentPageComplete ? (
            <span className="text-amber-500 dark:text-amber-400 flex items-center justify-center gap-1.5 animate-pulse">
              <Info size={16} /> Hãy trả lời hết {currentPageQuestions.length - currentPageAnsweredCount} câu còn lại ở trang này
            </span>
          ) : (
            <span className="text-emerald-500 flex items-center justify-center gap-1.5">
              <CheckCircle2 size={16} /> Sẵn sàng chuyển trang tiếp theo
            </span>
          )}
        </div>

        {currentPage === totalPages - 1 ? (
          <button
            onClick={() => submitAssessment(answers)}
            disabled={submitting || !isCurrentPageComplete}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-indigo-600 text-white font-extrabold rounded-xl hover:shadow-lg hover:shadow-primary/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
          >
            Nộp bài đánh giá <Sparkles size={18} />
          </button>
        ) : (
          <button
            onClick={handleNextPage}
            disabled={!isCurrentPageComplete}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
          >
            Tiếp theo <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

