import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Bookmark, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { careerApi } from '../../../api/careerApi';
import { Career, PageResponse } from '../../../types/career';

export default function CareerLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { savedCareers, saveCareer, unsaveCareer } = useStore();

  const [careerPage, setCareerPage] = useState<PageResponse<Career> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  // Debounce search term to avoid spamming API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(0); // Reset page when search changes
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchCareers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await careerApi.getCareers(page, 8, debouncedSearch);
      setCareerPage(data);
    } catch (error) {
      console.error('Failed to fetch careers:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  return (
    <div className="space-y-10 py-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-black">Thư viện Nghề nghiệp</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
          Khám phá hơn 100+ ngành nghề xu hướng trong kỷ nguyên số.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm ngành nghề (Tiếng Anh/Việt)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <Filter size={20} /> Lọc
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : careerPage?.content.length === 0 ? (
          <div className="col-span-full text-center py-20 text-slate-500">
            Không tìm thấy ngành nghề nào phù hợp với "{searchTerm}"
          </div>
        ) : (
          careerPage?.content.map(career => (
            <div key={career.careerId} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={career.image || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop'} 
                  alt={career.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    savedCareers.includes(career.careerId) ? unsaveCareer(career.careerId) : saveCareer(career.careerId);
                  }}
                  className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-colors ${savedCareers.includes(career.careerId) ? 'bg-primary text-white' : 'bg-black/20 text-white hover:bg-black/40'}`}
                >
                  <Bookmark size={20} fill={savedCareers.includes(career.careerId) ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <Link to={`/careers/${career.careerId}`} className="text-xl font-bold group-hover:text-primary transition-colors block">
                    {career.vietnameseName || career.name}
                  </Link>
                  <p className="text-sm text-slate-500">{career.vietnameseName ? career.name : ''}</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{career.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Lương TB</span>
                    <span className="text-sm font-bold text-primary">
                      {career.avgSalary ? `$${career.avgSalary.toLocaleString()}` : 'Chưa cập nhật'}
                    </span>
                  </div>
                  <Link to={`/careers/${career.careerId}`} className="text-primary font-bold text-sm flex items-center gap-1">
                    Chi tiết <Search size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {!isLoading && careerPage && careerPage.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={careerPage.first}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex gap-2">
            {[...Array(careerPage.totalPages)].map((_, idx) => (
               <button
                 key={idx}
                 onClick={() => setPage(idx)}
                 className={`w-10 h-10 rounded-xl font-bold transition-colors ${
                   page === idx 
                     ? 'bg-primary text-white' 
                     : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                 }`}
               >
                 {idx + 1}
               </button>
            ))}
          </div>

          <button
            onClick={() => setPage(p => Math.min(careerPage.totalPages - 1, p + 1))}
            disabled={careerPage.last}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

