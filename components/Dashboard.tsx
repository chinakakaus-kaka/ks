import React, { useEffect, useState } from 'react';
import { User, ExamRecord } from '../types';
import { getLeaderboard, getUserResults } from '../services/storage';
import { Trophy, Clock, PlayCircle, History, FileText, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<ExamRecord[]>([]);
  const [myHistory, setMyHistory] = useState<ExamRecord[]>([]);

  useEffect(() => {
    setLeaderboard(getLeaderboard());
    // Get all results for current user, newest first
    setMyHistory(getUserResults(user.username).reverse());
  }, [user]);

  const startExam = () => {
    navigate('/exam');
  };

  const startStudy = () => {
    navigate('/study');
  };

  const reviewExam = (record: ExamRecord) => {
    navigate('/result', { state: { result: record, isReview: true } });
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#005697] to-[#0076ce] rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">你好，{user.name}</h1>
          <p className="text-blue-100 opacity-90">
            准备好测试你的业管专业知识了吗？本次考试共20题，满分100分。
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={startStudy}
            className="bg-blue-600/50 hover:bg-blue-600/70 border border-blue-400/30 text-white px-6 py-4 rounded-xl font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <BookOpen size={24} />
            考前复习
          </button>
          <button
            onClick={startExam}
            className="bg-white text-[#005697] px-8 py-4 rounded-xl font-bold shadow-md hover:bg-gray-50 transition-all flex items-center gap-2 transform hover:scale-105"
          >
            <PlayCircle size={24} />
            开始考试
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: My History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col max-h-[600px]">
            <div className="p-6 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2 text-gray-800">
                <History className="text-[#005697]" />
                <h2 className="text-xl font-bold">我的考试记录</h2>
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1 p-6 pt-0">
              {myHistory.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <p>暂无考试记录，快去开始第一次考试吧！</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-gray-100 text-left text-sm text-gray-500">
                        <th className="py-3 font-medium">日期</th>
                        <th className="py-3 font-medium">分数</th>
                        <th className="py-3 font-medium">评级</th>
                        <th className="py-3 font-medium text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {myHistory.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 text-sm text-gray-600">
                            {new Date(record.date).toLocaleString()}
                          </td>
                          <td className="py-4">
                            <span className={`font-bold ${
                              record.score >= 90 ? 'text-green-600' :
                              record.score >= 60 ? 'text-orange-500' : 'text-red-500'
                            }`}>
                              {Math.round(record.score)}分
                            </span>
                          </td>
                          <td className="py-4 text-sm">
                            <span className={`px-2 py-1 rounded text-xs ${
                              record.score >= 90 ? 'bg-green-100 text-green-700' : 
                              record.score >= 60 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {record.score >= 90 ? '优秀' : record.score >= 60 ? '合格' : '不合格'}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button 
                              onClick={() => reviewExam(record)}
                              className="text-[#005697] text-sm hover:underline font-medium inline-flex items-center gap-1 ml-auto"
                            >
                              <FileText size={14} />
                              查看详情
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Leaderboard */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-6 text-gray-800">
              <Trophy className="text-yellow-500" />
              <h2 className="text-xl font-bold">高分光荣榜</h2>
            </div>

            <div className="space-y-4">
              {leaderboard.length === 0 ? (
                <p className="text-gray-400 text-center py-4">暂无数据</p>
              ) : (
                leaderboard.map((record, index) => (
                  <div key={record.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                        ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                          index === 1 ? 'bg-gray-200 text-gray-700' :
                          index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-white border border-gray-200 text-gray-500'}
                      `}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{record.name}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(record.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#005697]">{Math.round(record.score)}分</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;