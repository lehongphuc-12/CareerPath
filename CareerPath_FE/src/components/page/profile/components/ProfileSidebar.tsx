import React from 'react';
import { Camera } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ProfileSidebarProps {
  profile: any;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  menuItems: MenuItem[];
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  profile,
  activeTab,
  setActiveTab,
  handleAvatarChange,
  menuItems,
}) => {
  return (
    <aside className="lg:col-span-3 space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl premium-shadow p-6 overflow-hidden">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative group mb-4">
            <div className="h-24 w-24 rounded-full border-4 border-slate-50 dark:border-slate-800 overflow-hidden shadow-md">
              <img
                src={
                  profile.image ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
                }
                className="h-full w-full object-cover"
                alt="Avatar"
              />
            </div>
            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full cursor-pointer transition-opacity duration-300">
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                className="hidden"
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </label>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
            {profile.fullName}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{profile.email}</p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 translate-x-1'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Cấp độ
              </span>
              <span className="text-xs font-bold text-primary">Lv. 5</span>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[65%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-center">
              Hoàn thành 3 bài viết nữa để lên cấp!
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
