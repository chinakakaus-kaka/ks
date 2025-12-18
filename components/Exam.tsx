import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Question, ExamRecord } from '../types';
import { getRandomQuestions } from '../data/questions';
import { saveExamResult } from '../services/storage';
import { ChevronRight, CheckCircle, AlertCircle, Save, AlertTriangle } from 'lucide-react';

interface ExamProps {
  user: User;
}

const Exam: React.FC<ExamProps> = ({ user }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // qID -> answerIdx
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    // Initialize exam with 20 random questions
    setQuestions(getRandomQuestions(20));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      processSubmission();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (optionIdx: number) => {
    setAnswers({
      ...answers,
      [questions[currentIdx].id]: optionIdx
    });
  };

  const handleClickSubmit = () => {
    setShowSubmitModal(true);
  };

  const confirmSubmit = () => {
    setShowSubmitModal(false);
    processSubmission();
  };

  const processSubmission = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = (correctCount / questions.length) * 100;
    
    const record: ExamRecord = {
      id: Date.now().toString(),
      username: user.username,
      name: user.name,
      score,
      date: new Date().toISOString(),
      answers,
      questionIds: questions.map(q => q.id)
    };

    // Attempt to save, even if it fails we proceed to result page
    saveExamResult(record);
    navigate('/result', { state: { result: record, isReview: false } });
  };

  if (questions.length === 0) return <div className="p-10 text-center">正在生成试卷...</div>;

  const currentQuestion = questions[currentIdx];
  const progress = ((Object.keys(answers).length) / questions.length) * 100;
  const unansweredCount = questions.length - Object.keys(answers).length;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex justify-between items-center sticky top-4 z-10">
        <div className="flex items-center gap-4">
          <span className="font-bold text-gray-700">题目 {currentIdx + 1} / {questions.length}</span>
          <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleClickSubmit}
            className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-[#005697] font-medium text-sm transition-colors"
          >
            <Save size={18} />
            提前交卷
          </button>
          <div className={`font-mono text-xl font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-[#005697]'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden min-h-[400px] flex flex-col">
        <div className="p-8 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-medium text-gray-800 leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>
        
        <div className="p-8 flex-1">
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                  ${answers[currentQuestion.id] === idx 
                    ? 'border-[#005697] bg-blue-50 text-[#005697]' 
                    : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50 text-gray-600'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border
                    ${answers[currentQuestion.id] === idx 
                      ? 'bg-[#005697] text-white border-[#005697]' 
                      : 'bg-white text-gray-400 border-gray-300 group-hover:border-blue-300'
                    }
                  `}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>
                {answers[currentQuestion.id] === idx && <CheckCircle size={20} className="text-[#005697]" />}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-between bg-white">
          <button
            onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
            disabled={currentIdx === 0}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentIdx === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            上一题
          </button>

          {currentIdx === questions.length - 1 ? (
            <button
              onClick={handleClickSubmit}
              className="bg-[#005697] hover:bg-[#004275] text-white px-8 py-2 rounded-lg font-bold shadow-md transition-all flex items-center gap-2"
            >
              提交试卷
            </button>
          ) : (
            <button
              onClick={() => setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1))}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              下一题 <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">答题卡</h3>
          {/* Mobile only submit button */}
          <button 
            onClick={handleClickSubmit}
            className="sm:hidden text-xs text-[#005697] border border-[#005697] px-2 py-1 rounded"
          >
            提前交卷
          </button>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setCurrentIdx(idx)}
              className={`
                h-10 rounded-lg font-medium text-sm transition-all
                ${idx === currentIdx ? 'ring-2 ring-offset-2 ring-[#005697]' : ''}
                ${answers[q.id] !== undefined 
                  ? 'bg-[#005697] text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }
              `}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        
        <div className="mt-6 flex items-center gap-4 text-xs text-gray-500 justify-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-100 rounded"></div> 未答
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#005697] rounded"></div> 已答
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-[#005697] rounded"></div> 当前
          </div>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all scale-100">
            <div className="flex flex-col items-center text-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${unansweredCount > 0 ? 'bg-orange-100 text-orange-500' : 'bg-blue-100 text-blue-500'}`}>
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">确认提交试卷?</h3>
              <p className="text-gray-500 mt-2">
                {unansweredCount > 0 
                  ? <>您还有 <span className="text-orange-600 font-bold text-lg">{unansweredCount}</span> 道题未作答。<br/>提交后将无法修改答案。</>
                  : '您已完成所有题目，是否现在提交？'}
              </p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
              >
                继续答题
              </button>
              <button 
                onClick={confirmSubmit}
                className="flex-1 py-3 px-4 bg-[#005697] text-white rounded-xl hover:bg-[#004275] font-bold shadow-lg transition-transform active:scale-95"
              >
                确认交卷
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;