import React, { useState } from 'react';
import { User } from '../types';
import { loginUser, registerUser, setCurrentUser } from '../services/storage';
import { UserPlus, LogIn, AlertCircle } from 'lucide-react';

interface AuthFormProps {
  onLogin: (user: User) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const user = loginUser(formData.username, formData.password);
      if (user) {
        setCurrentUser(user);
        onLogin(user);
      } else {
        setError('用户名或密码错误');
      }
    } else {
      if (!formData.name || !formData.email) {
        setError('请填写所有必填项');
        return;
      }
      const newUser: User = {
        username: formData.username,
        password: formData.password,
        name: formData.name,
        email: formData.email
      };
      const result = registerUser(newUser);
      if (result.success) {
        alert('注册成功，请登录');
        setIsLogin(true);
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-[#005697] p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          {isLogin ? '考生登录' : '考生注册'}
        </h2>
        <p className="text-blue-100 text-sm">
          {isLogin ? '欢迎回到业管在线考试系统' : '创建新账号以开始考试'}
        </p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-lg">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="请输入用户名"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">真实姓名</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="请输入真实姓名"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="example@chinatelecom.cn"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#005697] hover:bg-[#004275] text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
          >
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? '登录' : '注册'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm text-[#005697] hover:underline font-medium"
          >
            {isLogin ? '没有账号？立即注册' : '已有账号？返回登录'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
