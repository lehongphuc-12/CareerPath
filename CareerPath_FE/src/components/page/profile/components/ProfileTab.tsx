import React from 'react';
import {
  User,
  Calendar,
  School,
  MapPin,
  ChevronRight,
  Target,
  Plus,
  Edit2,
  Save,
} from 'lucide-react';
import { Button } from '../../../common/Button';
import { Input } from '../../../common/Input';
import { motion } from 'framer-motion';

interface ProfileTabProps {
  profile: any;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  editData: any;
  setEditData: (data: any) => void;
  handleStartEdit: () => void;
  handleSave: () => void;
  updating: boolean;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  profile,
  isEditing,
  setIsEditing,
  editData,
  setEditData,
  handleStartEdit,
  handleSave,
  updating,
}) => {
  return (
    <motion.div
      key="profile-tab"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl premium-shadow overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="px-8 pb-8 -mt-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-end gap-6">
              <div className="h-24 w-24 rounded-3xl bg-white dark:bg-slate-900 p-1.5 shadow-xl -mt-12 hidden md:block">
                <img
                  src={
                    profile.image ||
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
                  }
                  className="h-full w-full object-cover rounded-2xl"
                  alt="Avatar"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Hồ sơ cá nhân
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                  Quản lý thông tin và sự nghiệp của bạn
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <Button onClick={handleStartEdit} className="rounded-2xl">
                  <Edit2 className="w-4 h-4 mr-2" /> Chỉnh sửa
                </Button>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                    className="rounded-2xl"
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleSave}
                    isLoading={updating}
                    className="rounded-2xl shadow-lg shadow-primary/30"
                  >
                    <Save className="w-4 h-4 mr-2" /> Lưu thay đổi
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Info */}
        <Card className="md:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Thông tin cơ bản
            </h3>
            <User className="w-5 h-5 text-primary opacity-50" />
          </div>

          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={<User />} label="Họ và tên" value={profile.fullName} />
              <InfoItem
                icon={<Calendar />}
                label="Ngày sinh"
                value={profile.dateOfBirth || 'Chưa cập nhật'}
              />
              <InfoItem
                icon={<User />}
                label="Giới tính"
                value={
                  profile.gender === 'Male'
                    ? 'Nam'
                    : profile.gender === 'Female'
                      ? 'Nữ'
                      : profile.gender || 'Chưa cập nhật'
                }
              />
              <InfoItem
                icon={<School />}
                label="Trường"
                value={profile.school || 'Chưa cập nhật'}
              />
              <InfoItem
                icon={<School />}
                label="Khối/Lớp"
                value={profile.grade ? `Khối ${profile.grade}` : 'Chưa cập nhật'}
              />
              <InfoItem
                icon={<MapPin />}
                label="Địa chỉ"
                value={profile.address || 'Chưa cập nhật'}
              />
              <div className="md:col-span-2">
                <InfoItem
                  icon={<ChevronRight />}
                  label="Giới thiệu"
                  value={profile.bio || 'Hãy viết gì đó về bản thân bạn...'}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Họ và tên"
                value={editData.fullName}
                onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
              />
              <Input
                label="Ngày sinh"
                type="date"
                value={editData.dateOfBirth}
                onChange={(e) =>
                  setEditData({ ...editData, dateOfBirth: e.target.value })
                }
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                  Giới tính
                </label>
                <select
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all duration-200"
                  value={editData.gender}
                  onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
              <Input
                label="Trường"
                value={editData.school}
                onChange={(e) => setEditData({ ...editData, school: e.target.value })}
              />
              <Input
                label="Khối"
                type="number"
                value={editData.grade}
                onChange={(e) =>
                  setEditData({ ...editData, grade: parseInt(e.target.value) })
                }
              />
              <Input
                label="Địa chỉ"
                value={editData.address}
                onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              />
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                  Giới thiệu bản thân
                </label>
                <textarea
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all duration-200 min-h-[120px] resize-none"
                  placeholder="Hãy viết gì đó về bản thân bạn..."
                  value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                />
              </div>
            </div>
          )}
        </Card>

        {/* Stats/Goals */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> Mục tiêu
            </h3>
            <div className="space-y-3">
              {['Trở thành Dev', 'Học React', 'IELTS 7.0'].map((goal, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 group hover:bg-primary/5 transition-colors duration-200"
                >
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                    {goal}
                  </span>
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 text-sm font-medium hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Thêm mục tiêu
              </button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
              Thành tích
            </h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600"
                  title="Achievement badge"
                >
                  🏆
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

// Sub-components specific to ProfileTab
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`bg-white dark:bg-slate-900 rounded-3xl premium-shadow p-8 border border-slate-100/50 dark:border-slate-800/50 ${className}`}
  >
    {children}
  </div>
);

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="group space-y-1.5 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-transparent hover:border-primary/20 hover:bg-primary/[0.02] transition-all duration-300">
    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
      {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' })}
      <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-slate-900 dark:text-white font-semibold">{value}</div>
  </div>
);
