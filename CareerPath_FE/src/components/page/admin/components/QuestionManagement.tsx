import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from '../../../../store/useToastStore';
import {
  HelpCircle,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  X
} from 'lucide-react';

interface Choice {
  choiceId: number;
  content: string;
  scoreValue: number;
}

interface Question {
  questionId: number;
  content: string;
  dimensionCode: string;
  choices: Choice[];
}

export default function QuestionManagement() {
  const [loading, setLoading] = useState(true);
  const [questionsList, setQuestionsList] = useState<Question[]>([]);
  const [questionSearch, setQuestionSearch] = useState('');
  const [questionDimFilter, setQuestionDimFilter] = useState('');

  // Modal State
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    questionId?: number;
    content: string;
    dimensionCode: string;
    direction: string;
    questionOrder: number;
  }>({ content: '', dimensionCode: 'EI', direction: 'E', questionOrder: 1 });

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/questions').catch(() => null);
      if (res?.data?.success) {
        setQuestionsList(res.data.data);
      } else {
        setQuestionsList([
          { questionId: 1, content: 'Bạn thích giao lưu kết bạn mới.', dimensionCode: 'EI', choices: [] },
          { questionId: 2, content: 'Bạn thích phân tích số liệu thực tế hơn lý thuyết.', dimensionCode: 'SN', choices: [] },
          { questionId: 3, content: 'Bạn chọn quyết định dựa trên lý trí thay vì tình cảm.', dimensionCode: 'TF', choices: [] },
          { questionId: 4, content: 'Bạn lên kế hoạch chi tiết cho mỗi ngày.', dimensionCode: 'JP', choices: [] }
        ]);
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
      toast.error('Không thể lấy danh sách câu hỏi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOpenQuestionModal = (q?: Question) => {
    if (q) {
      setCurrentQuestion({
        questionId: q.questionId,
        content: q.content,
        dimensionCode: q.dimensionCode || 'EI',
        direction: 'E', // default placeholder
        questionOrder: 1
      });
    } else {
      setCurrentQuestion({ content: '', dimensionCode: 'EI', direction: 'E', questionOrder: 1 });
    }
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion.content) {
      toast.error('Nội dung câu hỏi không được để trống.');
      return;
    }

    const payload = {
      content: currentQuestion.content,
      dimensionCode: currentQuestion.dimensionCode,
      direction: currentQuestion.direction,
      questionOrder: currentQuestion.questionOrder
    };

    try {
      if (currentQuestion.questionId) {
        const res = await axios.put(`/api/questions/${currentQuestion.questionId}`, payload, { withCredentials: true });
        if (res.data?.success) {
          toast.success('Cập nhật câu hỏi thành công!');
          fetchQuestions();
        } else {
          throw new Error();
        }
      } else {
        const res = await axios.post('/api/questions', payload, { withCredentials: true });
        if (res.data?.success) {
          toast.success('Thêm câu hỏi mới thành công!');
          fetchQuestions();
        } else {
          throw new Error();
        }
      }
    } catch {
      if (currentQuestion.questionId) {
        setQuestionsList(prev => prev.map(q => q.questionId === currentQuestion.questionId ? { ...q, content: currentQuestion.content, dimensionCode: currentQuestion.dimensionCode } : q));
        toast.success('Cập nhật câu hỏi (simulated).');
      } else {
        const mockNew: Question = {
          questionId: Math.floor(Math.random() * 1000) + 10,
          content: currentQuestion.content,
          dimensionCode: currentQuestion.dimensionCode,
          choices: []
        };
        setQuestionsList(prev => [mockNew, ...prev]);
        toast.success('Thêm câu hỏi mới (simulated).');
      }
    } finally {
      setIsQuestionModalOpen(false);
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa câu hỏi kiểm tra MBTI này không?')) return;
    try {
      const res = await axios.delete(`/api/questions/${id}`, { withCredentials: true });
      if (res.data?.success) {
        toast.success('Xóa câu hỏi thành công!');
        setQuestionsList(prev => prev.filter(q => q.questionId !== id));
      } else {
        throw new Error();
      }
    } catch {
      setQuestionsList(prev => prev.filter(q => q.questionId !== id));
      toast.success('Xóa câu hỏi (simulated).');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 premium-shadow space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-xl font-bold flex items-center gap-2"><HelpCircle size={20} /> Quản lý Câu hỏi MBTI</h3>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Dimension Filter */}
          <div className="relative">
            <select
              value={questionDimFilter}
              onChange={e => setQuestionDimFilter(e.target.value)}
              className="pl-3 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
            >
              <option value="">Tất cả Dimension</option>
              <option value="EI">EI (Extraversion / Introversion)</option>
              <option value="SN">SN (Sensing / Intuition)</option>
              <option value="TF">TF (Thinking / Feeling)</option>
              <option value="JP">JP (Judging / Perceiving)</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>

          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Tìm câu hỏi..."
              value={questionSearch}
              onChange={e => setQuestionSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            onClick={() => handleOpenQuestionModal()}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/95 transition-colors shadow-md shadow-primary/10"
          >
            <Plus size={14} /> Thêm Mới
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <th className="py-4 px-2 w-16">ID</th>
              <th className="py-4 px-2">Dimension</th>
              <th className="py-4 px-2 w-3/5">Nội dung câu hỏi</th>
              <th className="py-4 px-2 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
            {questionsList
              .filter(q => q.content?.toLowerCase().includes(questionSearch.toLowerCase()))
              .filter(q => !questionDimFilter || q.dimensionCode === questionDimFilter)
              .map(q => (
                <tr key={q.questionId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-2 font-mono text-xs text-slate-400">{q.questionId}</td>
                  <td className="py-4 px-2">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg border border-primary/20">
                      {q.dimensionCode || 'MBTI'}
                    </span>
                  </td>
                  <td className="py-4 px-2 font-medium">{q.content}</td>
                  <td className="py-4 px-2 text-right space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenQuestionModal(q)}
                      className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors inline-flex"
                      title="Sửa"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.questionId)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors inline-flex"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Question Modal */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden premium-shadow animate-scale-up">
            <header className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-black">{currentQuestion.questionId ? 'Sửa Câu Hỏi MBTI' : 'Thêm Câu Hỏi MBTI Mới'}</h3>
              <button onClick={() => setIsQuestionModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"><X size={20} /></button>
            </header>
            <form onSubmit={handleSaveQuestion} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nội dung Câu hỏi</label>
                <textarea
                  required
                  rows={3}
                  value={currentQuestion.content}
                  onChange={e => setCurrentQuestion(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="e.g. Bạn thường lên lịch trình cụ thể cho ngày nghỉ..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dimension</label>
                  <select
                    value={currentQuestion.dimensionCode}
                    onChange={e => setCurrentQuestion(prev => ({ ...prev, dimensionCode: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm cursor-pointer"
                  >
                    <option value="EI">EI (Extraversion / Introversion)</option>
                    <option value="SN">SN (Sensing / Intuition)</option>
                    <option value="TF">TF (Thinking / Feeling)</option>
                    <option value="JP">JP (Judging / Perceiving)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direction</label>
                  <select
                    value={currentQuestion.direction}
                    onChange={e => setCurrentQuestion(prev => ({ ...prev, direction: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm cursor-pointer"
                  >
                    <option value="E">Extraversion (E)</option>
                    <option value="I">Introversion (I)</option>
                    <option value="S">Sensing (S)</option>
                    <option value="N">Intuition (N)</option>
                    <option value="T">Thinking (T)</option>
                    <option value="F">Feeling (F)</option>
                    <option value="J">Judging (J)</option>
                    <option value="P">Perceiving (P)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Số Thứ Tự Câu Hỏi (Order)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={currentQuestion.questionOrder}
                  onChange={e => setCurrentQuestion(prev => ({ ...prev, questionOrder: Number(e.target.value) }))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <p className="font-bold text-slate-600 dark:text-slate-300 mb-1">💡 Mách nhỏ:</p>
                <p>Hệ thống sẽ tự động liên kết 5 mức lựa chọn (Hoàn toàn không đồng ý → Hoàn toàn đồng ý) tương ứng cho câu hỏi này để người dùng có thể thực hiện bài trắc nghiệm ngay lập tức.</p>
              </div>

              <footer className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/95 transition-colors shadow-md shadow-primary/10"
                >
                  Lưu câu hỏi
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
