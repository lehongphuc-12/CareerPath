import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { authService } from '../services/authService';
import { useStore } from '../store/useStore';
import { toast } from '../store/useToastStore';
import { RegisterRequest } from '../types/auth';

export const useRegister = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RegisterRequest>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      toast.warning('Mật khẩu xác nhận không khớp.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create request object without confirmPassword
      const { confirmPassword, ...registerData } = formData;
      const response = await authApi.register(registerData);
      authService.saveAuth(response);
      setUser({
        ...response.user,
        level: 1,
        xp: 0
      });
      toast.success('Đăng ký thành công!');
      navigate('/');
    } catch (err: any) {
      const msg = err.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.';
      setError(msg);
      toast.error(msg);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    isLoading,
    error,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleInputChange,
    handleRegister,
  };
};
