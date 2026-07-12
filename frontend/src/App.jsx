import { createBrowserRouter, RouterProvider, Navigate, Link } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './components/Login';
import Signup from './components/Signup';
import { ProtectedRoute } from './components/ProtectedRoute';

// Mock Placeholder views to verify router structure
const DashboardPlaceholder = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-h2 font-bold">Dashboard</h2>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-l border border-border bg-bg-surface p-6 shadow-m">
          <div className="h-4 w-24 rounded bg-bg-surface-elevated mb-4" />
          <div className="h-8 w-16 rounded bg-bg-surface-elevated" />
        </div>
      ))}
    </div>
  </div>
);

const VehiclesPlaceholder = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-h2 font-bold">Vehicles Directory</h2>
    <div className="rounded-l border border-border bg-bg-surface p-6 shadow-m">
      <div className="h-32 rounded bg-bg-surface-elevated animate-pulse" />
    </div>
  </div>
);

const DriversPlaceholder = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-h2 font-bold">Drivers Directory</h2>
    <div className="rounded-l border border-border bg-bg-surface p-6 shadow-m">
      <div className="h-32 rounded bg-bg-surface-elevated animate-pulse" />
    </div>
  </div>
);

const TripsPlaceholder = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-h2 font-bold">Trips Management</h2>
    <div className="rounded-l border border-border bg-bg-surface p-6 shadow-m">
      <div className="h-32 rounded bg-bg-surface-elevated animate-pulse" />
    </div>
  </div>
);

const ExpensesPlaceholder = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-h2 font-bold">Expense Ledger</h2>
    <div className="rounded-l border border-border bg-bg-surface p-6 shadow-m">
      <div className="h-32 rounded bg-bg-surface-elevated animate-pulse" />
    </div>
  </div>
);

const SettingsPlaceholder = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-h2 font-bold">Account Settings</h2>
    <div className="rounded-l border border-border bg-bg-surface p-6 shadow-m">
      <div className="h-32 rounded bg-bg-surface-elevated animate-pulse" />
    </div>
  </div>
);

const NotFoundPlaceholder = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-bg-base text-center px-4">
    <h1 className="text-display font-bold text-brand-primary">404</h1>
    <h2 className="text-h3 font-semibold mt-4 mb-2">Page Not Found</h2>
    <p className="text-body text-text-secondary mb-6">The requested path does not exist on TransitOps.</p>
    <Link to="/" className="h-10 px-6 rounded-m bg-brand-primary text-brand-primary-fg font-semibold flex items-center justify-center">
      Back to Safety
    </Link>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'signup',
            element: <Signup />,
          },
        ],
      },
      {
        path: '',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'dashboard',
            element: <DashboardPlaceholder />,
          },
          {
            path: 'vehicles',
            element: <VehiclesPlaceholder />,
          },
          {
            path: 'drivers',
            element: <DriversPlaceholder />,
          },
          {
            path: 'trips',
            element: <TripsPlaceholder />,
          },
          {
            path: 'expenses',
            element: <ExpensesPlaceholder />,
          },
          {
            path: 'settings',
            element: <SettingsPlaceholder />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPlaceholder />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
