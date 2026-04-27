import { useState, useEffect } from 'react';
import { userApi } from '../api/userApi';
import { UserProfile, UpdateProfileRequest } from '../types/user';
import { useToastStore } from '../store/useToastStore';
import { useStore } from '../store/useStore';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { addToast } = useToastStore();
  const { user, setUser } = useStore();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await userApi.getProfile();
      setProfile(data);
    } catch (error) {
      addToast({ message: 'Không thể tải thông tin hồ sơ', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (data: UpdateProfileRequest) => {
    try {
      setUpdating(true);
      const updatedProfile = await userApi.updateProfile(data);
      setProfile(updatedProfile);

      // Update global auth store
      if (user) {
        setUser({
          ...user,
          name: updatedProfile.fullName,
          avatar: updatedProfile.image,
        });
      }

      addToast({ message: 'Cập nhật hồ sơ thành công', type: 'success' });
      return true;
    } catch (error) {
      addToast({ message: 'Cập nhật hồ sơ thất bại', type: 'error' });
      return false;
    } finally {
      setUpdating(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      setUpdating(true);
      const { avatarUrl } = await userApi.uploadAvatar(file);
      if (profile) {
        setProfile({ ...profile, image: avatarUrl });
      }
      return avatarUrl;
    } catch (error) {
      addToast({ message: 'Cập nhật ảnh đại diện thất bại', type: 'error' });
      return null;
    } finally {
      setUpdating(false);
    }
  };

  return {
    profile,
    loading,
    updating,
    updateProfile,
    uploadAvatar,
    refreshProfile: fetchProfile,
  };
};
