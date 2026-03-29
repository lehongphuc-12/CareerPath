import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, BookOpen, Award } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-20 py-10">
      <section className="text-center space-y-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Định hướng tương lai cho Gen Z
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black leading-tight tracking-tight"
        >
          Khám phá bản thân, <br />
          <span className="text-primary">Chinh phục sự nghiệp</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
        >
          Nền tảng định hướng nghề nghiệp thông minh sử dụng AI để giúp học sinh THPT tìm thấy đam mê và lộ trình phát triển phù hợp nhất.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 pt-6"
        >
          <Link to="/pre-test" className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-primary/20">
            Bắt đầu khám phá <ArrowRight size={20} />
          </Link>
          <Link to="/careers" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Xem thư viện ngành
          </Link>
        </motion.div>
      </section>

      <section className="grid md:grid-cols-4 gap-8">
        {[
          { icon: <Target className="text-blue-500" />, title: "Test Năng lực", desc: "Bài test chuyên sâu đánh giá 6 khía cạnh cốt lõi." },
          { icon: <Users className="text-purple-500" />, title: "Kết nối Mentor", desc: "Trò chuyện cùng các chuyên gia hàng đầu trong ngành." },
          { icon: <BookOpen className="text-emerald-500" />, title: "Lộ trình học", desc: "Kế hoạch hành động chi tiết cho từng giai đoạn." },
          { icon: <Award className="text-orange-500" />, title: "Gamification", desc: "Tích lũy XP, thăng cấp và nhận huy hiệu thành tựu." }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors"
          >
            <div className="size-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
