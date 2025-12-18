import { User, ExamRecord } from '../types';

const KEYS = {
  USERS: 'ct_app_users',
  CURRENT_USER: 'ct_app_current_user',
  RESULTS: 'ct_app_results',
};

// --- User Management ---

export const getUsers = (): User[] => {
  try {
    const stored = localStorage.getItem(KEYS.USERS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse users", error);
    return [];
  }
};

export const registerUser = (user: User): { success: boolean; message: string } => {
  try {
    const users = getUsers();
    if (users.some((u) => u.username === user.username)) {
      return { success: false, message: '用户名已存在' };
    }
    if (users.some((u) => u.email === user.email)) {
      return { success: false, message: '邮箱已被注册' };
    }
    users.push(user);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return { success: true, message: '注册成功' };
  } catch (error) {
    console.error("Registration failed", error);
    return { success: false, message: '系统储存错误，注册失败' };
  }
};

export const loginUser = (username: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find((u) => u.username === username && u.password === password);
  return user || null;
};

export const getCurrentUser = (): User | null => {
  try {
    const stored = localStorage.getItem(KEYS.CURRENT_USER);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: User | null) => {
  try {
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.CURRENT_USER);
    }
  } catch (error) {
    console.error("Session save failed", error);
  }
};

// --- Exam Results ---

export const saveExamResult = (record: ExamRecord): boolean => {
  try {
    const results = getExamResults();
    results.push(record);
    localStorage.setItem(KEYS.RESULTS, JSON.stringify(results));
    return true;
  } catch (error) {
    console.error("Failed to save exam result", error);
    // Even if save fails, return false but don't crash the app
    return false;
  }
};

export const getExamResults = (): ExamRecord[] => {
  try {
    const stored = localStorage.getItem(KEYS.RESULTS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to get exam results", error);
    return [];
  }
};

export const getUserResults = (username: string): ExamRecord[] => {
  return getExamResults().filter((r) => r.username === username);
};

export const getLeaderboard = (limit: number = 10): ExamRecord[] => {
  try {
    // Sort by score (desc), then by date (desc)
    return getExamResults().sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }).slice(0, limit);
  } catch (error) {
    console.error("Leaderboard error", error);
    return [];
  }
};