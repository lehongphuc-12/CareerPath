import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  Loader2,
  Eye,
  X,
  Star,
  Brain,
  Calendar,
  User,
  Mail,
  MessageSquare,
  Filter,
} from 'lucide-react';
import { toast } from '../../../../store/useToastStore';
import { testDashboardApi } from '../../../../api/testDashboardApi';
import { AdminTestAttemptDetail, AdminTestAttemptListItem } from '../../../../types/testAttempt';

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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}
        />
      ))}
      <span className="ml-1 text-xs font-bold text-slate-500">{rating}/5</span>
    </div>
  );
}

function DetailModal({
  attemptId,
  onClose,
}: {
  attemptId: number;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<AdminTestAttemptDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testDashboardApi
      .getAttemptDetail(attemptId)
      .then(setDetail)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [attemptId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold">Chi tiết kết quả bài test</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] space-y-6">
          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          )}

          {detail && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase">Người dùng</p>
                  <p className="font-bold flex items-center gap-2">
                    <User size={16} className="text-primary" /> {detail.userName}
                  </p>
                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    <Mail size={14} /> {detail.userEmail}
                  </p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-2">
                  <p className="text-xs font-bold text-primary uppercase">Kết quả MBTI</p>
                  <p className="text-4xl font-black text-primary">{detail.mbtiType}</p>
                  <p className="text-sm text-slate-500">
                    {detail.completedQuestions}/{detail.totalQuestions} câu · {formatDate(detail.completedAt)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-center text-xs">
                {[
                  ['E', detail.scoreE], ['I', detail.scoreI],
                  ['S', detail.scoreS], ['N', detail.scoreN],
                  ['T', detail.scoreT], ['F', detail.scoreF],
                  ['J', detail.scoreJ], ['P', detail.scoreP],
                ].map(([label, score]) => (
                  <div key={label as string} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2">
                    <span className="font-black text-primary">{label}</span>
                    <p className="font-bold">{score}</p>
                  </div>
                ))}
              </div>

              {detail.resultSummary && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Tóm tắt kết quả</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                    {detail.resultSummary}
                  </p>
                </div>
              )}

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase text-amber-600 mb-3 flex items-center gap-2">
                  <MessageSquare size={14} /> Đánh giá & Feedback
                </h4>
                {detail.feedback ? (
                  <div className="space-y-2">
                    <StarRating rating={detail.feedback.rating} />
                    {detail.feedback.feedback ? (
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                        "{detail.feedback.feedback}"
                      </p>
                    ) : (
                      <p className="text-sm text-slate-400">Không có nhận xét thêm</p>
                    )}
                    <p className="text-xs text-slate-400">
                      Gửi lúc: {formatDate(detail.feedback.createdAt)}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">User chưa gửi đánh giá cho lần làm bài này</p>
                )}
              </div>

              <div>
                <h4 className="text-sm font-bold mb-3">Câu trả lời ({detail.answers.length})</h4>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {detail.answers.map((answer, idx) => (
                    <div key={answer.questionId} className="text-xs bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                      <span className="font-bold text-slate-400">#{idx + 1}</span>{' '}
                      {answer.questionContent}
                      <p className="text-primary font-medium mt-1">→ {answer.choiceContent}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TestResultManagement() {
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState<AdminTestAttemptListItem[]>([]);
  const [search, setSearch] = useState('');
  const [mbtiFilter, setMbtiFilter] = useState('');
  const [feedbackFilter, setFeedbackFilter] = useState<'all' | 'with' | 'without'>('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    testDashboardApi
      .getAllAttempts()
      .then(setAttempts)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const mbtiTypes = useMemo(
    () => [...new Set(attempts.map((a) => a.mbtiType).filter(Boolean))].sort(),
    [attempts]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return attempts.filter((a) => {
      const matchSearch =
        !q ||
        a.userName?.toLowerCase().includes(q) ||
        a.userEmail?.toLowerCase().includes(q) ||
        a.mbtiType?.toLowerCase().includes(q);
      const matchMbti = !mbtiFilter || a.mbtiType === mbtiFilter;
      const matchFeedback =
        feedbackFilter === 'all' ||
        (feedbackFilter === 'with' && a.hasFeedback) ||
        (feedbackFilter === 'without' && !a.hasFeedback);
      return matchSearch && matchMbti && matchFeedback;
    });
  }, [attempts, search, mbtiFilter, feedbackFilter]);

  if (loading) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black flex items-center gap-2">
          <Brain className="text-primary" /> Kết quả bài test MBTI
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Xem kết quả làm bài, rating và feedback của tất cả người dùng
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, email, MBTI..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="relative">
          <select
            value={mbtiFilter}
            onChange={(e) => setMbtiFilter(e.target.value)}
            className="pl-3 pr-8 py-3 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer font-medium min-w-[140px]"
          >
            <option value="">Tất cả MBTI</option>
            {mbtiTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
        </div>
        <select
          value={feedbackFilter}
          onChange={(e) => setFeedbackFilter(e.target.value as 'all' | 'with' | 'without')}
          className="px-4 py-3 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer font-medium"
        >
          <option value="all">Tất cả feedback</option>
          <option value="with">Đã đánh giá</option>
          <option value="without">Chưa đánh giá</option>
        </select>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black">{attempts.length}</p>
          <p className="text-xs text-slate-400 font-bold uppercase mt-1">Tổng lượt</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-amber-500">
            {attempts.filter((a) => a.hasFeedback).length}
          </p>
          <p className="text-xs text-slate-400 font-bold uppercase mt-1">Có feedback</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-primary">
            {attempts.filter((a) => a.rating).length > 0
              ? (
                  attempts
                    .filter((a) => a.rating)
                    .reduce((sum, a) => sum + (a.rating || 0), 0) /
                  attempts.filter((a) => a.rating).length
                ).toFixed(1)
              : '—'}
          </p>
          <p className="text-xs text-slate-400 font-bold uppercase mt-1">Rating TB</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden premium-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-left">
                <th className="px-5 py-4 font-bold text-slate-500 uppercase text-xs">User</th>
                <th className="px-5 py-4 font-bold text-slate-500 uppercase text-xs">MBTI</th>
                <th className="px-5 py-4 font-bold text-slate-500 uppercase text-xs">Hoàn thành</th>
                <th className="px-5 py-4 font-bold text-slate-500 uppercase text-xs">Ngày</th>
                <th className="px-5 py-4 font-bold text-slate-500 uppercase text-xs">Rating</th>
                <th className="px-5 py-4 font-bold text-slate-500 uppercase text-xs">Feedback</th>
                <th className="px-5 py-4 font-bold text-slate-500 uppercase text-xs text-right">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                    Không có kết quả phù hợp
                  </td>
                </tr>
              ) : (
                filtered.map((attempt) => (
                  <tr key={attempt.attemptId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-800 dark:text-slate-100">{attempt.userName}</p>
                      <p className="text-xs text-slate-400">{attempt.userEmail}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-black text-sm">
                        {attempt.mbtiType}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-400">
                      {attempt.completedQuestions}/{attempt.totalQuestions}
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {formatDate(attempt.completedAt)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {attempt.rating ? (
                        <StarRating rating={attempt.rating} />
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 max-w-[200px]">
                      {attempt.feedback ? (
                        <p className="text-xs text-slate-500 line-clamp-2 italic">"{attempt.feedback}"</p>
                      ) : (
                        <span className="text-xs text-slate-400">Chưa có</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedId(attempt.attemptId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        <Eye size={14} /> Xem
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedId && (
        <DetailModal attemptId={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
