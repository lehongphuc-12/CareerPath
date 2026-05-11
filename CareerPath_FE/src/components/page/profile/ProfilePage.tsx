import React, { useState } from 'react';
import { User, FileText, History, Settings } from 'lucide-react';
import { useProfile } from '../../../hooks/useProfile';
import { AnimatePresence } from 'framer-motion';
import { ProfileSidebar } from './components/ProfileSidebar';
import { ProfileTab } from './components/ProfileTab';
import { BlogsTab } from './components/BlogsTab';
import { HistoryTab } from './components/HistoryTab';
import { SettingsTab } from './components/SettingsTab';

const ProfilePage: React.FC = () => {
  const { profile, loading, updating, updateProfile } = useProfile();
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
          <ProfileSidebar 
            profile={profile}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleAvatarChange={handleAvatarChange}
            menuItems={menuItems}
          />

          <main className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <ProfileTab 
                  profile={profile}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  editData={editData}
                  setEditData={setEditData}
                  handleStartEdit={handleStartEdit}
                  handleSave={handleSave}
                  updating={updating}
                />
              )}

              {activeTab === 'blogs' && <BlogsTab />}
              {activeTab === 'history' && <HistoryTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

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
