import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBlog } from '../../../hooks/useBlogs';

export default function BlogPage() {
  const { blogPage, categories, selectedCategory, setSelectedCategory, isLoading, page, setPage } = useBlog();


  const getExcerpt = (content: string) => {
    if (!content) return '';
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > 160 ? plainText.substring(0, 160) + '...' : plainText;
  };

  const getReadTime = (content: string) => {
    if (!content) return '3 phút';
    const plainText = content.replace(/<[^>]*>/g, '');
    const wordsPerMinute = 200;
    const words = plainText.trim().split(/\s+/).filter(Boolean).length;
    return `${Math.ceil(words / wordsPerMinute)} phút`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN');
    } catch {
      return dateString;
    }
  };

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
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : !blogPage?.content || blogPage.content.length === 0 ? (
            <div className="text-center py-20 text-slate-500">Hiện chưa có bài viết nào.</div>
          ) : (
            <>
              {blogPage.content.map((blog, index) => {
                if (index < 2) {
                  return (
                    <Link
                      key={blog.blogId}
                      to={`/blogs/${blog.blogId}`}
                      className="group block space-y-6"
                    >
                      <div className="aspect-video rounded-3xl overflow-hidden relative">
                        <img
                          src={
                            blog.thumbnail ||
                            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000'
                          }
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-6 left-6">
                          <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase rounded-full">
                            Nghề nghiệp
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-6 text-slate-500 text-sm">
                          <span className="flex items-center gap-2">
                            <Calendar size={16} /> {formatDate(blog.createdAt)}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock size={16} /> {getReadTime(blog.content)} đọc
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold group-hover:text-primary transition-colors leading-tight">
                          {blog.title}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 line-clamp-2">
                          {getExcerpt(blog.content)}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-bold">
                          Đọc tiếp <ArrowRight size={18} />
                        </div>
                      </div>
                    </Link>
                  );
                } else {
                  return (
                    <Link
                      key={blog.blogId}
                      to={`/blogs/${blog.blogId}`}
                      className="group block space-y-2 pt-6 bg-slate-50/50 dark:bg-slate-900/50  hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-4 text-slate-500 text-xs">
                        <span className="px-2 py-0.5 bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase rounded-full">
                          Nghề nghiệp
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {formatDate(blog.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {getReadTime(blog.content)} đọc
                        </span>
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-snug">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {getExcerpt(blog.content)}
                      </p>
                    </Link>
                  );
                }
              })}

              {blogPage && blogPage.totalPages >= 1 && (
                <div className="flex justify-center items-center gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={blogPage.first}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <div className="flex gap-2">
                    {[...Array(blogPage.totalPages)].map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPage(idx)}
                        className={`w-10 h-10 rounded-xl font-bold transition-colors ${
                          page === idx
                            ? 'bg-primary text-white'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setPage((p) => Math.min(blogPage.totalPages - 1, p + 1))}
                    disabled={blogPage.last}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-10">
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-6 uppercase tracking-widest text-primary">
              Danh mục
            </h3>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => { setSelectedCategory(null); setPage(0); }}
                className={`text-left px-4 py-3 rounded-xl transition-colors font-medium ${
                  selectedCategory === null
                    ? 'bg-primary text-white'
                    : 'hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Tất cả
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.categoryId}
                  onClick={() => { setSelectedCategory(cat.categoryId); setPage(0); }}
                  className={`text-left px-4 py-3 rounded-xl transition-colors font-medium ${
                    selectedCategory === cat.categoryId
                      ? 'bg-primary text-white'
                      : 'hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20">
            <h3 className="font-bold text-lg mb-4">Đăng ký bản tin</h3>
            <p className="text-sm text-slate-500 mb-6">
              Nhận những bài viết mới nhất trực tiếp vào hộp thư của bạn.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border-none focus:ring-2 focus:ring-primary"
              />
              <button className="w-full py-4 bg-primary text-white font-bold rounded-xl">
                Đăng ký ngay
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
