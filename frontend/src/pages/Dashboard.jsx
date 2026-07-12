import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { StatCard, EmptyCard } from '../components/ui/Cards';
import { VehicleCard, DriverCard, TripCard, ExpenseCard, MaintenanceCard, FuelCard } from '../components/ui/BusinessCards';
import { Grid, Section, PageHeader } from '../components/ui/LayoutUtils';
import { Truck, Users, ShieldAlert, DollarSign, Activity } from 'lucide-react';
import api from '../lib/axios';

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase() || '';

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    stats: { fleetUtilization: 0, totalOperationalCost: 0 },
    vehicles: [],
    drivers: [],
    trips: [],
    maintenance: [],
    expenses: [],
    fuel: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [
          statsRes,
          vehiclesRes,
          driversRes,
          tripsRes,
          maintenanceRes,
          expensesRes,
          fuelRes
        ] = await Promise.all([
          api.get('/api/dashboard/stats').catch(() => ({ data: { fleetUtilization: 0, totalOperationalCost: 0 } })),
          api.get('/api/vehicles').catch(() => ({ data: [] })),
          api.get('/api/drivers').catch(() => ({ data: [] })),
          api.get('/api/trips').catch(() => ({ data: [] })),
          api.get('/api/maintenance').catch(() => ({ data: [] })),
          api.get('/api/expenses').catch(() => ({ data: [] })),
          api.get('/api/fuel').catch(() => ({ data: [] }))
        ]);

        setData({
          stats: statsRes.data,
          vehicles: vehiclesRes.data,
          drivers: driversRes.data,
          trips: tripsRes.data,
          maintenance: maintenanceRes.data,
          expenses: expensesRes.data,
          fuel: fuelRes.data
        });
      } catch (error) {
        console.error('Failed to fetch real-time dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center animate-fade-in">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand-primary" />
          <p className="text-text-muted font-medium">Loading real-time data...</p>
        </div>
      </div>
    );
  }

  const { vehicles, drivers, trips, maintenance, expenses, fuel, stats } = data;

  const renderFleetManagerDashboard = () => {
    const availableVehicles = vehicles.filter(v => v.status === 'Available').length;
    const onTripVehicles = vehicles.filter(v => v.status === 'On Trip').length;
    const inShopVehicles = vehicles.filter(v => v.status === 'In Shop').length;

    return (
      <Section>
        <Grid cols={4} gap={6}>
          <StatCard title="Total Vehicles" value={vehicles.length} icon={<Truck />} />
          <StatCard title="On Trip" value={onTripVehicles} icon={<Truck />} />
          <StatCard title="In Shop" value={inShopVehicles} icon={<Truck />} />
          <StatCard title="Available" value={availableVehicles} icon={<Truck />} />
        </Grid>
        <Grid cols={2} gap={6}>
          <div>
            <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Recent Vehicles</h3>
            <div className="space-y-4">
              {vehicles.length === 0 ? (
                <EmptyCard>No vehicles registered yet.</EmptyCard>
              ) : (
                vehicles.slice(0, 3).map(v => (
                  <VehicleCard 
                    key={v.id} 
                    plateNumber={v.registrationNumber} 
                    model={v.model} 
                    status={v.status} 
                    payloadCapacity={v.maxLoadCapacity} 
                    odometer={v.odometer} 
                  />
                ))
              )}
            </div>
          </div>
          <div>
            <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Maintenance Alerts</h3>
            <div className="space-y-4">
              {maintenance.length === 0 ? (
                <EmptyCard>No maintenance alerts found.</EmptyCard>
              ) : (
                maintenance.slice(0, 3).map(m => (
                  <MaintenanceCard 
                    key={m.id} 
                    vehicle={m.vehicle?.registrationNumber || 'Unknown'} 
                    type={m.description} 
                    status={m.status} 
                    cost={m.cost} 
                    startDate={new Date(m.date).toLocaleDateString()} 
                  />
                ))
              )}
            </div>
          </div>
        </Grid>
      </Section>
    );
  };

  const renderDispatcherDashboard = () => {
    const activeTrips = trips.filter(t => t.status === 'Dispatched').length;
    const draftTrips = trips.filter(t => t.status === 'Draft').length;
    const availableDrivers = drivers.filter(d => d.status === 'Available').length;
    const availableVehicles = vehicles.filter(v => v.status === 'Available').length;

    return (
      <Section>
        <Grid cols={4} gap={6}>
          <StatCard title="Active Trips" value={activeTrips} icon={<ShieldAlert />} />
          <StatCard title="Pending Dispatch" value={draftTrips} icon={<ShieldAlert />} />
          <StatCard title="Available Drivers" value={availableDrivers} icon={<Users />} />
          <StatCard title="Available Vehicles" value={availableVehicles} icon={<Truck />} />
        </Grid>
        <Grid cols={2} gap={6}>
          <div>
            <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Active Trips</h3>
            <div className="space-y-4">
              {trips.length === 0 ? (
                <EmptyCard>No active trips.</EmptyCard>
              ) : (
                trips.slice(0, 3).map(t => (
                  <TripCard 
                    key={t.id} 
                    tripId={t.id.slice(0, 8)} 
                    vehicle={t.vehicle?.registrationNumber || 'N/A'} 
                    driver={t.driver?.name || 'N/A'} 
                    cargoWeight={t.cargoWeight} 
                    destination={t.destination} 
                    status={t.status} 
                  />
                ))
              )}
            </div>
          </div>
          <div>
            <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Available Drivers</h3>
            <div className="space-y-4">
              {drivers.length === 0 ? (
                <EmptyCard>No drivers found.</EmptyCard>
              ) : (
                drivers.filter(d => d.status === 'Available').slice(0, 3).map(d => (
                  <DriverCard 
                    key={d.id} 
                    name={d.name} 
                    licenseNumber={d.licenseNumber} 
                    licenseExpiry={new Date(d.licenseExpiry).toLocaleDateString()} 
                    safetyScore={d.safetyScore} 
                    status={d.status} 
                  />
                ))
              )}
            </div>
          </div>
        </Grid>
      </Section>
    );
  };

  const renderSafetyDashboard = () => {
    const onDutyDrivers = drivers.filter(d => d.status === 'On Trip').length;
    const suspendedDrivers = drivers.filter(d => d.status === 'Suspended').length;
    const avgSafetyScore = drivers.length > 0 
      ? Math.round(drivers.reduce((acc, d) => acc + d.safetyScore, 0) / drivers.length)
      : 0;

    return (
      <Section>
        <Grid cols={4} gap={6}>
          <StatCard title="Total Drivers" value={drivers.length} icon={<Users />} />
          <StatCard title="On Duty" value={onDutyDrivers} icon={<Users />} />
          <StatCard title="Avg Safety Score" value={avgSafetyScore} icon={<ShieldAlert />} />
          <StatCard title="Suspended" value={suspendedDrivers} icon={<ShieldAlert />} />
        </Grid>
        <Grid cols={2} gap={6}>
          <div>
            <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Recent Drivers</h3>
            <div className="space-y-4">
              {drivers.length === 0 ? (
                <EmptyCard>No drivers registered.</EmptyCard>
              ) : (
                drivers.slice(0, 3).map(d => (
                  <DriverCard 
                    key={d.id} 
                    name={d.name} 
                    licenseNumber={d.licenseNumber} 
                    licenseExpiry={new Date(d.licenseExpiry).toLocaleDateString()} 
                    safetyScore={d.safetyScore} 
                    status={d.status} 
                  />
                ))
              )}
            </div>
          </div>
          <div>
            <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Fleet Utilization</h3>
            <div className="space-y-4">
              <StatCard 
                title="Current Utilization Rate" 
                value={`${stats.fleetUtilization}%`} 
                icon={<Activity />} 
                description="Percentage of vehicles currently on active trips vs total available."
              />
            </div>
          </div>
        </Grid>
      </Section>
    );
  };

  const renderFinancialDashboard = () => {
    // Basic revenue calc (mocked as double operational cost for display since we don't have revenue model)
    const totalRev = stats.totalOperationalCost * 2 || 0; 
    const totalFuelCost = fuel.reduce((acc, f) => acc + f.cost, 0);

    return (
      <Section>
        <Grid cols={4} gap={6}>
          <StatCard title="Total Revenue" value={`$${totalRev.toLocaleString()}`} icon={<DollarSign />} />
          <StatCard title="Total Expenses" value={`$${stats.totalOperationalCost.toLocaleString()}`} icon={<DollarSign />} />
          <StatCard title="Fuel Cost" value={`$${totalFuelCost.toLocaleString()}`} icon={<DollarSign />} />
          <StatCard title="Net Profit" value={`$${(totalRev - stats.totalOperationalCost).toLocaleString()}`} icon={<DollarSign />} />
        </Grid>
        <Grid cols={2} gap={6}>
          <div>
            <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Recent Expenses</h3>
            <div className="space-y-4">
              {expenses.length === 0 ? (
                <EmptyCard>No expenses recorded.</EmptyCard>
              ) : (
                expenses.slice(0, 3).map(e => (
                  <ExpenseCard 
                    key={e.id} 
                    vehicle={e.vehicle?.registrationNumber || 'Fleet'} 
                    category="Expense" 
                    cost={e.amount} 
                    date={new Date(e.date).toLocaleDateString()} 
                    description={e.description} 
                  />
                ))
              )}
            </div>
          </div>
          <div>
            <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Fuel Logs</h3>
            <div className="space-y-4">
              {fuel.length === 0 ? (
                <EmptyCard>No fuel logs recorded.</EmptyCard>
              ) : (
                fuel.slice(0, 3).map(f => (
                  <FuelCard 
                    key={f.id} 
                    vehicle={f.vehicle?.registrationNumber || 'N/A'} 
                    liters={f.liters} 
                    cost={f.cost} 
                    date={new Date(f.date).toLocaleDateString()} 
                    odometer={f.vehicle?.odometer || 0} 
                  />
                ))
              )}
            </div>
          </div>
        </Grid>
      </Section>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title={`${user?.role || 'User'} Dashboard`} subtitle="Real-time overview of your operations and critical metrics." />
      {role.includes('manager') && renderFleetManagerDashboard()}
      {role.includes('dispatcher') && renderDispatcherDashboard()}
      {role.includes('safety') && renderSafetyDashboard()}
      {role.includes('financial') && renderFinancialDashboard()}
      {!['manager', 'dispatcher', 'safety', 'financial'].some(r => role.includes(r)) && renderFleetManagerDashboard()}
    </div>
  );
}
