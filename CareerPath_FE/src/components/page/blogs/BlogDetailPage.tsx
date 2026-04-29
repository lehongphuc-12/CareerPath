import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  Bookmark,
  MessageCircle,
  Heart,
  Send,
  MoreHorizontal,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon
} from 'lucide-react';
import { useBlogDetail } from '../../../hooks/useBlogDetail';
import { blogApi } from '../../../api/blogApi';
import { Blog } from '../../../types/blog';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { blog, isLoading, error } = useBlogDetail(Number(id));
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (blog) {
      setLikes(blog.likeCount);
    }
  }, [blog]);

  useEffect(() => {
    blogApi.getBlogs(0, 5)
      .then((data) => {
        const filtered = data.content.filter((b) => b.blogId !== Number(id));
        setRelatedBlogs(filtered.slice(0, 3));
      })
      .catch((err) => console.error('Failed to load related blogs', err));
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
          {error || 'Không tìm thấy bài viết'}
        </h2>
        <Link to="/blog" className="text-primary hover:underline font-bold inline-flex items-center gap-2">
          <ArrowLeft size={18} /> Quay lại cẩm nang
        </Link>
      </div>
    );
  }

  const readTime = `${Math.max(1, Math.ceil(blog.content.length / 1000))} phút`;

  return (
    <div className="py-10 space-y-12">
      {/* Header */}
      <header className="space-y-6">
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm"
        >
          <ArrowLeft size={18} /> Quay lại cẩm nang
        </Link>
        <h1 className="text-4xl md:text-5xl font-black leading-tight text-slate-900 dark:text-white">
          {blog.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm border-b border-slate-100 dark:border-slate-800 pb-8">
          <span className="flex items-center gap-2 font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest text-[10px]">
            Cẩm nang
          </span>
          <span className="flex items-center gap-2">
            <Calendar size={16} /> {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} /> {readTime} đọc
          </span>
          <span className="flex items-center gap-2">
            <User size={16} /> {blog.authorName}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-10">
          <div className="aspect-video rounded-3xl overflow-hidden premium-shadow">
            <img 
              src={blog.imageUrl} 
              className="w-full h-full object-cover" 
              alt={blog.title}
            />
          </div>

          <article className="prose prose-slate dark:prose-invert max-w-none">
            <div 
              className="text-lg text-slate-600 dark:text-slate-400 leading-loose space-y-6 mt-8"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {/* Interaction Bar */}
          <div className="flex items-center justify-between py-6 border-y border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLikes(prev => isLiked ? prev - 1 : prev + 1);
                }}
                className={`flex items-center gap-2 font-bold transition-colors ${isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
              >
                <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                {likes}
              </button>
              <button className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors">
                <MessageCircle size={24} />
                {blog.commentCount}
              </button>
            </div>
            <div className="flex items-center gap-3 relative">
              <div className="relative group">
                <button 
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors flex items-center gap-2"
                  onClick={() => {
                    const url = window.location.href;
                    const text = blog.title;
                    if (navigator.share) {
                      navigator.share({ title: text, url }).catch(() => {});
                    }
                  }}
                >
                  <Share2 size={20} />
                </button>
                
                {/* Share Dropdown - Visible on Hover for Desktop */}
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-slate-900 rounded-2xl premium-shadow border border-slate-100 dark:border-slate-800 p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                  <button 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <Facebook size={16} />
                    </div>
                    Facebook
                  </button>
                  <button 
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`, '_blank')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white">
                      <Twitter size={16} />
                    </div>
                    Twitter (X)
                  </button>
                  <button 
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white">
                      <Linkedin size={16} />
                    </div>
                    LinkedIn
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                      <LinkIcon size={16} />
                    </div>
                    Sao chép link
                  </button>
                </div>
              </div>

              <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                <Bookmark size={20} />
              </button>
              <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-8 pt-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Bình luận ({blog.commentCount})</h3>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <textarea 
                  placeholder="Viết bình luận của bạn..."
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-primary min-h-[100px] resize-none"
                />
                <div className="flex justify-end">
                  <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform">
                    <Send size={18} /> Gửi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-10">
          {relatedBlogs.length > 0 && (
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-lg mb-6 uppercase tracking-widest text-primary">Bài viết liên quan</h3>
              <div className="space-y-6">
                {relatedBlogs.map((related) => (
                  <Link key={related.blogId} to={`/blog/${related.blogId}`} className="flex gap-4 group">
                    <img src={related.thumbnail} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" alt={related.title} />
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">{related.title}</h4>
                      <span className="text-[10px] text-slate-500 uppercase font-bold">
                        {new Date(related.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

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
};

export default BlogDetailPage;
