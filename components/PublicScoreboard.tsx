import React, { useEffect, useState } from 'react';
import { ExamRecord } from '../types';
import { getLeaderboard } from '../services/storage';
import { Trophy, Medal, Award, Clock } from 'lucide-react';

const PublicScoreboard: React.FC = () => {
  const [records, setRecords] = useState<ExamRecord[]>([]);

  useEffect(() => {
    // Get top 100 records for the public board
    setRecords(getLeaderboard(100));
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="text-yellow-500" size={20} />;
      case 1: return <Medal className="text-gray-400" size={20} />;
      case 2: return <Award className="text-orange-500" size={20} />;
      default: return <span className="font-bold text-gray-400 w-5 text-center">{index + 1}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full max-h-[600px]">
      <div className="bg-[#005697] p-6 text-white flex items-center gap-3">
        <Trophy size={24} className="text-yellow-300" />
        <div>
          <h2 className="text-xl font-bold">考试成绩公告栏</h2>
          <p className="text-blue-200 text-xs mt-1">实时更新全员优异成绩</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-0">
        {records.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 gap-2">
            <Clock size={32} />
            <p>暂无考试成绩，虚位以待</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">排名</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">考生姓名</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">成绩</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right hidden sm:table-cell">考试时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.map((record, index) => (
                <tr key={record.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded-full border border-gray-100">
                      {getRankIcon(index)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.name}</div>
                    <div className="text-xs text-gray-400 md:hidden">
                      {new Date(record.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-sm font-bold ${
                      record.score >= 90 ? 'bg-green-100 text-green-800' :
                      record.score >= 60 ? 'bg-blue-100 text-[#005697]' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {Math.round(record.score)}分
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 hidden sm:table-cell">
                    {new Date(record.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <div className="bg-gray-50 p-3 text-center text-xs text-gray-400 border-t border-gray-100">
        显示前100名优异成绩
      </div>
    </div>
  );
};

export default PublicScoreboard;
