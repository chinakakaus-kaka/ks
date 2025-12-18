import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ExamRecord } from '../types';
import { questionBank } from '../data/questions';
import { CheckCircle, XCircle, ArrowLeft, RefreshCw, BarChart, Filter, HelpCircle } from 'lucide-react';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { result: ExamRecord; isReview: boolean };
  const [showWrongOnly, setShowWrongOnly] = useState(false);

  if (!state?.result) {
    return <Navigate to="/" />;
  }

  const { result } = state;
  const allQuestions = result.questionIds.map(id => questionBank.find(q => q.id === id)!);
  
  // Calculate specific accuracy
  const correctCount = Object.keys(result.answers).filter(qId => {
    const question = questionBank.find(q => q.id === Number(qId));
    return question && result.answers[Number(qId)] === question.correctAnswer;
  }).length;
  const totalQuestions = allQuestions.length;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  // Filter questions for display
  const displayedQuestions = showWrongOnly
    ? allQuestions.filter(q => result.answers[q.id] !== q.correctAnswer)
    : allQuestions;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      {/* Score Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden text-center relative">
        <div className={`h-3 ${result.score >= 60 ? 'bg-[#005697]' : 'bg-red-500'}`}></div>
        <div className="p-10">
          <p className="text-gray-500 mb-2 uppercase tracking-wide text-sm font-bold">最终得分</p>
          <div className={`text-6xl font-black mb-2 ${result.score >= 60 ? 'text-[#005697]' : 'text-red-500'}`}>
            {Math.round(result.score)}
            <span className="text-2xl text-gray-400 ml-1">分</span>
          </div>
          
          {/* Specific Stats Display */}
          <div className="flex justify-center gap-4 mb-6 text-sm">
            <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 flex items-center gap-2">
               <BarChart size={16} className="text-blue-500" />
               <span className="text-gray-500">正确率:</span>
               <span className="font-bold text-gray-800">{accuracy}%</span>
            </div>
            <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 flex items-center gap-2">
               <CheckCircle size={16} className="text-green-500" />
               <span className="text-gray-500">答对:</span>
               <span className="font-bold text-green-600">{correctCount}</span>
               <span className="text-gray-400">/ {totalQuestions}题</span>
            </div>
          </div>

          <p className="text-gray-600">
            {result.score >= 90 ? '太棒了！你对业管知识掌握非常扎实。' : 
             result.score >= 60 ? '恭喜及格，继续加油巩固知识点。' : 
             '未及格，请仔细复习错题解析后再次尝试。'}
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2"
            >
              <ArrowLeft size={18} /> 返回首页
            </button>
            <button
              onClick={() => navigate('/exam')}
              className="px-6 py-2 bg-[#005697] text-white rounded-lg hover:bg-[#004275] font-medium flex items-center gap-2 shadow-md"
            >
              <RefreshCw size={18} /> 再考一次
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Control Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-4">
        <h3 className="text-xl font-bold text-gray-800 border-l-4 border-[#005697] pl-3 flex items-center gap-2">
          试题解析与复习
        </h3>
        <button
          onClick={() => setShowWrongOnly(!showWrongOnly)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2
            ${showWrongOnly 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
          `}
        >
          <Filter size={16} />
          {showWrongOnly ? '显示全部试题' : '只看错题'}
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {displayedQuestions.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl text-gray-400">
            {showWrongOnly ? '恭喜！没有错题。' : '暂无题目'}
          </div>
        ) : displayedQuestions.map((q, idx) => {
          const userAnsIdx = result.answers[q.id];
          const hasAnswered = userAnsIdx !== undefined;
          const isCorrect = hasAnswered && userAnsIdx === q.correctAnswer;
          
          // Determine the question number in the original sequence
          const originalIndex = allQuestions.findIndex(orig => orig.id === q.id) + 1;

          return (
            <div key={q.id} className={`bg-white rounded-xl shadow-sm border p-6 ${isCorrect ? 'border-gray-100' : 'border-red-100 bg-red-50/10'}`}>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  {!hasAnswered ? (
                    <HelpCircle className="text-gray-400" size={24} />
                  ) : isCorrect ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <XCircle className="text-red-500" size={24} />
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                     <h4 className="font-medium text-lg text-gray-800">
                      <span className="text-gray-400 mr-2">#{originalIndex}.</span>
                      {q.question}
                    </h4>
                    {!hasAnswered && (
                      <span className="shrink-0 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded font-medium">
                        未作答
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      let itemClass = "p-3 rounded-lg border text-sm flex justify-between items-center ";
                      
                      if (optIdx === q.correctAnswer) {
                        itemClass += "bg-green-50 border-green-200 text-green-800 font-medium";
                      } else if (hasAnswered && optIdx === userAnsIdx && !isCorrect) {
                        itemClass += "bg-red-50 border-red-200 text-red-800";
                      } else {
                        itemClass += "bg-white border-gray-100 text-gray-500";
                      }

                      return (
                        <div key={optIdx} className={itemClass}>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono border rounded w-5 h-5 flex items-center justify-center opacity-50">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            {opt}
                          </div>
                          {optIdx === q.correctAnswer && <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded">正确答案</span>}
                          {hasAnswered && optIdx === userAnsIdx && !isCorrect && <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded">你的选择</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-900 mt-4 border border-blue-100">
                    <span className="font-bold flex items-center gap-2 mb-1">
                      💡 知识点解析：
                    </span>
                    <p className="leading-relaxed text-blue-800 opacity-90">{q.explanation}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Result;