import React, { useState } from 'react';
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
  ChevronRight,
  Heart,
  Send,
  MoreHorizontal,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon
} from 'lucide-react';
import { blogs as mockBlogs } from '../../../api/mockData';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = mockBlogs.find(b => b.id === Number(id)) || mockBlogs[0];
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(124);

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
            {blog.category}
          </span>
          <span className="flex items-center gap-2"><Calendar size={16} /> {blog.date}</span>
          <span className="flex items-center gap-2"><Clock size={16} /> {blog.readTime} đọc</span>
          <span className="flex items-center gap-2"><User size={16} /> {blog.author}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-10">
          <div className="aspect-video rounded-3xl overflow-hidden premium-shadow">
            <img 
              src={blog.image} 
              className="w-full h-full object-cover" 
              alt={blog.title}
            />
          </div>

          <article className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {blog.excerpt}
            </p>
            <div className="text-lg text-slate-600 dark:text-slate-400 leading-loose space-y-6 mt-8">
              <p>
                Định hướng nghề nghiệp là một hành trình dài và đòi hỏi sự kiên nhẫn. Trong thời đại số ngày nay, 
                việc nắm bắt các xu hướng công nghệ không chỉ là lợi thế mà còn là điều kiện tiên quyết để thành công.
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">1. Hiểu rõ bản thân</h3>
              <p>
                Trước khi nhìn ra thế giới rộng lớn, hãy dành thời gian để hiểu rõ chính mình. Bạn thích điều gì? 
                Bạn giỏi ở lĩnh vực nào? Những giá trị nào là quan trọng đối với bạn trong công việc?
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border-l-4 border-primary my-12">
                <p className="italic text-slate-700 dark:text-slate-300 m-0">
                  "Cách tốt nhất để dự đoán tương lai là tự tay tạo ra nó." - Abraham Lincoln
                </p>
              </div>
            </div>
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
                24
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
                      // You could add a toast here if you have one
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
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Bình luận (24)</h3>
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
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-6 uppercase tracking-widest text-primary">Bài viết liên quan</h3>
            <div className="space-y-6">
              {mockBlogs.filter(b => b.id !== blog.id).slice(0, 3).map(related => (
                <Link key={related.id} to={`/blog/${related.id}`} className="flex gap-4 group">
                  <img src={related.image} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" alt="" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">{related.title}</h4>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">{related.date}</span>
                  </div>
                </Link>
              ))}
            </div>
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
};

export default BlogDetailPage;
