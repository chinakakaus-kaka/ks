import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser, setCurrentUser as saveUserSession } from './services/storage';
import { User } from './types';
import Logo from './components/Logo';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Exam from './components/Exam';
import Result from './components/Result';
import StudyMode from './components/StudyMode';
import PublicScoreboard from './components/PublicScoreboard';
import { LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    saveUserSession(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveUserSession(null);
  };

  if (loading) return null;

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#f3f4f6]">
        {/* Navigation Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Logo />
            {currentUser && (
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-bold text-gray-700">{currentUser.name}</p>
                  <p className="text-xs text-gray-400">{currentUser.username}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="退出登录"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/"
              element={
                currentUser ? (
                  <Dashboard user={currentUser} />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start min-h-[70vh] pt-4 lg:pt-10">
                    <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
                      <AuthForm onLogin={handleLogin} />
                    </div>
                    <div className="w-full max-w-2xl mx-auto lg:mx-0">
                      <PublicScoreboard />
                    </div>
                  </div>
                )
              }
            />
            <Route
              path="/exam"
              element={
                currentUser ? <Exam user={currentUser} /> : <Navigate to="/" />
              }
            />
             <Route
              path="/study"
              element={
                currentUser ? <StudyMode /> : <Navigate to="/" />
              }
            />
            <Route
              path="/result"
              element={
                currentUser ? <Result /> : <Navigate to="/" />
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} 中国电信云南公司业务管理中心. All rights reserved.</p>
            <p className="mt-1 text-xs">内部系统 | 请勿外传</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;