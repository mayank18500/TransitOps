import { Outlet } from 'react-router-dom';
import { m } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-bg-base text-text-primary antialiased">
      {/* Left Section: Brand & Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between overflow-hidden bg-bg-surface-elevated/20 border-r border-border p-12">
        {/* Abstract Backdrop Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.06)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Top Brand Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-s bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
            <Shield className="h-4.5 w-4.5" />
          </div>
          <span className="text-body-lg font-bold tracking-tight">TransitOps</span>
        </div>

        {/* Center Illustration Sketch */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full my-8">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm"
          >
            {/* Minimalist Logistics/Fleet Wireframe Illustration */}
            <svg viewBox="0 0 400 300" className="w-full h-auto drop-shadow-xl text-border-focus" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 220 L360 220" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-border-muted" />
              <rect x="120" y="80" width="160" height="100" rx="8" stroke="currentColor" strokeWidth="3" className="text-text-secondary" />
              <rect x="280" y="120" width="60" height="60" rx="6" stroke="currentColor" strokeWidth="3" className="text-text-secondary" />
              <circle cx="160" cy="190" r="16" stroke="currentColor" strokeWidth="3" className="text-brand-primary" />
              <circle cx="240" cy="190" r="16" stroke="currentColor" strokeWidth="3" className="text-brand-primary" />
              <circle cx="310" cy="190" r="12" stroke="currentColor" strokeWidth="3" className="text-text-muted" />
              <path d="M120 120 L280 120" stroke="currentColor" strokeWidth="2" className="text-text-muted opacity-50" />
              <path d="M140 100 L260 100" stroke="currentColor" strokeWidth="2" className="text-text-muted opacity-30" />
            </svg>
          </m.div>
        </div>

        {/* Bottom Tagline */}
        <div className="relative z-10 space-y-2">
          <h1 className="text-h2 font-bold tracking-tight">
            Enterprise Fleet<br />Management Platform.
          </h1>
          <p className="text-body text-text-secondary max-w-md leading-relaxed">
            Automate logistics, ensure driver compliance, and track vehicle lifecycles from a single, unified interface.
          </p>
        </div>
      </div>

      {/* Right Section: Outlet (Form Canvas) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 lg:p-12 relative overflow-y-auto">
        {/* Subtle right-side glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_50%)] pointer-events-none lg:hidden" />
        
        <div className="w-full max-w-[420px] relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
