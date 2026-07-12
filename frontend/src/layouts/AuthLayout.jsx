import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg-base px-4 py-12 antialiased">
      {/* Premium backdrop radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.04)_0%,transparent_60%)] pointer-events-none" />
      <div className="relative z-10 w-full max-w-[400px]">
        <Outlet />
      </div>
    </div>
  );
}
