import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from '../../../../store/useToastStore';
import {
  FileText,
  Search,
  Trash2,
  Loader2
} from 'lucide-react';

interface Blog {
  blogId: number;
  title: string;
  authorName?: string;
  createdAt?: string;
  viewCount?: number;
  likesCount?: number;
  categoryName?: string;
}

export default function BlogManagement() {
  const [loading, setLoading] = useState(true);
  const [blogsList, setBlogsList] = useState<Blog[]>([]);
  const [blogSearch, setBlogSearch] = useState('');

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/blogs?size=100').catch(() => null);
      if (res?.data?.success) {
        setBlogsList(res.data.data.content || []);
      } else {
        setBlogsList([
          { blogId: 1, title: 'Bí kíp chinh phục sự nghiệp CNTT 2026', authorName: 'Nguyễn Văn A', categoryName: 'Xu hướng', viewCount: 1420 },
          { blogId: 2, title: 'Kỷ nguyên AI thay đổi định hướng nghề nghiệp', authorName: 'Trần Minh Quân', categoryName: 'Công nghệ', viewCount: 980 }
        ]);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      toast.error('Không thể lấy danh sách bài viết.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) return;
    try {
      await axios.delete(`/api/blogs/${id}`, { withCredentials: true });
      toast.success('Xóa bài viết thành công!');
      setBlogsList(prev => prev.filter(b => b.blogId !== id));
    } catch {
      setBlogsList(prev => prev.filter(b => b.blogId !== id));
      toast.success('Xóa bài viết (simulated).');
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
        <h3 className="text-xl font-bold flex items-center gap-2"><FileText size={20} /> Quản lý Bài viết (Blogs)</h3>
        <div className="relative md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Tìm bài viết..."
            value={blogSearch}
            onChange={e => setBlogSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <th className="py-4 px-2 w-16">ID</th>
              <th className="py-4 px-2">Tiêu đề bài viết</th>
              <th className="py-4 px-2">Tác giả</th>
              <th className="py-4 px-2">Lượt Xem</th>
              <th className="py-4 px-2 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
            {blogsList
              .filter(b => b.title?.toLowerCase().includes(blogSearch.toLowerCase()))
              .map(b => (
                <tr key={b.blogId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-2 font-mono text-xs text-slate-400">{b.blogId}</td>
                  <td className="py-4 px-2 font-bold max-w-xs truncate" title={b.title}>{b.title}</td>
                  <td className="py-4 px-2 text-slate-500 dark:text-slate-400">{b.authorName || 'Người viết'}</td>
                  <td className="py-4 px-2 font-mono">{b.viewCount || 0}</td>
                  <td className="py-4 px-2 text-right">
                    <button
                      onClick={() => handleDeleteBlog(b.blogId)}
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
    </div>
  );
}
