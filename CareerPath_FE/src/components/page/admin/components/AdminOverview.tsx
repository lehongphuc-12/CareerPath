import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Users,
  Briefcase,
  HelpCircle,
  FileText,
  TrendingUp,
  Filter,
  Loader2,
  ClipboardList,
  Star,
  MessageSquare,
  Brain,
  CheckCircle2,
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
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { testDashboardApi } from '../../../../api/testDashboardApi';
import { TestDashboardStats } from '../../../../types/testAttempt';
import { toast } from '../../../../store/useToastStore';

const PIE_COLORS = [
  '#6467f2', '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316',
  '#6366f1', '#14b8a6', '#a855f7', '#eab308', '#22c55e', '#64748b',
];

export default function AdminOverview() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ users: 0, careers: 0, questions: 0, blogs: 0 });
  const [testStats, setTestStats] = useState<TestDashboardStats | null>(null);
  const [timeFilter, setTimeFilter] = useState<'day' | 'month'>('day');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, careersRes, questionsRes, blogsRes, stats] = await Promise.all([
          axios.get('/api/users', { withCredentials: true }).catch(() => null),
          axios.get('/api/careers?size=1').catch(() => null),
          axios.get('/api/questions').catch(() => null),
          axios.get('/api/blogs?size=1').catch(() => null),
          testDashboardApi.getStats().catch(() => null),
        ]);

        setCounts({
          users: usersRes?.data?.success ? usersRes.data.data.length : 0,
          careers: careersRes?.data?.success ? careersRes.data.data.totalElements : 0,
          questions: questionsRes?.data?.success ? questionsRes.data.data.length : 0,
          blogs: blogsRes?.data?.success ? blogsRes.data.data.totalElements : 0,
        });

        if (stats) {
          setTestStats(stats);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        toast.error('Không thể tải thống kê dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = timeFilter === 'day'
    ? (testStats?.attemptsByDay || []).slice(0, 14).reverse().map((d) => ({
        name: d.period?.slice(5) || d.period,
        count: d.count,
      }))
    : (testStats?.attemptsByMonth || []).slice(0, 12).reverse().map((d) => ({
        name: d.period,
        count: d.count,
      }));

  const pieData = (testStats?.mbtiDistribution || []).slice(0, 8).map((d) => ({
    name: d.mbtiType,
    value: d.count,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Entity Stats Cards */}
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

      {/* Test Stats Cards */}
      {testStats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Lượt làm test</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black">{testStats.totalAttempts}</span>
              <ClipboardList className="text-primary" size={18} />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">User đã test</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black">{testStats.totalUsersWhoTookTest}</span>
              <Users className="text-blue-500" size={18} />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">MBTI phổ biến</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-primary">{testStats.mostCommonMbtiType || '—'}</span>
              <Brain className="text-purple-500" size={18} />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Tỷ lệ hoàn thành</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black">{testStats.completionRate}%</span>
              <CheckCircle2 className="text-emerald-500" size={18} />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Rating TB</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black">{testStats.averageRating}</span>
              <Star className="text-amber-500" size={18} />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Tổng feedback</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black">{testStats.totalFeedbacks}</span>
              <MessageSquare className="text-rose-500" size={18} />
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 premium-shadow space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="text-primary" size={20} /> Lượt làm test
            </h3>
            <div className="relative">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as 'day' | 'month')}
                className="pl-3 pr-8 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer font-bold"
              >
                <option value="day">Theo ngày</option>
                <option value="month">Theo tháng</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
            </div>
          </div>
          <div className="h-72 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAttempts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6467f2" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6467f2" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: '16px', background: '#0f172a', color: '#fff', border: 'none' }} />
                  <Area type="monotone" dataKey="count" name="Lượt làm test" stroke="#6467f2" strokeWidth={2} fillOpacity={1} fill="url(#colorAttempts)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                Chưa có dữ liệu lượt làm test
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 premium-shadow flex flex-col justify-between">
          <h3 className="text-lg font-bold">Phân bổ MBTI</h3>
          <div className="h-48 w-full flex justify-center items-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', background: '#0f172a', color: '#fff', border: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-400 text-sm">Chưa có dữ liệu MBTI</p>
            )}
          </div>
          <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 max-h-32 overflow-y-auto">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  {d.name}
                </span>
                <span className="font-bold">{d.value} lượt</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MBTI Bar Chart */}
      {testStats && testStats.mbtiDistribution.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 premium-shadow">
          <h3 className="text-lg font-bold mb-4">Thống kê MBTI chi tiết</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={testStats.mbtiDistribution.slice(0, 10)}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="mbtiType" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', background: '#0f172a', color: '#fff', border: 'none' }} />
                <Bar dataKey="count" name="Số lượt" fill="#6467f2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
