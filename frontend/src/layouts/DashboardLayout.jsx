import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, Search, LogOut, Settings, LayoutDashboard, Truck, Compass, ShieldAlert, BadgeDollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/ui/Feedback';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-bg-base text-text-primary">
      {/* Mobile Sidebar Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-sidebar bg-bg-base/60 backdrop-blur-md lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-sidebar flex w-64 flex-col border-r border-border bg-bg-surface p-6 transition-transform duration-normal ease-standard lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Brand Logo */}
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-h3 font-bold tracking-tight text-text-primary">
            <span className="h-5 w-5 rounded-s bg-brand-primary" />
            TransitOps
          </Link>
          <button
            className="rounded-m p-1 hover:bg-bg-hover lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Menu Links */}
        <nav className="mt-8 flex-1 space-y-2">
          <div className="text-tiny uppercase tracking-wider text-text-muted px-3">General</div>
          <Link
            to="/dashboard"
            className="flex items-center gap-3 rounded-m px-3 py-2 text-body text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors duration-fast ease-micro"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="text-tiny uppercase tracking-wider text-text-muted px-3 pt-4">Modules</div>
          <Link
            to="/vehicles"
            className="flex items-center gap-3 rounded-m px-3 py-2 text-body text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors duration-fast ease-micro"
          >
            <Truck className="h-4 w-4" />
            Vehicles
          </Link>
          <Link
            to="/drivers"
            className="flex items-center gap-3 rounded-m px-3 py-2 text-body text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors duration-fast ease-micro"
          >
            <Compass className="h-4 w-4" />
            Drivers
          </Link>
          <Link
            to="/trips"
            className="flex items-center gap-3 rounded-m px-3 py-2 text-body text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors duration-fast ease-micro"
          >
            <ShieldAlert className="h-4 w-4" />
            Trips
          </Link>
          <Link
            to="/expenses"
            className="flex items-center gap-3 rounded-m px-3 py-2 text-body text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors duration-fast ease-micro"
          >
            <BadgeDollarSign className="h-4 w-4" />
            Expenses
          </Link>
        </nav>

        {/* Sidebar Footer Operations */}
        <div className="border-t border-border pt-4 space-y-4">
          <div className="flex items-center gap-3 px-3">
            <Avatar name={user?.name || 'User'} size="sm" />
            <div className="flex flex-col min-w-0">
              <span className="text-caption font-bold text-text-primary truncate">{user?.name}</span>
              <span className="text-tiny text-text-muted truncate">{user?.role}</span>
            </div>
          </div>
          <div className="space-y-1">
            <Link
              to="/settings"
              className="flex items-center gap-3 rounded-m px-3 py-2 text-body text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors duration-fast ease-micro"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-m px-3 py-2 text-left text-body text-danger hover:bg-danger/10 transition-colors duration-fast ease-micro"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main View Port Canvas */}
      <div className="flex flex-1 flex-col">
        {/* Contextual Topbar header */}
        <header className="sticky top-0 z-topbar flex h-16 items-center justify-between border-b border-border bg-glass-bg px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              className="rounded-m p-1.5 hover:bg-bg-hover lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden text-body text-text-secondary md:block">
              TransitOps / Overview
            </div>
          </div>

          {/* Quick Actions & Profiles */}
          <div className="flex items-center gap-4">
            <button className="rounded-m p-1.5 hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="relative rounded-m p-1.5 hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand-primary" />
            </button>
            <div className="flex items-center gap-2.5">
              <span className="hidden text-caption font-semibold text-text-secondary md:inline">
                {user?.name}
              </span>
              <Avatar name={user?.name || 'User'} size="sm" />
            </div>
          </div>
        </header>

        {/* Content Box */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
