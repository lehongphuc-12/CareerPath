import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/useStore';
import { toast } from '../../../store/useToastStore';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  HelpCircle,
  FileText,
  Shield,
  AlertTriangle,
  ClipboardList,
} from 'lucide-react';

// Import sub-components
import AdminOverview from './components/AdminOverview';
import UserManagement from './components/UserManagement';
import CareerManagement from './components/CareerManagement';
import QuestionManagement from './components/QuestionManagement';
import BlogManagement from './components/BlogManagement';
import TestResultManagement from './components/TestResultManagement';

export default function AdminPage() {
  const { user } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'careers' | 'questions' | 'blogs' | 'test-results'>('overview');

  // Route protection
  useEffect(() => {
    if (!user || !user.role || user.role.toUpperCase() !== 'ADMIN') {
      toast.error('Bạn không có quyền truy cập trang quản trị!');
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || !user.role || user.role.toUpperCase() !== 'ADMIN') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200">
        <div className="p-8 max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-6 shadow-2xl animate-scale-up">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-2xl flex items-center justify-center animate-pulse">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-black">Truy cập bị chặn</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Bạn cần đăng nhập bằng tài khoản Quản trị viên để truy cập trang này.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/95 transition-colors shadow-lg"
          >
            Quay lại Trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-10 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            Admin Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Hệ thống quản trị cơ sở dữ liệu định hướng nghề nghiệp CareerPath.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-primary/10 border border-primary/20 text-primary px-4 py-2.5 rounded-2xl font-bold uppercase tracking-wider shadow-sm">
          <Shield size={16} /> Admin Mode
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Sidebar Menu */}
        <aside className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-2 lg:sticky lg:top-24 premium-shadow">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Mục điều hướng</h3>
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all text-sm ${activeTab === 'overview' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={18} /> Tổng quan
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all text-sm ${activeTab === 'users' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Users size={18} /> Người dùng
          </button>
          <button
            onClick={() => setActiveTab('careers')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all text-sm ${activeTab === 'careers' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Briefcase size={18} /> Ngành nghề
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all text-sm ${activeTab === 'questions' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <HelpCircle size={18} /> Câu hỏi MBTI
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all text-sm ${activeTab === 'blogs' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <FileText size={18} /> Bài viết (Blogs)
          </button>
          <button
            onClick={() => setActiveTab('test-results')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all text-sm ${activeTab === 'test-results' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <ClipboardList size={18} /> Kết quả bài test
          </button>
        </aside>

        {/* Main Tab Content */}
        <main className="lg:col-span-3">
          {activeTab === 'overview' && <AdminOverview />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'careers' && <CareerManagement />}
          {activeTab === 'questions' && <QuestionManagement />}
          {activeTab === 'blogs' && <BlogManagement />}
          {activeTab === 'test-results' && <TestResultManagement />}
        </main>
      </div>
    </div>
  );
}
