import React, { useState } from 'react';
import { History, Loader2, Eye, Star, X, Calendar, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTestHistory, useTestAttemptDetail } from '../../../../hooks/useTestHistory';
import { TestAttemptListItem } from '../../../../types/testAttempt';

function formatDate(dateStr: string) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function AttemptDetailModal({
  attemptId,
  onClose,
}: {
  attemptId: number;
  onClose: () => void;
}) {
  const { detail, loading, error } = useTestAttemptDetail(attemptId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Chi tiết lần làm bài
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)] space-y-6">
          {loading && (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          )}

          {error && (
            <p className="text-red-500 text-center py-8">{error}</p>
          )}

          {detail && (
            <>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-4xl font-black text-primary">{detail.mbtiType}</span>
                <div className="space-y-1">
                  <p className="font-bold text-slate-800 dark:text-slate-100">{detail.testName}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <Calendar size={14} /> {formatDate(detail.completedAt)}
                  </p>
                  <p className="text-sm text-slate-500">
                    Hoàn thành {detail.completedQuestions}/{detail.totalQuestions} câu
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {[
                  ['E', detail.scoreE],
                  ['I', detail.scoreI],
                  ['S', detail.scoreS],
                  ['N', detail.scoreN],
                  ['T', detail.scoreT],
                  ['F', detail.scoreF],
                  ['J', detail.scoreJ],
                  ['P', detail.scoreP],
                ].map(([label, score]) => (
                  <div
                    key={label as string}
                    className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2"
                  >
                    <span className="font-black text-primary">{label}</span>
                    <p className="font-bold text-slate-700 dark:text-slate-300">{score}</p>
                  </div>
                ))}
              </div>

              {detail.resultSummary && (
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase text-primary mb-2">Tóm tắt kết quả</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                    {detail.resultSummary}
                  </p>
                </div>
              )}

              {detail.feedback && (
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: detail.feedback.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {detail.feedback.feedback && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">{detail.feedback.feedback}</p>
                  )}
                </div>
              )}

              <div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                  Câu trả lời ({detail.answers.length})
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {detail.answers.map((answer, idx) => (
                    <div
                      key={answer.questionId}
                      className="text-xs bg-slate-50 dark:bg-slate-800 rounded-xl p-3"
                    >
                      <span className="font-bold text-slate-400">#{idx + 1}</span>{' '}
                      <span className="text-slate-700 dark:text-slate-300">{answer.questionContent}</span>
                      <p className="text-primary font-medium mt-1">→ {answer.choiceContent}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function AttemptCard({
  attempt,
  onView,
}: {
  attempt: TestAttemptListItem;
  onView: () => void;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-primary/30 transition-all group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-lg font-black text-primary">{attempt.mbtiType}</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">{attempt.testName}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <Calendar size={12} /> {formatDate(attempt.completedAt)}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {attempt.completedQuestions}/{attempt.totalQuestions} câu hoàn thành
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {attempt.hasFeedback && (
            <span className="text-[10px] font-bold uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Đã đánh giá
            </span>
          )}
          <button
            onClick={onView}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <Eye size={14} /> Xem chi tiết
          </button>
        </div>
      </div>
      {attempt.resultSummary && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
          {attempt.resultSummary.split('\n').slice(1).join(' ').trim() || attempt.resultSummary}
        </p>
      )}
    </div>
  );
}

export const HistoryTab: React.FC = () => {
  const { attempts, loading, error } = useTestHistory();
  const [selectedAttemptId, setSelectedAttemptId] = useState<number | null>(null);

  return (
    <motion.div
      key="history-tab"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Brain className="text-primary" size={24} />
          Lịch sử làm bài test
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Xem lại các lần làm bài MBTI và kết quả của bạn
        </p>
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={36} />
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}

      {!loading && !error && attempts.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl premium-shadow p-8 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <History className="w-10 h-10 text-slate-400" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Bạn chưa làm bài test nào
          </p>
        </div>
      )}

      {!loading && !error && attempts.length > 0 && (
        <div className="space-y-4">
          {attempts.map((attempt) => (
            <AttemptCard
              key={attempt.attemptId}
              attempt={attempt}
              onView={() => setSelectedAttemptId(attempt.attemptId)}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedAttemptId && (
          <AttemptDetailModal
            attemptId={selectedAttemptId}
            onClose={() => setSelectedAttemptId(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
