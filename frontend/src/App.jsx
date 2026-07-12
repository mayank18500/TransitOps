import { createBrowserRouter, RouterProvider, Navigate, Link } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';

import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import VehicleDetails from './pages/VehicleDetails';
import VehicleRegistration from './pages/VehicleRegistration';
import Maintenance from './pages/Maintenance';
import Drivers from './pages/Drivers';
import License from './pages/License';
import Trips from './pages/Trips';
import TripDetails from './pages/TripDetails';
import Expenses from './pages/Expenses';
import Fuel from './pages/Fuel';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

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
            element: <Dashboard />,
          },
          {
            path: 'vehicles',
            element: <Vehicles />,
          },
          {
            path: 'vehicles/new',
            element: <VehicleRegistration />,
          },
          {
            path: 'vehicles/:id',
            element: <VehicleDetails />,
          },
          {
            path: 'maintenance',
            element: <Maintenance />,
          },
          {
            path: 'drivers',
            element: <Drivers />,
          },
          {
            path: 'license',
            element: <License />,
          },
          {
            path: 'trips',
            element: <Trips />,
          },
          {
            path: 'trips/:id',
            element: <TripDetails />,
          },
          {
            path: 'expenses',
            element: <Expenses />,
          },
          {
            path: 'fuel',
            element: <Fuel />,
          },
          {
            path: 'analytics',
            element: <Analytics />,
          },
          {
            path: 'reports',
            element: <Reports />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
