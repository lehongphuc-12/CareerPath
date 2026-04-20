import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { authService } from '../services/authService';
import { useStore } from '../store/useStore';
import { LoginRequest } from '../types/auth';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login(formData);
      authService.saveAuth(response);
      setUser({
        ...response.user,
        level: 1,
        xp: 0
      });
      navigate('/');
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.loginWithGoogle(credential);
      authService.saveAuth(response);
      setUser({
        ...response.user,
        level: 1,
        xp: 0
      });
      navigate('/');
    } catch (err) {
      setError('Đăng nhập bằng Google thất bại. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    showPassword,
    isLoading,
    error,
    togglePasswordVisibility,
    handleInputChange,
    handleLogin,
    handleGoogleLogin,
  };
};
