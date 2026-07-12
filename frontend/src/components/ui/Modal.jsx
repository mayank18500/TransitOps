import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Modal({ isOpen, onClose, title, children, className }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={cn("relative w-full max-w-2xl bg-bg-surface rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]", className)}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-default bg-bg-surface">
          <h3 className="text-h3 font-bold text-text-primary">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-hover rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
