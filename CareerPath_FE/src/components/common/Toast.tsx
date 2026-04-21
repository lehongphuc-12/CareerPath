import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToastStore, ToastItem } from '../../store/useToastStore';
import clsx from 'clsx';

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
};

const styles = {
  success:
    'bg-green-50 border-green-200 text-green-800 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400',
  error:
    'bg-red-50 border-red-200 text-red-800 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400',
  info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400',
  warning:
    'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-500/10 dark:border-yellow-500/20 dark:text-yellow-400',
};

const ToastMessage: React.FC<{ toast: ToastItem }> = ({ toast }) => {
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast, removeToast]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={clsx(
        'flex items-start gap-3 p-4 mb-3 border rounded-xl shadow-lg w-80 max-w-full backdrop-blur-md',
        styles[toast.type]
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 text-sm font-medium">{toast.message}</div>
      <button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 p-1 opacity-50 hover:opacity-100 transition-opacity rounded-md hover:bg-black/5 dark:hover:bg-white/10"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export const ToastContainer: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      <div className="pointer-events-auto">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastMessage key={toast.id} toast={toast} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
