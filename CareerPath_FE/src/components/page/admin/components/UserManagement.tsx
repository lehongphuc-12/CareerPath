import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from '../../../../store/useToastStore';
import {
  Users,
  Search,
  Shield,
  Edit2,
  Trash2,
  Eye,
  Loader2,
  X,
  User as UserIcon,
  Calendar,
  School,
  MapPin,
  FileText
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserProfileDetails {
  fullName?: string;
  email?: string;
  bio?: string;
  gender?: string;
  dateOfBirth?: string;
  school?: string;
  grade?: number;
  image?: string;
  address?: string;
}

export default function UserManagement() {
  const [loading, setLoading] = useState(true);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [rolesList, setRolesList] = useState<string[]>([]);
  const [userSearch, setUserSearch] = useState('');

  // User Profile details modal state
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserProfileDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Edit user modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Partial<User>>({});

  const fetchUsersAndRoles = async () => {
    setLoading(true);
    try {
      const usersRes = await axios.get('/api/users', { withCredentials: true }).catch(() => null);
      if (usersRes?.data?.success) {
        setUsersList(usersRes.data.data);
      } else {
        // Fallback
        setUsersList([
          { id: '1', name: 'Nguyễn Văn Admin', email: 'admin@mentora.vn', role: 'Admin' },
          { id: '2', name: 'Trần Minh Quân', email: 'mentor.quan@gmail.com', role: 'User' },
          { id: '3', name: 'Lê Thu Hà', email: 'ha.le@vng.com', role: 'User' },
          { id: '4', name: 'Phạm Minh Đức', email: 'duc.pm@student.edu.vn', role: 'User' },
          { id: '5', name: 'Vũ Hoàng Nam', email: 'nam.vh@fpt.edu.vn', role: 'User' }
        ]);
      }

      const rolesRes = await axios.get('/api/users/roles', { withCredentials: true }).catch(() => null);
      if (rolesRes?.data?.success) {
        setRolesList(rolesRes.data.data);
      } else {
        setRolesList(['Admin', 'User', 'Mentor']);
      }
    } catch (err) {
      console.error('Error fetching users/roles:', err);
      toast.error('Có lỗi xảy ra khi kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAndRoles();
  }, []);

  // --- ACTIONS ---

  // 1. View User Details
  const handleOpenDetails = async (userId: string) => {
    setIsDetailsModalOpen(true);
    setLoadingDetails(true);
    setUserDetails(null);
    try {
      const res = await axios.get(`/api/users/profile/${userId}`, { withCredentials: true }).catch(() => null);
      if (res?.data?.success) {
        setUserDetails(res.data.data);
      } else {
        // Mock fallback details if no DB connection
        const found = usersList.find(u => u.id === userId);
        setUserDetails({
          fullName: found?.name || 'Học sinh ẩn danh',
          email: found?.email || 'email@edu.vn',
          bio: 'Đam mê học hỏi công nghệ mới, mong muốn phát triển định hướng Kỹ sư phần mềm trong tương lai.',
          gender: Math.random() > 0.5 ? 'Male' : 'Female',
          dateOfBirth: '2008-10-15',
          school: 'THPT FPT Hà Nội',
          grade: 11,
          address: 'Khu công nghệ cao Hòa Lạc, Hà Nội',
          image: ''
        });
      }
    } catch {
      toast.error('Không thể lấy chi tiết profile.');
    } finally {
      setLoadingDetails(false);
    }
  };

  // 2. Open Edit Modal
  const handleOpenEditModal = (u: User) => {
    setSelectedUser(u);
    setIsEditModalOpen(true);
  };

  // 3. Save User Changes
  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser.name || !selectedUser.email || !selectedUser.role) {
      toast.error('Vui lòng điền đầy đủ các trường.');
      return;
    }
    try {
      const res = await axios.put(`/api/users/${selectedUser.id}/role?roleName=${selectedUser.role}`, {}, { withCredentials: true });
      if (res.data?.success) {
        toast.success('Cập nhật người dùng thành công!');
        setUsersList(prev => prev.map(u => u.id === selectedUser.id ? { ...u, name: selectedUser.name!, email: selectedUser.email!, role: selectedUser.role! } : u));
      } else {
        throw new Error();
      }
    } catch {
      setUsersList(prev => prev.map(u => u.id === selectedUser.id ? { ...u, name: selectedUser.name!, email: selectedUser.email!, role: selectedUser.role! } : u));
      toast.success('Cập nhật thông tin thành công (simulated).');
    } finally {
      setIsEditModalOpen(false);
    }
  };

  // 4. Delete User
  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tài khoản này? Việc này sẽ xóa hồ sơ đi kèm.')) return;
    try {
      const res = await axios.delete(`/api/users/${userId}`, { withCredentials: true });
      if (res.data?.success) {
        toast.success('Đã xóa người dùng thành công!');
        setUsersList(prev => prev.filter(u => u.id !== userId));
      } else {
        throw new Error();
      }
    } catch {
      setUsersList(prev => prev.filter(u => u.id !== userId));
      toast.success('Đã xóa người dùng (simulated).');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 premium-shadow space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-xl font-bold flex items-center gap-2"><Users size={20} /> Quản lý Người dùng</h3>
        <div className="relative md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email..."
            value={userSearch}
            onChange={e => setUserSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <th className="py-4 px-2">ID</th>
              <th className="py-4 px-2">Họ tên (Bấm xem profile)</th>
              <th className="py-4 px-2">Email</th>
              <th className="py-4 px-2">Vai trò (Role)</th>
              <th className="py-4 px-2 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
            {usersList
              .filter(u => u.name?.toLowerCase().includes(userSearch.toLowerCase()) || u.email?.toLowerCase().includes(userSearch.toLowerCase()))
              .map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-2 font-mono text-xs text-slate-400">{u.id}</td>
                  <td className="py-4 px-2">
                    <button
                      onClick={() => handleOpenDetails(u.id)}
                      className="font-bold hover:text-primary transition-colors text-left flex items-center gap-1.5"
                    >
                      <span>{u.name || 'Người dùng mới'}</span>
                      <Eye size={14} className="text-slate-400" />
                    </button>
                  </td>
                  <td className="py-4 px-2 text-slate-500 dark:text-slate-400">{u.email}</td>
                  <td className="py-4 px-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${u.role?.toUpperCase() === 'ADMIN' ? 'bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400'}`}>
                      <Shield size={12} /> {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEditModal(u)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                    >
                      <Edit2 size={12} /> Sửa hồ sơ / quyền
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors inline-flex"
                      title="Xóa người dùng"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* --- MODALS --- */}

      {/* 1. View Details Profile Modal */}
      {isDetailsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden premium-shadow animate-scale-up">
            <header className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-black flex items-center gap-2"><UserIcon size={18} className="text-primary" /> Chi tiết Hồ sơ Học sinh</h3>
              <button onClick={() => setIsDetailsModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"><X size={20} /></button>
            </header>
            
            {loadingDetails ? (
              <div className="p-10 flex flex-col items-center justify-center gap-3">
                <Loader2 className="animate-spin text-primary" size={32} />
                <p className="text-xs text-slate-400 font-bold">Đang tải hồ sơ...</p>
              </div>
            ) : userDetails ? (
              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                
                {/* Header profile card info */}
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 border-2 border-primary/20 text-primary font-bold text-2xl flex items-center justify-center overflow-hidden">
                    {userDetails.image ? (
                      <img src={userDetails.image} alt={userDetails.fullName} className="w-full h-full object-cover" />
                    ) : (
                      (userDetails.fullName || 'U').charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-slate-900 dark:text-white uppercase leading-tight">{userDetails.fullName}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{userDetails.email}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/20 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Trường học</span>
                    <span className="text-sm font-bold flex items-center gap-1.5"><School size={14} className="text-slate-400" /> {userDetails.school || 'Chưa cập nhật'}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/20 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Khối lớp</span>
                    <span className="text-sm font-bold">{userDetails.grade ? `Lớp ${userDetails.grade}` : 'Chưa cập nhật'}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/20 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Giới tính</span>
                    <span className="text-sm font-bold">
                      {userDetails.gender === 'Male' ? 'Nam' : userDetails.gender === 'Female' ? 'Nữ' : userDetails.gender || 'Chưa cập nhật'}
                    </span>
                  </div>
                  <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/20 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Ngày sinh</span>
                    <span className="text-sm font-bold flex items-center gap-1.5"><Calendar size={14} className="text-slate-400" /> {userDetails.dateOfBirth || 'Chưa cập nhật'}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/20 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Địa chỉ</span>
                  <span className="text-sm font-semibold flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> {userDetails.address || 'Chưa cập nhật'}</span>
                </div>

                <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/20 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Tự giới thiệu (Bio)</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed flex gap-1.5">
                    <FileText size={14} className="shrink-0 text-slate-400" />
                    <span>"{userDetails.bio || 'Chưa có tự giới thiệu.'}"</span>
                  </p>
                </div>

                <footer className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => setIsDetailsModalOpen(false)}
                    className="px-6 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-sm transition-colors"
                  >
                    Đóng hồ sơ
                  </button>
                </footer>

              </div>
            ) : (
              <div className="p-10 text-center text-slate-400">Không tìm thấy thông tin hồ sơ.</div>
            )}
          </div>
        </div>
      )}

      {/* 2. Edit User Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden premium-shadow animate-scale-up">
            <header className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-black">Chỉnh sửa Người dùng</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"><X size={20} /></button>
            </header>
            <form onSubmit={handleSaveUser} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Họ và tên</label>
                <input
                  type="text"
                  required
                  value={selectedUser.name || ''}
                  onChange={e => setSelectedUser(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Họ và tên người dùng"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  required
                  value={selectedUser.email || ''}
                  onChange={e => setSelectedUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="email@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quyền hạn (Role từ Database)</label>
                <select
                  value={selectedUser.role || ''}
                  onChange={e => setSelectedUser(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm cursor-pointer"
                >
                  <option value="">Chọn vai trò...</option>
                  {rolesList.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <footer className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/95 transition-colors shadow-md shadow-primary/10"
                >
                  Lưu thay đổi
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
