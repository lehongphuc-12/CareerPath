import React from 'react';
import { Button } from '../../../common/Button';
import { motion } from 'framer-motion';

export const SettingsTab: React.FC = () => {
  return (
    <motion.div
      key="settings-tab"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Cài đặt tài khoản
      </h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl premium-shadow p-8 border border-slate-100/50 dark:border-slate-800/50">
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">
                Email thông báo
              </h4>
              <p className="text-sm text-slate-500">Nhận cập nhật qua email</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
          </div>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">
                Chế độ riêng tư
              </h4>
              <p className="text-sm text-slate-500">Ẩn hồ sơ với người lạ</p>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-primary" />
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="danger" className="rounded-2xl">
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
