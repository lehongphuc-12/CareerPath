import { motion } from 'framer-motion';
import { Target, Heart, Shield, Zap, Users, Globe } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Học sinh đã giúp đỡ', value: '50,000+' },
    { label: 'Mentor chuyên gia', value: '200+' },
    { label: 'Ngành nghề phân tích', value: '150+' },
    { label: 'Tỷ lệ hài lòng', value: '98%' },
  ];

  const values = [
    {
      icon: <Heart className="text-pink-500" />,
      title: "Tâm huyết",
      desc: "Chúng tôi đặt tương lai của học sinh làm trọng tâm trong mọi quyết định."
    },
    {
      icon: <Shield className="text-blue-500" />,
      title: "Tin cậy",
      desc: "Dữ liệu và thuật toán AI được kiểm chứng bởi các chuyên gia giáo dục hàng đầu."
    },
    {
      icon: <Zap className="text-amber-500" />,
      title: "Đột phá",
      desc: "Luôn tiên phong ứng dụng công nghệ mới nhất để tối ưu hóa trải nghiệm định hướng."
    }
  ];

  return (
    <div className="space-y-24 py-10">
      <section className="text-center space-y-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider"
        >
          Câu chuyện của chúng tôi
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-black leading-tight tracking-tight"
        >
          Sứ mệnh định hình <br />
          <span className="text-primary">Thế hệ số Việt Nam</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Mentora ra đời từ khát vọng giải quyết bài toán "chọn sai ngành, làm sai nghề" của hàng triệu học sinh Việt Nam. Chúng tôi tin rằng mỗi cá nhân đều có một thế mạnh riêng cần được khai phá đúng lúc.
        </motion.p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2 shadow-sm"
          >
            <p className="text-3xl font-black text-primary">{stat.value}</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold">Tại sao chọn Mentora?</h2>
          <div className="space-y-6">
            {values.map((value, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-2xl hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all group">
                <div className="size-14 shrink-0 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold">{value.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
              alt="Team working" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 p-8 bg-primary text-white rounded-3xl shadow-xl hidden md:block">
            <p className="text-4xl font-black">5+</p>
            <p className="font-bold opacity-80">Năm kinh nghiệm</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white rounded-[3rem] p-12 md:p-20 text-center space-y-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full"></div>
        
        <h2 className="text-4xl md:text-5xl font-bold relative z-10">Sẵn sàng bắt đầu hành trình?</h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto relative z-10">
          Đừng để tương lai của bạn là một ẩn số. Hãy để Mentora đồng hành cùng bạn trên con đường chinh phục ước mơ.
        </p>
        <div className="flex justify-center gap-4 relative z-10">
          <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform">
            Bắt đầu Test ngay
          </button>
        </div>
      </section>
    </div>
  );
}
