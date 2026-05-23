import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Users,
  Briefcase,
  HelpCircle,
  FileText,
  TrendingUp,
  Filter,
  Loader2
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function AdminOverview() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ users: 0, careers: 0, questions: 0, blogs: 0 });
  const [timeFilter, setTimeFilter] = useState<'7days' | '30days' | 'semester' | 'year'>('30days');

  // Profit/Revenue mock dataset based on filter
  const profitDataMap = {
    '7days': [
      { name: 'Thứ 2', revenue: 15, profit: 8 },
      { name: 'Thứ 3', revenue: 22, profit: 12 },
      { name: 'Thứ 4', revenue: 18, profit: 10 },
      { name: 'Thứ 5', revenue: 30, profit: 18 },
      { name: 'Thứ 6', revenue: 25, profit: 14 },
      { name: 'Thứ 7', revenue: 40, profit: 26 },
      { name: 'Chủ nhật', revenue: 35, profit: 22 },
    ],
    '30days': [
      { name: 'Tuần 1', revenue: 120, profit: 68 },
      { name: 'Tuần 2', revenue: 145, profit: 82 },
      { name: 'Tuần 3', revenue: 160, profit: 95 },
      { name: 'Tuần 4', revenue: 190, profit: 112 },
    ],
    'semester': [
      { name: 'Tháng 1', revenue: 450, profit: 240 },
      { name: 'Tháng 2', revenue: 520, profit: 290 },
      { name: 'Tháng 3', revenue: 610, profit: 340 },
      { name: 'Tháng 4', revenue: 580, profit: 310 },
      { name: 'Tháng 5', revenue: 700, profit: 410 },
      { name: 'Tháng 6', revenue: 750, profit: 460 },
    ],
    'year': [
      { name: 'Quý 1', revenue: 1420, profit: 790 },
      { name: 'Quý 2', revenue: 1680, profit: 950 },
      { name: 'Quý 3', revenue: 1950, profit: 1120 },
      { name: 'Quý 4', revenue: 2400, profit: 1450 },
    ],
  };

  const pieData = [
    { name: 'EI (Extravert / Introvert)', value: 124 },
    { name: 'SN (Sensing / Intuitive)', value: 89 },
    { name: 'TF (Thinking / Feeling)', value: 145 },
    { name: 'JP (Judging / Perceiving)', value: 102 }
  ];

  const PIE_COLORS = ['#6467f2', '#3b82f6', '#10b981', '#f59e0b'];

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersRes = await axios.get('/api/users', { withCredentials: true }).catch(() => null);
        const careersRes = await axios.get('/api/careers?size=1').catch(() => null);
        const questionsRes = await axios.get('/api/questions').catch(() => null);
        const blogsRes = await axios.get('/api/blogs?size=1').catch(() => null);

        setCounts({
          users: usersRes?.data?.success ? usersRes.data.data.length : 124,
          careers: careersRes?.data?.success ? careersRes.data.data.totalElements : 35,
          questions: questionsRes?.data?.success ? questionsRes.data.data.length : 35,
          blogs: blogsRes?.data?.success ? blogsRes.data.data.totalElements : 12
        });
      } catch (err) {
        console.error('Error fetching dashboard counts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-2 premium-shadow hover:scale-[1.02] transition-transform">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tổng Users</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black">{counts.users}</span>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-xl"><Users size={20} /></div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-2 premium-shadow hover:scale-[1.02] transition-transform">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ngành nghề</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black">{counts.careers}</span>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-xl"><Briefcase size={20} /></div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-2 premium-shadow hover:scale-[1.02] transition-transform">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Câu hỏi MBTI</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black">{counts.questions}</span>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 rounded-xl"><HelpCircle size={20} /></div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-2 premium-shadow hover:scale-[1.02] transition-transform">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bài viết Blog</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black">{counts.blogs}</span>
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-xl"><FileText size={20} /></div>
          </div>
        </div>
      </div>

      {/* Graph Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left big chart - Revenue & Profit */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 premium-shadow space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="text-primary" size={20} /> Thống kê Lợi nhuận
            </h3>
            <div className="relative">
              <select
                value={timeFilter}
                onChange={e => setTimeFilter(e.target.value as any)}
                className="pl-3 pr-8 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer font-bold"
              >
                <option value="7days">7 ngày qua</option>
                <option value="30days">30 ngày qua</option>
                <option value="semester">Học kỳ này</option>
                <option value="year">Cả năm</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profitDataMap[timeFilter]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6467f2" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6467f2" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', background: '#0f172a', color: '#fff', border: 'none' }} />
                <Area type="monotone" dataKey="revenue" name="Doanh thu (trVND)" stroke="#6467f2" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="profit" name="Lợi nhuận (trVND)" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right pie chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 premium-shadow flex flex-col justify-between animate-fade-in">
          <h3 className="text-lg font-bold">Phân bổ câu hỏi MBTI</h3>
          <div className="h-48 w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }}></span>{d.name.split(' ')[0]}</span>
                <span className="font-bold">{d.value} câu hỏi</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
