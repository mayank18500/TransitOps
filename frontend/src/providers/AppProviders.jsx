import { ThemeProvider } from './ThemeProvider';
import { ScrollProvider } from './ScrollProvider';
import { MotionProvider } from './MotionProvider';
import { ToastProvider } from './ToastProvider';
import { AuthProvider } from '../context/AuthContext';

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ScrollProvider>
          <MotionProvider>
            {children}
            <ToastProvider />
          </MotionProvider>
        </ScrollProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
