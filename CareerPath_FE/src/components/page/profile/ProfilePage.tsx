import React, { useState } from 'react';
import {
  Camera,
  Mail,
  User,
  School,
  Calendar,
  ChevronRight,
  Edit2,
  Save,
  X,
  Target,
  MapPin,
  LayoutDashboard,
  FileText,
  Settings,
  History,
  Plus,
  MoreVertical,
  Trash2,
  Eye,
} from 'lucide-react';
import { useProfile } from '../../../hooks/useProfile';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { motion, AnimatePresence } from 'framer-motion';
import { blogs as mockBlogs } from '../../../api/mockData';

const ProfilePage: React.FC = () => {
  const { profile, loading, updating, updateProfile, uploadAvatar } = useProfile();
  const [activeTab, setActiveTab] = useState<'profile' | 'blogs' | 'history' | 'settings'>(
    'profile'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

  const handleStartEdit = () => {
    if (profile) {
      setEditData({
        fullName: profile.fullName,
        bio: profile.bio || '',
        school: profile.school || '',
        grade: profile.grade || 0,
        gender: profile.gender || '',
        dateOfBirth: profile.dateOfBirth || '',
        address: profile.address || '',
        image: profile.image || '',
      });
      setSelectedAvatar(null);
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    const dataToUpdate = { ...editData };

    if (selectedAvatar) {
      dataToUpdate.image = selectedAvatar;
    }

    const success = await updateProfile(dataToUpdate);
    if (success) {
      setIsEditing(false);
      setSelectedAvatar(null);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (!isEditing && profile) {
        setEditData({
          fullName: profile.fullName,
          bio: profile.bio || '',
          school: profile.school || '',
          grade: profile.grade || 0,
          gender: profile.gender || '',
          dateOfBirth: profile.dateOfBirth || '',
          address: profile.address || '',
          image: previewUrl,
        });
        setIsEditing(true);
      } else {
        setEditData((prev: any) => ({ ...prev, image: previewUrl }));
      }
      setSelectedAvatar(file);
    }
  };

  if (loading) return <Loading />;
  if (!profile) return null;

  const menuItems = [
    { id: 'profile', label: 'Thông tin cá nhân', icon: <User className="w-5 h-5" /> },
    { id: 'blogs', label: 'Quản lý bài viết', icon: <FileText className="w-5 h-5" /> },
    { id: 'history', label: 'Lịch sử hoạt động', icon: <History className="w-5 h-5" /> },
    { id: 'settings', label: 'Cài đặt tài khoản', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
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

          {/* Main Content Area */}
          <main className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
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
              )}

              {activeTab === 'blogs' && (
                <motion.div
                  key="blogs-tab"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Quản lý bài viết
                      </h1>
                      <p className="text-slate-500 dark:text-slate-400">
                        Bạn đã chia sẻ {mockBlogs.length} bài viết với cộng đồng
                      </p>
                    </div>
                    <Button className="rounded-2xl shadow-lg shadow-primary/25">
                      <Plus className="w-4 h-4 mr-2" /> Viết bài mới
                    </Button>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-3xl premium-shadow overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Bài viết
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Danh mục
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Ngày đăng
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Lượt xem
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Thao tác
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {mockBlogs.map((blog) => (
                            <tr
                              key={blog.id}
                              className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-200"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={blog.image}
                                    className="h-12 w-16 object-cover rounded-xl shadow-sm"
                                    alt=""
                                  />
                                  <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                                      {blog.title}
                                    </h4>
                                    <span className="text-[10px] text-slate-400 uppercase font-bold">
                                      {blog.readTime} đọc
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-lg">
                                  {blog.category}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                {blog.date}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                                  <Eye className="w-4 h-4 opacity-50" />
                                  1.2k
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-primary transition-colors">
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'history' && (
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
              )}

              {activeTab === 'settings' && (
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
                  <Card>
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
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

// ================= SUB-COMPONENTS =================

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

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-background-dark">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-8 w-8 bg-primary/20 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default ProfilePage;
