import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Sparkles, ChevronRight } from 'lucide-react';
import { useLogin } from '../../../hooks/useLogin';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const {
    formData,
    showPassword,
    isLoading,
    error,
    togglePasswordVisibility,
    handleInputChange,
    handleLogin,
    handleGoogleLogin,
  } = useLogin();

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
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-[#4f46e5]" />
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 p-12 text-white max-w-xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter">CareerPaths</span>
            </div>
            
            <h1 className="text-5xl font-black leading-tight mb-6">
              Xây dựng tương lai <br /> theo cách của bạn
            </h1>
            <p className="text-xl text-white/80 font-medium mb-12">
              Hệ thống định hướng nghề nghiệp thông minh giúp bạn khám phá bản thân và lộ trình phát triển sự nghiệp tối ưu nhất.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Chuyên nghiệp', value: '100+' },
                { label: 'Đánh giá', value: '50k+' },
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl">
                  <div className="text-3xl font-black mb-1">{stat.value}</div>
                  <div className="text-sm text-white/60 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Animation Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-20 w-12 h-12 bg-white/10 border border-white/20 rounded-xl backdrop-blur-md"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-20 w-16 h-16 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md"
        />
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
          className="w-full max-w-md space-y-10"
        >
          {/* Header */}
          <div className="space-y-3">
            <motion.h2 variants={itemVariants} className="text-4xl font-black tracking-tight">
              Chào mừng trở lại!
            </motion.h2>
            <motion.p variants={itemVariants} className="text-slate-500 font-medium">
              Vui lòng nhập thông tin để truy cập tài khoản của bạn
            </motion.p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-bold rounded-2xl flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-sm font-black text-slate-700 dark:text-slate-300 ml-1">Email</label>
              <div className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-black text-slate-700 dark:text-slate-300">Mật khẩu</label>
                <button type="button" className="text-xs font-bold text-primary hover:underline">
                  Quên mật khẩu?
                </button>
              </div>
              <div className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-5 h-5 rounded-lg border-slate-300 text-primary focus:ring-primary cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm font-bold text-slate-600 dark:text-slate-400 cursor-pointer">
                Ghi nhớ đăng nhập
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
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Đăng nhập
                  <ChevronRight size={20} />
                </>
              )}
            </motion.button>
          </form>

          {/* Social Login */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs font-black uppercase tracking-widest">
                <span className="px-4 bg-white dark:bg-background-dark text-slate-400">Hoặc tiếp tục với</span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={credentialResponse => {
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
          <motion.p variants={itemVariants} className="text-center text-sm font-bold text-slate-500">
            Bạn chưa có tài khoản?{' '}
            <Link to="/register" className="text-primary hover:underline underline-offset-4">
              Đăng ký miễn phí
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
