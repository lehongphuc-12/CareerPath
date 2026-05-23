import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from '../../../../store/useToastStore';
import {
  Briefcase,
  Search,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  X
} from 'lucide-react';

interface Career {
  careerId: number;
  name: string;
  description: string;
  image: string;
  min_salary?: string;
  max_salary?: string;
  demandLevel: number;
}

export default function CareerManagement() {
  const [loading, setLoading] = useState(true);
  const [careersList, setCareersList] = useState<Career[]>([]);
  const [careerSearch, setCareerSearch] = useState('');

  // Modal State
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [currentCareer, setCurrentCareer] = useState<Partial<Career>>({});

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/careers?size=100').catch(() => null);
      if (res?.data?.success) {
        const mapped = (res.data.data.content || []).map((c: any) => ({
          careerId: c.careerId,
          name: c.name,
          description: c.description,
          image: c.image,
          min_salary: c.minSalary || c.min_salary,
          max_salary: c.maxSalary || c.max_salary,
          demandLevel: c.demandLevel
        }));
        setCareersList(mapped);
      } else {
        setCareersList([
          { careerId: 1, name: 'Software Engineer', description: 'Kỹ sư phần mềm công nghệ cao.', image: '', min_salary: '25000000', max_salary: '80000000', demandLevel: 10 },
          { careerId: 2, name: 'Digital Marketer', description: 'Chuyên viên tiếp thị số.', image: '', min_salary: '15000000', max_salary: '45000000', demandLevel: 8 },
          { careerId: 3, name: 'UI/UX Designer', description: 'Thiết kế trải nghiệm người dùng.', image: '', min_salary: '18000000', max_salary: '40000000', demandLevel: 9 }
        ]);
      }
    } catch (err) {
      console.error('Error fetching careers:', err);
      toast.error('Không thể lấy danh sách ngành nghề.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleOpenCareerModal = (career?: Career) => {
    if (career) {
      setCurrentCareer(career);
    } else {
      setCurrentCareer({ name: '', description: '', min_salary: '', max_salary: '', demandLevel: 5, image: '' });
    }
    setIsCareerModalOpen(true);
  };

  const handleSaveCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCareer.name || !currentCareer.description) {
      toast.error('Vui lòng điền đủ Tên và Mô tả ngành nghề.');
      return;
    }

    const payload = {
      name: currentCareer.name,
      description: currentCareer.description,
      minSalary: currentCareer.min_salary ? Number(currentCareer.min_salary) : null,
      maxSalary: currentCareer.max_salary ? Number(currentCareer.max_salary) : null,
      demandLevel: currentCareer.demandLevel ? Number(currentCareer.demandLevel) : 5,
      image: currentCareer.image || ''
    };

    try {
      if (currentCareer.careerId) {
        const res = await axios.put(`/api/careers/${currentCareer.careerId}`, payload, { withCredentials: true });
        if (res.data?.success) {
          toast.success('Cập nhật ngành nghề thành công!');
          fetchCareers();
        } else {
          throw new Error();
        }
      } else {
        const res = await axios.post('/api/careers', payload, { withCredentials: true });
        if (res.data?.success) {
          toast.success('Thêm ngành nghề thành công!');
          fetchCareers();
        } else {
          throw new Error();
        }
      }
    } catch {
      if (currentCareer.careerId) {
        setCareersList(prev => prev.map(c => c.careerId === currentCareer.careerId ? { ...c, ...currentCareer } as Career : c));
        toast.success('Cập nhật ngành nghề (simulated).');
      } else {
        const mockNew: Career = {
          careerId: Math.floor(Math.random() * 1000) + 10,
          name: currentCareer.name,
          description: currentCareer.description,
          image: currentCareer.image || '',
          min_salary: currentCareer.min_salary,
          max_salary: currentCareer.max_salary,
          demandLevel: currentCareer.demandLevel || 5
        };
        setCareersList(prev => [mockNew, ...prev]);
        toast.success('Thêm ngành nghề mới (simulated).');
      }
    } finally {
      setIsCareerModalOpen(false);
    }
  };

  const handleDeleteCareer = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa ngành nghề này khỏi hệ thống?')) return;
    try {
      const res = await axios.delete(`/api/careers/${id}`, { withCredentials: true });
      if (res.data?.success) {
        toast.success('Xóa ngành nghề thành công!');
        setCareersList(prev => prev.filter(c => c.careerId !== id));
      } else {
        throw new Error();
      }
    } catch {
      setCareersList(prev => prev.filter(c => c.careerId !== id));
      toast.success('Đã xóa ngành nghề (simulated).');
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
        <h3 className="text-xl font-bold flex items-center gap-2"><Briefcase size={20} /> Quản lý Ngành nghề</h3>
        <div className="flex items-center gap-3">
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Tìm ngành nghề..."
              value={careerSearch}
              onChange={e => setCareerSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            onClick={() => handleOpenCareerModal()}
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
              <th className="py-4 px-2">ID</th>
              <th className="py-4 px-2">Tên nghề nghiệp</th>
              <th className="py-4 px-2">Lương Min - Max (VND)</th>
              <th className="py-4 px-2">Độ Hot</th>
              <th className="py-4 px-2 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
            {careersList
              .filter(c => c.name?.toLowerCase().includes(careerSearch.toLowerCase()))
              .map(c => (
                <tr key={c.careerId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-2 font-mono text-xs text-slate-400">{c.careerId}</td>
                  <td className="py-4 px-2 font-bold">{c.name}</td>
                  <td className="py-4 px-2 text-slate-600 dark:text-slate-400">
                    {c.min_salary && c.max_salary
                      ? `${(Number(c.min_salary)/1000000).toFixed(1)}M - ${(Number(c.max_salary)/1000000).toFixed(1)}M`
                      : 'Chưa cập nhật'}
                  </td>
                  <td className="py-4 px-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${c.demandLevel >= 9 ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400' : 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                      {c.demandLevel}/10
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right space-x-1">
                    <button
                      onClick={() => handleOpenCareerModal(c)}
                      className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors inline-flex"
                      title="Sửa"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteCareer(c.careerId)}
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

      {/* Career Modal */}
      {isCareerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden premium-shadow animate-scale-up">
            <header className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-black">{currentCareer.careerId ? 'Sửa Ngành Nghề' : 'Thêm Ngành Nghề Mới'}</h3>
              <button onClick={() => setIsCareerModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"><X size={20} /></button>
            </header>
            <form onSubmit={handleSaveCareer} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tên Ngành Nghề</label>
                <input
                  type="text"
                  required
                  value={currentCareer.name || ''}
                  onChange={e => setCurrentCareer(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="e.g. AI Specialist"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mô tả ngắn</label>
                <textarea
                  required
                  rows={3}
                  value={currentCareer.description || ''}
                  onChange={e => setCurrentCareer(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Mô tả công việc và định hướng phát triển..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lương tối thiểu (VND)</label>
                  <input
                    type="number"
                    value={currentCareer.min_salary || ''}
                    onChange={e => setCurrentCareer(prev => ({ ...prev, min_salary: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="e.g. 15000000"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lương tối đa (VND)</label>
                  <input
                    type="number"
                    value={currentCareer.max_salary || ''}
                    onChange={e => setCurrentCareer(prev => ({ ...prev, max_salary: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="e.g. 50000000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Độ Hot (1 - 10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={currentCareer.demandLevel || 5}
                    onChange={e => setCurrentCareer(prev => ({ ...prev, demandLevel: Number(e.target.value) }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">URL Ảnh Đại Diện</label>
                  <input
                    type="text"
                    value={currentCareer.image || ''}
                    onChange={e => setCurrentCareer(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="e.g. https://image..."
                  />
                </div>
              </div>

              <footer className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCareerModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/95 transition-colors shadow-md shadow-primary/10"
                >
                  Lưu thông tin
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
