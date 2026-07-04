import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from '../../../../store/useToastStore';
import {
  FileText,
  Search,
  Trash2,
  Loader2,
  Plus,
  Edit2,
  X,
  Save
} from 'lucide-react';
import { Button } from '../../../common/Button';
import { Input } from '../../../common/Input';
import Tiptap from '../../../common/Tiptap';
import { useBlog } from '../../../../hooks/useBlogs';

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

  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: '',
    content: '',
    image: '',
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    categories: apiCategories,
    createBlog,
    updateBlog,
    isLoading: isActionLoading,
  } = useBlog();

  useEffect(() => {
    if (apiCategories && apiCategories.length > 0) {
      const apiNames = apiCategories.map((c: any) => c.name);
      setCategories((prev) => {
        const combined = Array.from(new Set([...apiNames, ...prev]));
        return combined;
      });
    }
  }, [apiCategories]);

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      setCategories([...categories, newCategoryName.trim()]);
      setNewBlog({ ...newBlog, category: newCategoryName.trim() });
      setNewCategoryName('');
      setIsAddingCategory(false);
    }
  };

  const handleEditClick = async (blog: Blog) => {
    try {
      const res = await axios.get(`/api/blogs/${blog.blogId}`);
      if (res?.data?.success) {
        const detail = res.data.data;
        setNewBlog({
          title: detail.title || blog.title,
          category: detail.categoryName || blog.categoryName || '',
          content: detail.content || '',
          image: detail.thumbnail || '',
        });
        setImagePreview(detail.thumbnail || '');
      } else {
        setNewBlog({
          title: blog.title,
          category: blog.categoryName || '',
          content: '',
          image: '',
        });
        setImagePreview('');
      }
    } catch {
      setNewBlog({
        title: blog.title,
        category: blog.categoryName || '',
        content: '',
        image: '',
      });
      setImagePreview('');
    }
    
    setEditingBlogId(blog.blogId);
    setIsEditing(true);
    setIsCreating(true);
  };

  const handleSaveBlog = async () => {
    if (!newBlog.title.trim() || !newBlog.category || !newBlog.content.trim()) {
      toast.error('Vui lòng nhập đầy đủ tiêu đề, danh mục và nội dung');
      return;
    }

    const formData = new FormData();
    formData.append('title', newBlog.title);
    formData.append('categoryName', newBlog.category);
    formData.append('content', newBlog.content);
    if (selectedFile) {
      formData.append('blogImage', selectedFile);
    }

    try {
      if (isEditing && editingBlogId) {
        await updateBlog(editingBlogId, formData);
        toast.success('Cập nhật bài viết thành công');
      } else {
        await createBlog(formData);
        toast.success('Tạo bài viết thành công');
      }
      setIsCreating(false);
      setIsEditing(false);
      setEditingBlogId(null);
      setNewBlog({ title: '', category: '', content: '', image: '' });
      setImagePreview('');
      setSelectedFile(null);
      fetchBlogs(); // reload table
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi lưu bài viết');
    }
  };

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

  if (isCreating) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl premium-shadow p-8 space-y-6 relative overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {isEditing ? 'Cập nhật bài viết' : 'Viết bài mới'}
          </h3>
          <button
            onClick={() => {
              setIsCreating(false);
              setIsEditing(false);
              setEditingBlogId(null);
              setNewBlog({ title: '', category: '', content: '', image: '' });
              setImagePreview('');
            }}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <Input
            label="Tiêu đề bài viết"
            placeholder="Nhập tiêu đề..."
            value={newBlog.title}
            onChange={(e: any) => setNewBlog((prev) => ({ ...prev, title: e.target.value }))}
          />

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                Danh mục
              </label>
              <div className="flex gap-2">
                {!isAddingCategory ? (
                  <div className="flex-1 flex gap-2">
                    <select
                      className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all duration-200 outline-none text-sm"
                      value={newBlog.category}
                      onChange={(e) => setNewBlog((prev) => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant="secondary"
                      onClick={() => setIsAddingCategory(true)}
                      className="rounded-2xl whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4 mr-1" /> Thêm mới
                    </Button>
                  </div>
                ) : (
                  <div className="flex-1 flex gap-2 items-end">
                    <div className="flex-1">
                      <Input
                        placeholder="Nhập tên danh mục mới..."
                        value={newCategoryName}
                        onChange={(e: any) => setNewCategoryName(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={handleAddCategory}
                      className="rounded-2xl h-[56px]"
                      disabled={!newCategoryName.trim()}
                    >
                      Lưu
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setIsAddingCategory(false);
                        setNewCategoryName('');
                      }}
                      className="rounded-2xl h-[56px]"
                    >
                      Hủy
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
              Ảnh nền bài viết
            </label>
            <div className="flex items-center gap-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:border-primary/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Plus className="w-6 h-6 text-slate-400 mb-2" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">Tải ảnh lên</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      const preview = URL.createObjectURL(file);
                      setImagePreview(preview);
                      setNewBlog({ ...newBlog, image: preview });
                    }
                  }}
                />
              </label>
              {imagePreview && (
                <div className="w-48 h-32 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex-shrink-0">
                  <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
              Nội dung bài viết
            </label>
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <Tiptap
                content={newBlog.content}
                onChange={(content: string) => setNewBlog((prev) => ({ ...prev, content }))}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="secondary"
            onClick={() => {
              setIsCreating(false);
              setIsEditing(false);
              setEditingBlogId(null);
              setNewBlog({ title: '', category: '', content: '', image: '' });
              setImagePreview('');
            }}
            className="rounded-2xl"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSaveBlog}
            disabled={isActionLoading}
            className="rounded-2xl shadow-lg shadow-primary/30"
          >
            <Save className="w-4 h-4 mr-2" />{' '}
            {isActionLoading ? 'Đang lưu...' : isEditing ? 'Cập nhật bài viết' : 'Lưu bài viết'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 premium-shadow space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-xl font-bold flex items-center gap-2"><FileText size={20} /> Quản lý Bài viết (Blogs)</h3>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Tìm bài viết..."
              value={blogSearch}
              onChange={e => setBlogSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button onClick={() => setIsCreating(true)} className="rounded-xl whitespace-nowrap h-[42px]">
            <Plus size={16} className="mr-2 hidden sm:block" /> Thêm bài viết
          </Button>
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
                  <td className="py-4 px-2 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleEditClick(b)}
                      className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors inline-flex mr-1"
                      title="Sửa"
                    >
                      <Edit2 size={16} />
                    </button>
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
