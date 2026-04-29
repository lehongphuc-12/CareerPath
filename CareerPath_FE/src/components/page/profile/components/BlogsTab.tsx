import React from 'react';
import { Plus, Eye, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '../../../common/Button';
import { motion } from 'framer-motion';
import { blogs as mockBlogs } from '../../../../api/mockData';

export const BlogsTab: React.FC = () => {
  return (
    <motion.div
      key="blogs-tab"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Quản lý bài viết
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Bạn đã chia sẻ {mockBlogs.length} bài viết với cộng đồng
          </p>
        </div>
        <Button className="rounded-2xl shadow-lg shadow-primary/25">
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
    </motion.div>
  );
};
