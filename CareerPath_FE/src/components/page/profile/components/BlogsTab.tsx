import React, { useState, useEffect } from 'react';
import { useBlog } from '../../../../hooks/useBlogs';

import Tiptap from '../../../common/Tiptap';

import { Button } from '../../../common/Button';
import { Input } from '../../../common/Input';
import { Modal } from '../../../common/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { blogs as mockBlogs } from '../../../../api/mockData';
import { toast } from '@/src/store/useToastStore';
import { 
  Plus, 
  Eye, 
  Edit2, 
  Trash2, 
  MoreVertical, 
  X, 
  Save, 
  AlertTriangle, 
  Sparkles,
  Brain,
  Cpu,
  Loader2,
  Wand2
} from 'lucide-react';

export const BlogsTab: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: '',
    readTime: '',
    content: '',
    image: '',
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [isAiEnabled, setIsAiEnabled] = useState(false);
  const [aiRequirements, setAiRequirements] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const loadingMessages = [
    "Đang phân tích ý tưởng...",
    "Đang kết nối với trí tuệ nhân tạo...",
    "Đang biên soạn nội dung chất lượng...",
    "Đang tối ưu hóa phong cách viết...",
    "Đang hoàn thiện những bước cuối cùng...",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAiGenerating) {
      interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isAiGenerating]);

  const {
    categories: apiCategories,
    createBlog,
    deleteBlog,
    updateBlog,
    generateAiContent,
    blogPage,
    isLoading: isActionLoading,
  } = useBlog();

  const handleEditClick = (blog: any) => {
    setNewBlog({
      title: blog.title,
      category: blog.categoryName,
      content: blog.content,
      readTime: '5 phút',
      image: blog.thumbnail,
    });
    setImagePreview(blog.thumbnail);
    setEditingBlogId(blog.blogId);
    setIsEditing(true);
    setIsCreating(true);
    setIsAiEnabled(false);
    setAiRequirements('');
  };

  const handleDeleteClick = (blogId: number) => {
    setBlogToDelete(blogId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      try {
        await deleteBlog(blogToDelete);
        setIsDeleteModalOpen(false);
        setBlogToDelete(null);
      } catch (error) {
        console.error('Delete failed', error);
      }
    }
  };

  useEffect(() => {
    if (apiCategories && apiCategories.length > 0) {
      const apiNames = apiCategories.map((c) => c.name);
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

  const handleGenerateAiContent = async () => {
    setIsAiGenerating(true);
    setLoadingMessageIndex(0);
    try {
      const data = await generateAiContent(newBlog.title, aiRequirements);
      setNewBlog({
        ...newBlog,
        title: data.title,
        content: data.content,
      });
    } catch (error) {
      console.error('AI Generation failed', error);
    } finally {
      setIsAiGenerating(false);
    }
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
      } else {
        await createBlog(formData);
      }
      setIsCreating(false);
      setIsEditing(false);
      setEditingBlogId(null);
      setIsAiEnabled(false);
      setAiRequirements('');
      // Reset form
      setNewBlog({ title: '', category: '', readTime: '', content: '', image: '' });
      setImagePreview('');
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      key="blogs-tab"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {isCreating ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl premium-shadow p-8 space-y-6 relative overflow-hidden">
          <AnimatePresence>
            {isAiGenerating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-4rem)] h-[60%] z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[40px] border border-slate-200/50 dark:border-slate-700/50 shadow-2xl overflow-hidden"
              >
                {/* Tech Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                </div>

                {/* Scanning Beam */}
                <motion.div 
                  animate={{ top: ['-10%', '110%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-primary/20 to-transparent z-10"
                />

                <div className="relative z-20 flex flex-col items-center">
                  <div className="relative mb-6">
                    {/* Glowing Orb */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(var(--primary-rgb), 0.2)",
                          "0 0 60px rgba(var(--primary-rgb), 0.4)",
                          "0 0 20px rgba(var(--primary-rgb), 0.2)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 bg-gradient-to-br from-primary to-indigo-600 rounded-full flex items-center justify-center text-white relative z-20 shadow-xl"
                    >
                      <Brain className="w-10 h-10 animate-pulse" />
                    </motion.div>
                    
                    {/* Orbital Rings */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-4 border border-primary/10 rounded-full"
                        style={{ padding: i * 8 }}
                      />
                    ))}
                  </div>

                  <div className="text-center space-y-2 px-6">
                    <AnimatePresence mode="wait">
                      <motion.h4
                        key={loadingMessageIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-lg font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent"
                      >
                        {loadingMessages[loadingMessageIndex]}
                      </motion.h4>
                    </AnimatePresence>
                    <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-700" />
                      Neural Network Active
                      <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-700" />
                    </div>
                  </div>

                  <div className="mt-6 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {isEditing ? 'Cập nhật bài viết' : 'Viết bài mới'}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setIsEditing(false);
                setEditingBlogId(null);
                setNewBlog({ title: '', category: '', readTime: '', content: '', image: '' });
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
              onChange={(e) => setNewBlog((prev) => ({ ...prev, title: e.target.value }))}
            />

            <div className="flex items-center gap-2 px-1">
              <button
                onClick={() => setIsAiEnabled(!isAiEnabled)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isAiEnabled
                    ? 'bg-primary/10 text-primary border-primary/20 border shadow-sm shadow-primary/10'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-slate-700'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isAiEnabled ? 'animate-pulse' : ''}`} />
                <span className="text-sm font-bold">Sử dụng AI tạo nội dung</span>
              </button>
            </div>

            {isAiEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700"
              >
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                    Yêu cầu cho AI (Tùy chọn)
                  </label>
                  <textarea
                    className="w-full bg-white dark:bg-slate-900 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all duration-200 min-h-[100px] text-sm"
                    placeholder="Ví dụ: Viết theo phong cách hài hước, tập trung vào kỹ năng mềm cho sinh viên..."
                    value={aiRequirements}
                    onChange={(e) => setAiRequirements(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleGenerateAiContent}
                  disabled={isActionLoading}
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 shadow-md shadow-primary/20"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isActionLoading ? 'Đang tạo nội dung...' : 'Tạo bài viết bằng AI'}
                </Button>
              </motion.div>
            )}

            <div className="grid grid-cols-1  gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                  Danh mục
                </label>
                <div className="flex gap-2">
                  {!isAddingCategory ? (
                    <div className="flex-1 flex gap-2">
                      <select
                        className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all duration-200"
                        value={newBlog.category}
                        onChange={(e) =>
                          setNewBlog((prev) => ({ ...prev, category: e.target.value }))
                        }
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
                          onChange={(e) => setNewCategoryName(e.target.value)}
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

              {/* <Input 
                label="Thời gian đọc (ví dụ: 5 phút)" 
                placeholder="5 phút"
                value={newBlog.readTime}
                onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
              /> */}
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
                  onChange={(content) => setNewBlog((prev) => ({ ...prev, content }))}
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
                setNewBlog({ title: '', category: '', readTime: '', content: '', image: '' });
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
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Quản lý bài viết
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Bạn đã chia sẻ {blogPage?.content.length || 0} bài viết với cộng đồng
              </p>
            </div>
            <Button
              onClick={() => setIsCreating(true)}
              className="rounded-2xl shadow-lg shadow-primary/25"
            >
              <Plus className="w-4 h-4 mr-2" /> Viết bài mới
            </Button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl premium-shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Bài viết
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Danh mục
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Ngày đăng
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Lượt xem
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {blogPage?.content.map((blog) => (
                    <tr
                      key={blog.blogId}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={blog.thumbnail || 'https://via.placeholder.com/150'}
                            className="h-12 w-16 object-cover rounded-xl shadow-sm"
                            alt=""
                          />
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                              {blog.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 uppercase font-bold">
                              5 phút đọc
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-lg">
                          {blog.categoryName}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                          <Eye className="w-4 h-4 opacity-50" />0
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-primary transition-colors"
                            onClick={() => handleEditClick(blog)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-red-500 transition-colors"
                            onClick={() => handleDeleteClick(blog.blogId)}
                            disabled={isActionLoading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {/* <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {blogPage?.content.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                        Chưa có bài viết nào. Hãy viết bài đầu tiên của bạn!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Xác nhận xóa"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
              className="rounded-2xl"
            >
              Hủy
            </Button>
            <Button
              variant="secondary"
              onClick={confirmDelete}
              disabled={isActionLoading}
              className="rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 border-none"
            >
              {isActionLoading ? 'Đang xóa...' : 'Xác nhận xóa'}
            </Button>
          </>
        }
      >
        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p>Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác.</p>
        </div>
      </Modal>
    </motion.div>
  );
};
