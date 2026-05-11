import React from 'react';
import { History } from 'lucide-react';
import { motion } from 'framer-motion';

export const HistoryTab: React.FC = () => {
  return (
    <motion.div
      key="history-tab"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Lịch sử hoạt động
      </h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl premium-shadow p-8 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <History className="w-10 h-10 text-slate-400" />
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Bạn chưa có hoạt động nào gần đây
        </p>
      </div>
    </motion.div>
  );
};
