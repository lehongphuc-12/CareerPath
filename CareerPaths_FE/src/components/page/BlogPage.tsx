import { blogs } from '../../api/mockData';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="space-y-12 py-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-black">Cẩm nang Nghề nghiệp</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
          Cập nhật những xu hướng, kỹ năng và câu chuyện truyền cảm hứng từ các chuyên gia.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          {blogs.map(blog => (
            <Link key={blog.id} to={`/blog/${blog.id}`} className="group block space-y-6">
              <div className="aspect-video rounded-3xl overflow-hidden relative">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase rounded-full">{blog.category}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-6 text-slate-500 text-sm">
                  <span className="flex items-center gap-2"><Calendar size={16} /> {blog.date}</span>
                  <span className="flex items-center gap-2"><Clock size={16} /> {blog.readTime} đọc</span>
                </div>
                <h2 className="text-3xl font-bold group-hover:text-primary transition-colors leading-tight">
                  {blog.title}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold">
                  Đọc tiếp <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <aside className="lg:col-span-4 space-y-10">
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-6 uppercase tracking-widest text-primary">Danh mục</h3>
            <nav className="flex flex-col gap-2">
              {['Xu hướng', 'Kỹ năng mềm', 'Bí quyết học tập', 'Câu chuyện Mentor'].map(cat => (
                <button key={cat} className="text-left px-4 py-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 font-medium">
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20">
            <h3 className="font-bold text-lg mb-4">Đăng ký bản tin</h3>
            <p className="text-sm text-slate-500 mb-6">Nhận những bài viết mới nhất trực tiếp vào hộp thư của bạn.</p>
            <form className="space-y-3">
              <input type="email" placeholder="Email của bạn" className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border-none focus:ring-2 focus:ring-primary" />
              <button className="w-full py-4 bg-primary text-white font-bold rounded-xl">Đăng ký ngay</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
