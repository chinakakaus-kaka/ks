import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomQuestions } from '../data/questions';
import { Question } from '../types';
import { ArrowLeft, RefreshCw, BookOpen, Lightbulb, CheckCircle } from 'lucide-react';

const StudyMode: React.FC = () => {
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState<Question | null>(null);
  const [animate, setAnimate] = useState(false);

  const loadNewCard = () => {
    setAnimate(true);
    setTimeout(() => {
      const questions = getRandomQuestions(1);
      setCurrentCard(questions[0]);
      setAnimate(false);
    }, 200);
  };

  useEffect(() => {
    loadNewCard();
  }, []);

  if (!currentCard) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#005697] transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          返回首页
        </button>
        <div className="flex items-center gap-2 text-[#005697] font-bold text-lg">
          <BookOpen size={24} />
          <span>考前知识点复习</span>
        </div>
        <div className="w-20"></div> {/* Spacer for center alignment */}
      </div>

      {/* Card Container */}
      <div 
        className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 transform ${
          animate ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="bg-gradient-to-r from-blue-50 to-white p-8 border-b border-gray-100">
          <span className="inline-block px-3 py-1 bg-[#005697] text-white text-xs rounded-full font-bold mb-4 tracking-wider">
            知识点 #{currentCard.id}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
            {currentCard.question}
          </h2>
        </div>

        <div className="p-8 space-y-8">
          {/* Options with Answer Highlighted */}
          <div className="space-y-3">
            {currentCard.options.map((option, idx) => {
              const isCorrect = idx === currentCard.correctAnswer;
              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                    isCorrect 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-100 bg-white opacity-60'
                  }`}
                >
                  <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-sm border ${
                    isCorrect ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-400 border-gray-300'
                  }`}>
                    {isCorrect ? <CheckCircle size={16} /> : String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`font-medium ${isCorrect ? 'text-green-800' : 'text-gray-500'}`}>
                    {option}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Explanation / Key Takeaway */}
          <div className="bg-[#005697]/5 rounded-xl p-6 border border-[#005697]/10">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-yellow-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-[#005697] mb-2">核心考点解析</h3>
                <p className="text-gray-700 leading-relaxed">
                  {currentCard.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center py-4">
        <button
          onClick={loadNewCard}
          className="bg-[#005697] hover:bg-[#004275] text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-1 active:scale-95"
        >
          <RefreshCw size={20} />
          下一个知识点
        </button>
      </div>
      
      <p className="text-center text-gray-400 text-sm">
        点击按钮随机抽取题库知识点进行复习
      </p>
    </div>
  );
};

export default StudyMode;