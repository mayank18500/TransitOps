import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'rgb(34, 34, 42)', // bg-surface-floating (#22222a)
          color: 'rgb(243, 244, 246)', // text-primary (#f3f4f6)
          border: '1px solid rgba(255, 255, 255, 0.08)', // border-default
          borderRadius: '8px', // rounded-m
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: 'rgb(16, 185, 129)', // success green
            secondary: 'rgb(34, 34, 42)',
          },
        },
        error: {
          iconTheme: {
            primary: 'rgb(239, 68, 68)', // danger red
            secondary: 'rgb(34, 34, 42)',
          },
        },
      }}
    />
  );
};
