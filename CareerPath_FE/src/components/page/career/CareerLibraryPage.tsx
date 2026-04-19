import { useState } from 'react';
import { careers } from '../../../api/mockData';
import { Link } from 'react-router-dom';
import { Search, Filter, Bookmark } from 'lucide-react';
import { useStore } from '../../../store/useStore';

export default function CareerLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { savedCareers, saveCareer, unsaveCareer } = useStore();

  const filteredCareers = careers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.vietnameseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            placeholder="Tìm kiếm ngành nghề..."
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
        {filteredCareers.map(career => (
          <div key={career.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all flex flex-col">
            <div className="h-48 overflow-hidden relative">
              <img src={career.image} alt={career.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  savedCareers.includes(career.id) ? unsaveCareer(career.id) : saveCareer(career.id);
                }}
                className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-colors ${savedCareers.includes(career.id) ? 'bg-primary text-white' : 'bg-black/20 text-white hover:bg-black/40'}`}
              >
                <Bookmark size={20} fill={savedCareers.includes(career.id) ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <Link to={`/careers/${career.id}`} className="text-xl font-bold group-hover:text-primary transition-colors block">
                  {career.vietnameseName}
                </Link>
                <p className="text-sm text-slate-500">{career.name}</p>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{career.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Lương TB</span>
                  <span className="text-sm font-bold text-primary">{career.salary}</span>
                </div>
                <Link to={`/careers/${career.id}`} className="text-primary font-bold text-sm flex items-center gap-1">
                  Chi tiết <Search size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
