import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-10" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Abstract representation of the China Telecom logo style (C shape) */}
      <svg viewBox="0 0 100 100" className="h-full w-auto text-[#005697]" fill="currentColor">
        <path d="M50 10 C28 10 10 28 10 50 C10 72 28 90 50 90 C72 90 90 72 90 50 L80 50 C80 66 66 80 50 80 C34 80 20 66 20 50 C20 34 34 20 50 20 L50 10 Z" />
        <path d="M60 30 L60 40 C66 40 70 44 70 50 C70 56 66 60 60 60 L60 70 C72 70 80 60 80 50 C80 40 72 30 60 30 Z" />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-[#005697] text-lg tracking-wide">中国电信</span>
        <span className="text-[#005697] text-xs tracking-wider">CHINA TELECOM</span>
        <span className="text-gray-500 text-[0.6rem] font-medium">业管中心</span>
      </div>
    </div>
  );
};

export default Logo;
