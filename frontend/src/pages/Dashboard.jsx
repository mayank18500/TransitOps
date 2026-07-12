import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardService } from '../services/dashboard.service';
import { StatCard } from '../components/ui/Cards';
import { VehicleCard, DriverCard, TripCard, ExpenseCard, MaintenanceCard } from '../components/ui/BusinessCards';
import { Grid, Section, PageHeader } from '../components/ui/LayoutUtils';
import { Truck, Users, ShieldAlert, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase() || '';
  
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center animate-pulse">Loading Live Dashboard Analytics...</div>;
  }

  if (!stats) {
    return <div className="p-8 text-center text-status-error">Failed to load analytics. Please try again.</div>;
  }

  const renderFleetManagerDashboard = () => (
    <Section>
      <Grid cols={4} gap={6}>
        <StatCard title="Total Vehicles" value={stats.manager.totalVehicles} icon={<Truck />} />
        <StatCard title="On Trip" value={stats.manager.onTripVehicles} icon={<Truck />} />
        <StatCard title="In Shop" value={stats.manager.inShopVehicles} icon={<Truck />} />
        <StatCard title="Available" value={stats.manager.availableVehicles} icon={<Truck />} />
      </Grid>
      <Grid cols={2} gap={6}>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Recent Vehicles</h3>
          <div className="space-y-4">
            {stats.manager.recentVehicles.map(v => (
              <VehicleCard key={v.id} plateNumber={v.registrationNumber} model={v.model} status={v.status} payloadCapacity={v.maxLoadCapacity} odometer={v.odometer} />
            ))}
            {stats.manager.recentVehicles.length === 0 && <p className="text-text-secondary">No vehicles found.</p>}
          </div>
        </div>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Maintenance Alerts</h3>
          <div className="space-y-4">
            {stats.manager.maintenanceAlerts.map(m => (
              <MaintenanceCard key={m.id} vehicle={m.vehicle?.registrationNumber || 'Unknown'} type={m.description} status={m.status} cost={m.cost} startDate={new Date(m.date).toLocaleDateString()} />
            ))}
            {stats.manager.maintenanceAlerts.length === 0 && <p className="text-text-secondary">No pending maintenance.</p>}
          </div>
        </div>
      </Grid>
    </Section>
  );

  const renderDispatcherDashboard = () => (
    <Section>
      <Grid cols={4} gap={6}>
        <StatCard title="Active Trips" value={stats.dispatcher.activeTrips} icon={<ShieldAlert />} />
        <StatCard title="Pending Dispatch" value={stats.dispatcher.pendingTrips} icon={<ShieldAlert />} />
        <StatCard title="Available Drivers" value={stats.dispatcher.availableDrivers} icon={<Users />} />
        <StatCard title="Available Vehicles" value={stats.dispatcher.availableVehicles} icon={<Truck />} />
      </Grid>
      <Grid cols={2} gap={6}>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Active Trips</h3>
          <div className="space-y-4">
            {stats.dispatcher.recentTrips.map(t => (
              <TripCard key={t.id} tripId={t.id.substring(0,8).toUpperCase()} vehicle={t.vehicle?.registrationNumber} driver={t.driver?.name} cargoWeight={t.cargoWeight} destination={t.destination} status={t.status} />
            ))}
            {stats.dispatcher.recentTrips.length === 0 && <p className="text-text-secondary">No active trips.</p>}
          </div>
        </div>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Available Drivers</h3>
          <div className="space-y-4">
            {stats.dispatcher.recentDrivers.map(d => (
              <DriverCard key={d.id} name={d.name} licenseNumber={d.licenseNumber} licenseExpiry={new Date(d.licenseExpiry).toLocaleDateString()} safetyScore={d.safetyScore} status={d.status} />
            ))}
            {stats.dispatcher.recentDrivers.length === 0 && <p className="text-text-secondary">No drivers available.</p>}
          </div>
        </div>
      </Grid>
    </Section>
  );

  const renderSafetyDashboard = () => (
    <Section>
      <Grid cols={4} gap={6}>
        <StatCard title="Total Drivers" value={stats.safety.totalDrivers} icon={<Users />} />
        <StatCard title="On Duty" value={stats.safety.onDutyDrivers} icon={<Users />} />
        <StatCard title="Avg Safety Score" value={stats.safety.avgSafetyScore} icon={<ShieldAlert />} />
        <StatCard title="Suspended" value={stats.safety.suspendedDrivers} icon={<ShieldAlert />} />
      </Grid>
      <Grid cols={2} gap={6}>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Recent Drivers</h3>
          <div className="space-y-4">
            {stats.safety.recentDrivers.map(d => (
              <DriverCard key={d.id} name={d.name} licenseNumber={d.licenseNumber} licenseExpiry={new Date(d.licenseExpiry).toLocaleDateString()} safetyScore={d.safetyScore} status={d.status} />
            ))}
            {stats.safety.recentDrivers.length === 0 && <p className="text-text-secondary">No drivers found.</p>}
          </div>
        </div>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">License Alerts</h3>
          <div className="space-y-4">
            {stats.safety.licenseAlerts.map(d => (
              <DriverCard key={d.id} name={d.name} licenseNumber={d.licenseNumber} licenseExpiry={new Date(d.licenseExpiry).toLocaleDateString()} safetyScore={d.safetyScore} status={d.status} />
            ))}
            {stats.safety.licenseAlerts.length === 0 && <p className="text-text-secondary">No license alerts.</p>}
          </div>
        </div>
      </Grid>
    </Section>
  );

  const renderFinancialDashboard = () => (
    <Section>
      <Grid cols={4} gap={6}>
        <StatCard title="Total Revenue" value={`$${stats.financial.totalRevenue.toLocaleString()}`} icon={<DollarSign />} />
        <StatCard title="Total Expenses" value={`$${stats.financial.totalExpenses.toLocaleString()}`} icon={<DollarSign />} />
        <StatCard title="Fuel Cost" value={`$${stats.financial.fuelCost.toLocaleString()}`} icon={<DollarSign />} />
        <StatCard title="Net Profit" value={`$${stats.financial.netProfit.toLocaleString()}`} icon={<DollarSign />} />
      </Grid>
      <Grid cols={2} gap={6}>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Recent Expenses</h3>
          <div className="space-y-4">
            {stats.financial.recentExpenses.map(e => (
              <ExpenseCard key={e.id} vehicle={e.vehicle?.registrationNumber || 'Fleet'} category="General" cost={e.amount} date={new Date(e.date).toLocaleDateString()} description={e.description} />
            ))}
            {stats.financial.recentExpenses.length === 0 && <p className="text-text-secondary">No recent expenses.</p>}
          </div>
        </div>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Fuel Logs</h3>
          <div className="space-y-4">
            {stats.financial.recentFuelLogs.map(f => (
              <ExpenseCard key={f.id} vehicle={f.vehicle?.registrationNumber || 'Unknown'} category="Fuel" cost={f.cost} date={new Date(f.date).toLocaleDateString()} description={`Refill - ${f.liters}L`} />
            ))}
            {stats.financial.recentFuelLogs.length === 0 && <p className="text-text-secondary">No recent fuel logs.</p>}
          </div>
        </div>
      </Grid>
    </Section>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title={`${user?.role || 'User'} Dashboard`} subtitle="Live operational analytics pulled from database." />
      {role.includes('manager') && renderFleetManagerDashboard()}
      {role.includes('dispatcher') && renderDispatcherDashboard()}
      {role.includes('safety') && renderSafetyDashboard()}
      {role.includes('financial') && renderFinancialDashboard()}
      {!['manager', 'dispatcher', 'safety', 'financial'].some(r => role.includes(r)) && renderFleetManagerDashboard()}
    </div>
  );
}
