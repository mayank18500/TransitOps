import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg-base/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <m.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={cn(
              'card !relative !z-modal !w-full !max-w-lg before:!content-none after:!content-none !transform-none !transition-none hover:!transform-none hover:!shadow-[0.7em_0.7em_0_var(--shadow-color)] !max-h-[90vh] !overflow-y-auto !flex !flex-col',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-4 border-border pb-4 mb-4">
              <h3 className="text-h3 font-bold tracking-tight text-text-primary">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="rounded-m p-1 text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors focus:outline-none"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  position = 'right',
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') return null;

  const animateX = position === 'right' ? '100%' : '-100%';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-modal flex">
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg-base/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <m.div
            initial={{ x: animateX }}
            animate={{ x: 0 }}
            exit={{ x: animateX }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className={cn(
              'card !relative !z-modal !flex !h-full !w-full !max-w-md !flex-col before:!content-none after:!content-none !transform-none !transition-none hover:!transform-none hover:!shadow-[0.7em_0.7em_0_var(--shadow-color)] !rounded-none',
              position === 'right' ? '!border-r-0 !border-t-0 !border-b-0 ml-auto' : '!border-l-0 !border-t-0 !border-b-0 mr-auto',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-4 border-border pb-4 mb-4">
              <h3 className="text-h3 font-bold tracking-tight text-text-primary">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="rounded-m p-1 text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors focus:outline-none"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} className="max-w-sm">
      <div className="space-y-6">
        <p className="text-body text-text-secondary">{description}</p>
        <div className="flex items-center justify-end gap-3 border-t-4 border-border pt-4">
          <Button variant="outline" size="sm" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            variant={isDanger ? 'danger' : 'primary'}
            size="sm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
