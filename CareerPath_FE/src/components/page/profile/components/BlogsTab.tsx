import React, { useState } from 'react';
import Tiptap from '../../../common/Tiptap';

import { Plus, Eye, Edit2, Trash2, MoreVertical, X, Save } from 'lucide-react';
import { Button } from '../../../common/Button';
import { Input } from '../../../common/Input';
import { motion } from 'framer-motion';
import { blogs as mockBlogs } from '../../../../api/mockData';

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

  return (
    <motion.div
      key="blogs-tab"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {isCreating ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl premium-shadow p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Viết bài mới</h3>
            <button
              onClick={() => setIsCreating(false)}
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
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            />

            <div className="grid grid-cols-1  gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                  Danh mục
                </label>
                <select
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all duration-200"
                  value={newBlog.category}
                  onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                >
                  <option value="">Chọn danh mục</option>
                  <option value="Công nghệ">Công nghệ</option>
                  <option value="Kỹ năng">Kỹ năng</option>
                  <option value="Hướng nghiệp">Hướng nghiệp</option>
                  <option value="Đời sống">Đời sống</option>
                </select>
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
                  onChange={(content) => setNewBlog({ ...newBlog, content })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="secondary"
              onClick={() => setIsCreating(false)}
              className="rounded-2xl"
            >
              Hủy
            </Button>
            <Button
              onClick={() => {
                alert('Tính năng lưu bài viết sẽ được phát triển sau!');
                setIsCreating(false);
              }}
              className="rounded-2xl shadow-lg shadow-primary/30"
            >
              <Save className="w-4 h-4 mr-2" /> Lưu bài viết
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
                Bạn đã chia sẻ {mockBlogs.length} bài viết với cộng đồng
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
                  {mockBlogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={blog.image}
                            className="h-12 w-16 object-cover rounded-xl shadow-sm"
                            alt=""
                          />
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                              {blog.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 uppercase font-bold">
                              {blog.readTime} đọc
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-lg">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {blog.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                          <Eye className="w-4 h-4 opacity-50" />
                          1.2k
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-primary transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};
