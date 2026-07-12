import { AnimatePresence, domMax, LazyMotion } from 'framer-motion';

export const MotionProvider = ({ children }) => {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
};
