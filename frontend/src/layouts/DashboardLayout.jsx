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

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, category: 'General' },
    { name: 'Vehicles', path: '/vehicles', icon: Truck, category: 'Modules' },
    { name: 'Drivers', path: '/drivers', icon: Compass, category: 'Modules' },
    { name: 'Trips', path: '/trips', icon: ShieldAlert, category: 'Modules' },
    { name: 'Expenses', path: '/expenses', icon: BadgeDollarSign, category: 'Modules' },
  ];

  return (
    <div className="flex min-h-screen modern-mesh-bg text-text-primary">
      {/* Mobile Sidebar Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-sidebar bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Floating Sidebar */}
      <aside
        className={`fixed inset-y-4 left-4 z-sidebar flex w-64 flex-col glass-panel rounded-2xl transition-transform duration-300 ease-standard lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-[120%]'
        } shadow-lg lg:my-4 lg:ml-4 overflow-hidden`}
      >
        {/* Sidebar Brand Logo */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-border/40 bg-white/40">
          <Link to="/" className="flex items-center gap-3 text-h4 font-bold tracking-tight text-text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-primary to-emerald-300 shadow-sm shadow-emerald-500/20">
              <span className="text-white font-black text-lg leading-none">T</span>
            </div>
            TransitOps
          </Link>
          <button
            className="rounded-full p-1.5 hover:bg-black/5 lg:hidden transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5 text-text-secondary" />
          </button>
        </div>

        {/* Sidebar Menu Links */}
        <nav className="mt-6 flex-1 space-y-1.5 px-4 overflow-y-auto">
          {['General', 'Modules'].map(category => (
            <div key={category} className="mb-4">
              <div className="px-3 pb-2 text-xs font-bold uppercase tracking-widest text-text-disabled">
                {category}
              </div>
              {navItems.filter(item => item.category === category).map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-brand-primary text-white shadow-md shadow-emerald-500/25' 
                        : 'text-text-secondary hover:bg-white hover:text-text-primary hover:shadow-sm'
                    }`}
                  >
                    <item.icon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-text-muted group-hover:text-brand-primary'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer Operations */}
        <div className="border-t border-border/40 p-4 bg-white/20">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="ring-2 ring-white rounded-full shadow-sm">
              <Avatar name={user?.name || 'User'} size="sm" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-text-primary truncate">{user?.name}</span>
              <span className="text-xs text-text-muted truncate">{user?.role}</span>
            </div>
          </div>
          <div className="space-y-1">
            <Link
              to="/settings"
              className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-text-secondary hover:bg-white hover:text-text-primary transition-all duration-200"
            >
              <Settings className="h-4.5 w-4.5 text-text-muted group-hover:text-text-primary" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-danger hover:bg-danger/10 transition-all duration-200"
            >
              <LogOut className="h-4.5 w-4.5 text-danger/80 group-hover:text-danger" />
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main View Port Canvas */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Floating Topbar */}
        <header className="sticky top-4 z-topbar mx-4 lg:mx-8 mb-4 flex h-16 items-center justify-between glass-panel rounded-2xl px-6">
          <div className="flex items-center gap-4">
            <button
              className="rounded-full p-2 hover:bg-black/5 lg:hidden transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5 text-text-secondary" />
            </button>
            <div className="hidden text-sm font-medium text-text-muted md:flex items-center gap-2">
              <span className="hover:text-text-primary cursor-pointer transition-colors">TransitOps</span>
              <span className="text-border-default">/</span>
              <span className="text-text-primary capitalize">{location.pathname.split('/')[1] || 'Overview'}</span>
            </div>
          </div>

          {/* Quick Actions & Profiles */}
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block mr-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-disabled" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="h-9 w-64 rounded-full border border-border-muted bg-white/50 pl-9 pr-4 text-sm outline-none transition-all focus:border-brand-primary/50 focus:bg-white focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
            <button className="relative rounded-full p-2 hover:bg-white hover:shadow-sm text-text-secondary hover:text-brand-primary transition-all duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger border border-white" />
            </button>
            <div className="h-8 w-[1px] bg-border-muted mx-1" />
            <div className="ring-2 ring-white rounded-full shadow-sm cursor-pointer ml-1">
              <Avatar name={user?.name || 'User'} size="sm" />
            </div>
          </div>
        </header>

        {/* Content Box */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-8 pb-8 scroll-smooth">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
