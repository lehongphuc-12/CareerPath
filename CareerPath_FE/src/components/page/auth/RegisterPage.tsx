import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useRegister } from '../../../hooks/useRegister';
import { GoogleLogin } from '@react-oauth/google';
import { useLogin } from '@/src/hooks/useLogin';
export default function RegisterPage() {
  const {
    formData,
    showPassword,
    showConfirmPassword,
    isLoading,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleInputChange,
    handleRegister,
  } = useRegister();
  const { handleGoogleLogin } = useLogin();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-background-dark overflow-hidden">
      {/* Visual Side (Left) - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#4f46e5] via-primary to-primary" />
        <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 p-12 text-white max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter">CareerPaths</span>
            </div>

            <h1 className="text-5xl font-black leading-tight mb-6">
              Bắt đầu hành trình <br /> mới của bạn
            </h1>
            <p className="text-xl text-white/80 font-medium mb-12">
              Gia nhập cộng đồng hơn 50,000 học sinh, sinh viên đang tìm kiếm đam mê và định hướng
              tương lai mỗi ngày.
            </p>

            <div className="space-y-4">
              {[
                'Lộ trình cá nhân hóa hoàn toàn',
                'Kết nối trực tiếp với Mentor đầu ngành',
                'Thư viện nghề nghiệp đồ sộ và cập nhật',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form Side (Right) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12 py-12 relative overflow-y-auto">
        <div className="absolute top-8 left-8">
          <Link
            to="/"
            className="group flex items-center gap-2 text-slate-500 hover:text-primary transition-all font-bold"
          >
            <div className="p-2 rounded-full border border-slate-200 dark:border-slate-800 group-hover:bg-primary/10 transition-colors">
              <ArrowLeft size={18} />
            </div>
            <span className="text-sm">Về trang chủ</span>
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl space-y-8"
        >
          {/* Header */}
          <div className="space-y-2 text-center">
            <motion.h2 variants={itemVariants} className="text-4xl font-black tracking-tight">
              Tạo tài khoản mới
            </motion.h2>

            <motion.p variants={itemVariants} className="text-slate-500 font-medium">
              Chỉ mất 1 phút để bắt đầu khám phá bản thân
            </motion.p>
          </div>

          {/* Register Form */}
          <form className="space-y-8" onSubmit={handleRegister}>
            {/* Group: Personal Info */}
            <div className="space-y-4">
              {/* <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Thông tin cá nhân
              </h3> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-black text-slate-700 dark:text-slate-300 ml-1">
                    Họ và tên
                  </label>
                  <div className="group relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                      size={18}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nguyễn Văn A"
                      required
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium"
                    />
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-black text-slate-700 dark:text-slate-300 ml-1">
                    Số điện thoại
                  </label>
                  <div className="group relative">
                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                      size={18}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0123 456 789"
                      required
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium"
                    />
                  </div>
                </motion.div>
              </div>
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-black text-slate-700 dark:text-slate-300 ml-1">
                  Địa chỉ Email
                </label>
                <div className="group relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium"
                  />
                </div>
              </motion.div>
            </div>

            {/* Group: Account Info */}
            <div className="space-y-4">
              {/* <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Thông tin tài khoản
              </h3> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-black text-slate-700 dark:text-slate-300 ml-1">
                    Mật khẩu
                  </label>
                  <div className="group relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                      size={18}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-11 pr-11 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-black text-slate-700 dark:text-slate-300 ml-1">
                    Xác nhận mật khẩu
                  </label>
                  <div className="group relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                      size={18}
                    />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-11 pr-11 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-5 h-5 mt-0.5 rounded-lg border-slate-300 text-primary focus:ring-primary cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-tight cursor-pointer"
              >
                Tôi đồng ý với{' '}
                <button type="button" className="text-primary hover:underline">
                  Điều khoản
                </button>{' '}
                &{' '}
                <button type="button" className="text-primary hover:underline">
                  Chính sách bảo mật
                </button>
              </label>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Tạo tài khoản ngay
                  <ChevronRight size={18} />
                </div>
              )}
            </motion.button>
          </form>

          {/* Social Register */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs font-black uppercase tracking-widest text-slate-400">
                <span className="px-4 bg-white dark:bg-background-dark">Hoặc đăng ký bằng</span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    handleGoogleLogin(credentialResponse.credential);
                  }
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                useOneTap
                theme="outline"
                size="large"
                width="100%"
              />
            </div>
          </motion.div>

          {/* Links */}
          <motion.p
            variants={itemVariants}
            className="text-center text-sm font-bold text-slate-500"
          >
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-primary hover:underline underline-offset-4">
              Đăng nhập tại đây
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
