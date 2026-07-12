import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Bell, Search, LogOut, Settings, LayoutDashboard, Truck, Compass, ShieldAlert, BadgeDollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/ui/Feedback';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="dashboard-theme flex min-h-screen bg-bg-surface text-text-primary">
      {/* Mobile Sidebar Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-sidebar bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-sidebar flex w-64 flex-col border-r border-border bg-bg-surface-elevated transition-transform duration-normal ease-standard lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Brand Logo */}
        <div className="flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 text-h3 font-bold tracking-tight text-text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary text-white">
              <span className="font-extrabold">T</span>
            </div>
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
        <nav className="mt-6 flex-1 space-y-1 px-4">
          <div className="text-tiny uppercase tracking-wider text-text-muted px-2 pb-2 mt-4 font-semibold">General</div>
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-body transition-all duration-fast ease-micro ${
              isActive('dashboard') || location.pathname === '/' ? 'bg-white shadow-s text-brand-primary font-medium' : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
            }`}
          >
            <LayoutDashboard className="h-4.5 w-4.5" />
            Overview
          </Link>
          
          <div className="text-tiny uppercase tracking-wider text-text-muted px-2 pt-6 pb-2 font-semibold">Modules</div>
          
          {['manager', 'dispatcher'].some(r => user?.role?.toLowerCase().includes(r)) && (
            <Link
              to="/vehicles"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-body transition-all duration-fast ease-micro ${
                isActive('vehicles') ? 'bg-white shadow-s text-brand-primary font-medium' : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
              }`}
            >
              <Truck className="h-4.5 w-4.5" />
              Vehicles
            </Link>
          )}
          {['manager', 'dispatcher', 'safety'].some(r => user?.role?.toLowerCase().includes(r)) && (
            <Link
              to="/drivers"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-body transition-all duration-fast ease-micro ${
                isActive('drivers') ? 'bg-white shadow-s text-brand-primary font-medium' : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
              }`}
            >
              <Compass className="h-4.5 w-4.5" />
              Drivers
            </Link>
          )}
          {['manager', 'dispatcher', 'financial'].some(r => user?.role?.toLowerCase().includes(r)) && (
            <Link
              to="/trips"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-body transition-all duration-fast ease-micro ${
                isActive('trips') ? 'bg-white shadow-s text-brand-primary font-medium' : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
              }`}
            >
              <ShieldAlert className="h-4.5 w-4.5" />
              Trips
            </Link>
          )}
          {['manager', 'financial'].some(r => user?.role?.toLowerCase().includes(r)) && (
            <Link
              to="/expenses"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-body transition-all duration-fast ease-micro ${
                isActive('expenses') ? 'bg-white shadow-s text-brand-primary font-medium' : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
              }`}
            >
              <BadgeDollarSign className="h-4.5 w-4.5" />
              Expenses
            </Link>
          )}
        </nav>

        {/* Sidebar Footer Operations */}
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <Link
              to="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-body text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors duration-fast ease-micro"
            >
              <Settings className="h-4.5 w-4.5" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-body text-text-secondary hover:bg-danger/10 hover:text-danger transition-colors duration-fast ease-micro"
            >
              <LogOut className="h-4.5 w-4.5" />
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main View Port Canvas */}
      <div className="flex flex-1 flex-col bg-bg-surface min-w-0">
        {/* Contextual Topbar header */}
        <header className="sticky top-0 z-topbar flex h-16 items-center justify-between border-b border-border bg-bg-surface px-6 lg:px-8">
          <div className="flex items-center gap-4 flex-1">
            <button
              className="rounded-m p-1.5 hover:bg-bg-hover lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden max-w-md w-full lg:flex items-center gap-2 px-3 py-1.5 bg-bg-surface-elevated border border-border rounded-lg text-text-secondary">
              <Search className="h-4.5 w-4.5 text-text-muted" />
              <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-body w-full" />
              <span className="text-tiny border border-border rounded px-1.5 text-text-muted">⌘K</span>
            </div>
          </div>

          {/* Quick Actions & Profiles */}
          <div className="flex items-center gap-4">
            <button className="relative rounded-lg p-2 hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
            </button>
            <div className="h-6 w-[1px] bg-border mx-2 hidden sm:block"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-bg-hover p-1.5 rounded-lg transition-colors">
              <Avatar name={user?.name || 'User'} size="sm" />
              <div className="hidden md:flex flex-col min-w-0">
                <span className="text-caption font-semibold text-text-primary truncate leading-tight">{user?.name}</span>
                <span className="text-tiny text-text-muted truncate leading-tight">{user?.role}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Box */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
