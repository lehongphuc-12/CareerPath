import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Facebook, Linkedin, Twitter } from 'lucide-react';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail className="text-blue-500" />,
      label: "Email",
      value: "hello@mentora.vn",
      desc: "Chúng tôi phản hồi trong vòng 24h."
    },
    {
      icon: <Phone className="text-emerald-500" />,
      label: "Hotline",
      value: "1900 6868",
      desc: "Thứ 2 - Thứ 6 (8:00 - 18:00)"
    },
    {
      icon: <MapPin className="text-orange-500" />,
      label: "Văn phòng",
      value: "Tòa nhà Innovation, Quận 1, TP. HCM",
      desc: "Ghé thăm chúng tôi để được tư vấn trực tiếp."
    }
  ];

  return (
    <div className="space-y-20 py-10">
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl font-black tracking-tight">Liên hệ với chúng tôi</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400">
          Bạn có câu hỏi hay cần hỗ trợ? Đội ngũ Mentora luôn sẵn sàng lắng nghe bạn.
        </p>
      </section>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div className="grid gap-6">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex gap-6 items-start"
              >
                <div className="size-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {info.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{info.label}</p>
                  <p className="text-xl font-bold">{info.value}</p>
                  <p className="text-sm text-slate-500">{info.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 space-y-6">
            <h4 className="font-bold text-lg">Theo dõi chúng tôi</h4>
            <div className="flex gap-4">
              {[<Facebook />, <Linkedin />, <Twitter />].map((icon, i) => (
                <button key={i} className="size-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-all shadow-sm">
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-black/5"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <MessageSquare className="text-primary" /> Gửi tin nhắn cho Mentora
            </h3>
            <form className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Họ và tên</label>
                <input type="text" placeholder="Nguyễn Văn A" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Email</label>
                <input type="email" placeholder="email@example.com" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Chủ đề</label>
                <select className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary">
                  <option>Tư vấn định hướng</option>
                  <option>Hỗ trợ kỹ thuật</option>
                  <option>Hợp tác Mentor</option>
                  <option>Khác</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tin nhắn</label>
                <textarea rows={4} placeholder="Bạn cần hỗ trợ điều gì?" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary resize-none"></textarea>
              </div>
              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
                  Gửi yêu cầu <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
