import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const SlideOver = ({ isOpen, onClose, title, children }: SlideOverProps) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-end overflow-hidden ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* 1. Backdrop (Fades In/Out) */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`} 
        onClick={onClose}
      />
      
      {/* 2. Panel (Slides In/Out) */}
      <div 
        className={`relative w-full max-w-md transform bg-dark-900 shadow-2xl transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) border-l border-dark-800 h-full flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dark-800 px-6 py-4">
          <h2 className="text-lg font-bold text-white font-display tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-dark-800 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
};