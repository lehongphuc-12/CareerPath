import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, BookOpen } from 'lucide-react';

export default function LandingPage() {
  const reduce = useReducedMotion();

  const heroMotion = {
    initial: reduce ? false : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { type: 'spring' as const, damping: 20, stiffness: 100 }
  };

  return (
    <div className="w-full">
      {/* HERO SECTION - Asymmetric Split */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 md:pt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[75dvh]">
          
          <div className="flex flex-col items-start gap-6 z-10">
            {/* 1. Eyebrow */}
            <motion.div
              {...heroMotion}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em]"
            >
              Định hướng tương lai cho Gen Z
            </motion.div>

            {/* 2. Headline */}
            <motion.h1
              {...heroMotion}
              transition={{ ...heroMotion.transition, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-slate-800 dark:text-white"
            >
              Khám phá bản thân, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Chinh phục sự nghiệp</span>
            </motion.h1>

            {/* 3. Subtext (Max 20 words per audit rules) */}
            <motion.p
              {...heroMotion}
              transition={{ ...heroMotion.transition, delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-[45ch] leading-relaxed"
            >
              Nền tảng hướng nghiệp AI giúp học sinh THPT tìm thấy đam mê và lộ trình phát triển phù hợp nhất.
            </motion.p>

            {/* 4. CTAs */}
            <motion.div
              {...heroMotion}
              transition={{ ...heroMotion.transition, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.div whileTap={reduce ? {} : { scale: 0.98 }}>
                <Link
                  to="/pre-test"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Bắt đầu khám phá <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.div whileTap={reduce ? {} : { scale: 0.98 }}>
                <Link
                  to="/careers"
                  className="inline-flex items-center justify-center glass-panel text-slate-800 dark:text-white px-8 py-4 rounded-xl font-bold hover:bg-white/90 dark:hover:bg-slate-800/80 transition-all premium-shadow"
                >
                  Xem thư viện ngành
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            {...heroMotion}
            transition={{ ...heroMotion.transition, delay: 0.3 }}
            className="relative w-full aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden glass-panel premium-shadow p-2"
          >
             <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800">
               <img 
                 src="/hero-image.png" 
                 alt="Góc học tập truyền cảm hứng của học sinh Gen Z" 
                 className="object-cover w-full h-full transform transition-transform duration-1000 hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-60 mix-blend-overlay"></div>
             </div>
             <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/20 dark:ring-white/10 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION - Asymmetric Bento Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24">
        <motion.div 
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Các tính năng cốt lõi</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cell 1: Test Năng lực (Wide) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.1 }}
            className="lg:col-span-2 p-8 md:p-10 rounded-[2rem] glass-panel premium-shadow flex flex-col justify-between overflow-hidden relative group hover:bg-white/90 dark:hover:bg-slate-800/80 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="size-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white">Test Năng lực</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                Bài test chuyên sâu đánh giá 6 khía cạnh cốt lõi. Giúp bạn thấu hiểu chính mình trước khi chọn ngành.
              </p>
            </div>
            {/* Visual variation for bento background diversity */}
            <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700 pointer-events-none text-blue-500">
              <Target size={300} strokeWidth={1} />
            </div>
          </motion.div>

          {/* Cell 2: Kết nối Mentor (Square) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.2 }}
            className="p-8 md:p-10 rounded-[2rem] glass-panel premium-shadow flex flex-col relative group hover:bg-white/90 dark:hover:bg-slate-800/80 transition-colors overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="size-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white">Kết nối Mentor</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Trò chuyện cùng các chuyên gia hàng đầu trong ngành để nhận lời khuyên thực tế.
              </p>
            </div>
          </motion.div>

          {/* Cell 3: Lộ trình học (Wide bottom row) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-3 p-8 md:p-10 rounded-[2rem] glass-panel premium-shadow flex flex-col md:flex-row gap-8 items-center relative group hover:bg-white/90 dark:hover:bg-slate-800/80 transition-colors overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex-1 relative z-10">
              <div className="size-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <BookOpen size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white">Lộ trình học</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-lg">
                Kế hoạch hành động chi tiết cho từng giai đoạn. Từ THPT đến Đại học và những bước đi đầu tiên trong sự nghiệp của bạn.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
