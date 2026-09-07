import React from 'react';

interface OwlLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const OwlLogo: React.FC<OwlLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <div className="absolute inset-0 bg-cyan-500/10 rounded-lg blur-[2px]" />
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.25)]"
      >
        <path
          d="M24 4L38 12V24C38 32 32 39 24 44C16 39 10 32 10 24V12L24 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-40"
        />
        <path
          d="M13 14L21 21M35 14L27 21"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="18" cy="24" r="5" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
        <circle cx="18" cy="24" r="2" fill="currentColor" className="text-cyan-300 animate-pulse" />
        <circle cx="30" cy="24" r="5" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
        <circle cx="30" cy="24" r="2" fill="currentColor" className="text-cyan-300 animate-pulse" />
        <path
          d="M24 24L21 29H27L24 24Z"
          fill="currentColor"
          className="text-cyan-200"
        />
        <circle cx="24" cy="37" r="1.5" fill="currentColor" className="text-cyan-400" />
        <path
          d="M18 29L24 37L30 29"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="2 2"
          className="opacity-60"
        />
      </svg>
    </div>
  );
};
