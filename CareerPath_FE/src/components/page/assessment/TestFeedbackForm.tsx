import { useState } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';
import { testAttemptApi } from '../../../api/testAttemptApi';
import { toast } from '../../../store/useToastStore';

interface TestFeedbackFormProps {
  attemptId: number;
  onSubmitted?: () => void;
}

export function TestFeedbackForm({ attemptId, onSubmitted }: TestFeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating < 1 || rating > 5) {
      toast.warning('Vui lòng chọn số sao từ 1 đến 5');
      return;
    }

    try {
      setSubmitting(true);
      await testAttemptApi.submitFeedback(attemptId, {
        rating,
        feedback: feedback.trim() || undefined,
      });
      setSubmitted(true);
      toast.success('Cảm ơn bạn đã đánh giá bài test!');
      onSubmitted?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gửi đánh giá thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center">
        <p className="text-emerald-600 dark:text-emerald-400 font-bold">
          Bạn đã gửi đánh giá cho lần làm bài này. Cảm ơn phản hồi của bạn!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
      <div>
        <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
          Đánh giá bài test
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Chia sẻ trải nghiệm của bạn để chúng tôi cải thiện bài đánh giá.
        </p>
      </div>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              size={28}
              className={
                star <= (hoverRating || rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-300 dark:text-slate-600'
              }
            />
          </button>
        ))}
        <span className="ml-2 text-sm font-bold text-slate-500">
          {rating > 0 ? `${rating}/5 sao` : 'Chọn số sao'}
        </span>
      </div>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Nhận xét thêm về bài test (không bắt buộc)..."
        maxLength={1000}
        rows={4}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
      />

      <button
        onClick={handleSubmit}
        disabled={submitting || rating === 0}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        Gửi đánh giá
      </button>
    </div>
  );
}
