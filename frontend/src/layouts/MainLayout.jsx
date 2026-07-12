import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="brutalist-wrapper !block !p-0 !bg-none min-h-screen bg-bg-base text-text-primary antialiased">
      <Outlet />
    </div>
  );
}
