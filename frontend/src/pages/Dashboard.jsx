import React from 'react';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/ui/Cards';
import { VehicleCard, DriverCard, TripCard, ExpenseCard, MaintenanceCard } from '../components/ui/BusinessCards';
import { Grid, Section, PageHeader } from '../components/ui/LayoutUtils';
import { Truck, Users, ShieldAlert, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase() || '';

  const renderFleetManagerDashboard = () => (
    <Section>
      <Grid cols={4} gap={6}>
        <StatCard title="Total Vehicles" value="42" icon={<Truck />} trend="2 new" trendDirection="up" />
        <StatCard title="On Trip" value="18" icon={<Truck />} />
        <StatCard title="In Shop" value="5" icon={<Truck />} trend="1 resolved" trendDirection="down" />
        <StatCard title="Available" value="19" icon={<Truck />} />
      </Grid>
      <Grid cols={2} gap={6}>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Recent Vehicles</h3>
          <div className="space-y-4">
            <VehicleCard plateNumber="TRK-9821" model="Volvo FH16" status="Available" payloadCapacity={20000} odometer={145000} />
            <VehicleCard plateNumber="TRK-7734" model="Scania R500" status="On Trip" payloadCapacity={24000} currentWeight={22500} odometer={89000} />
          </div>
        </div>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Maintenance Alerts</h3>
          <div className="space-y-4">
            <MaintenanceCard vehicle="TRK-1123" type="Engine Oil Change" status="Pending" cost="450" startDate="2026-07-15" />
            <MaintenanceCard vehicle="TRK-3341" type="Brake Pad Replacement" status="Resolved" cost="850" startDate="2026-07-10" />
          </div>
        </div>
      </Grid>
    </Section>
  );

  const renderDispatcherDashboard = () => (
    <Section>
      <Grid cols={4} gap={6}>
        <StatCard title="Active Trips" value="18" icon={<ShieldAlert />} />
        <StatCard title="Pending Dispatch" value="4" icon={<ShieldAlert />} trend="1 delayed" trendDirection="down" />
        <StatCard title="Available Drivers" value="12" icon={<Users />} />
        <StatCard title="Available Vehicles" value="19" icon={<Truck />} />
      </Grid>
      <Grid cols={2} gap={6}>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Active Trips</h3>
          <div className="space-y-4">
            <TripCard tripId="TRP-1049" vehicle="TRK-9821" driver="John Doe" cargoWeight={18000} destination="Los Angeles, CA" status="Dispatched" />
            <TripCard tripId="TRP-1050" vehicle="TRK-7734" driver="Jane Smith" cargoWeight={22000} destination="Phoenix, AZ" status="Dispatched" />
          </div>
        </div>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Available Drivers</h3>
          <div className="space-y-4">
            <DriverCard name="Mike Johnson" licenseNumber="DL-44991" licenseExpiry="2028-10-15" safetyScore={98} status="Available" />
            <DriverCard name="Sarah Williams" licenseNumber="DL-22341" licenseExpiry="2027-05-22" safetyScore={92} status="Available" />
          </div>
        </div>
      </Grid>
    </Section>
  );

  const renderSafetyDashboard = () => (
    <Section>
      <Grid cols={4} gap={6}>
        <StatCard title="Total Drivers" value="45" icon={<Users />} />
        <StatCard title="On Duty" value="18" icon={<Users />} />
        <StatCard title="Avg Safety Score" value="94" icon={<ShieldAlert />} trend="2%" trendDirection="up" />
        <StatCard title="Suspended" value="2" icon={<ShieldAlert />} trend="1 new" trendDirection="down" />
      </Grid>
      <Grid cols={2} gap={6}>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Recent Drivers</h3>
          <div className="space-y-4">
            <DriverCard name="Mike Johnson" licenseNumber="DL-44991" licenseExpiry="2028-10-15" safetyScore={98} status="Available" />
            <DriverCard name="Jane Smith" licenseNumber="DL-99432" licenseExpiry="2024-01-10" safetyScore={72} status="Suspended" />
          </div>
        </div>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">License Alerts</h3>
          <div className="space-y-4">
            <DriverCard name="Robert Chen" licenseNumber="DL-55211" licenseExpiry="2026-08-01" safetyScore={88} status="Available" />
          </div>
        </div>
      </Grid>
    </Section>
  );

  const renderFinancialDashboard = () => (
    <Section>
      <Grid cols={4} gap={6}>
        <StatCard title="Total Revenue" value="$124,500" icon={<DollarSign />} trend="12%" trendDirection="up" />
        <StatCard title="Total Expenses" value="$42,300" icon={<DollarSign />} trend="5%" trendDirection="up" />
        <StatCard title="Fuel Cost" value="$18,400" icon={<DollarSign />} />
        <StatCard title="Net Profit" value="$82,200" icon={<DollarSign />} trend="15%" trendDirection="up" />
      </Grid>
      <Grid cols={2} gap={6}>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Recent Expenses</h3>
          <div className="space-y-4">
            <ExpenseCard vehicle="TRK-1123" category="Repair" cost={450} date="2026-07-10" description="Engine oil and filter change" />
            <ExpenseCard vehicle="Fleet" category="Insurance" cost={12000} date="2026-07-01" description="Annual fleet insurance premium" />
          </div>
        </div>
        <div>
          <h3 className="text-h4 font-bold mb-4 uppercase tracking-tight text-text-primary">Fuel Logs</h3>
          <div className="space-y-4">
            {/* Using ExpenseCard as fallback for Fuel logs to ensure component reuse without creating new ones */}
            <ExpenseCard vehicle="TRK-9821" category="Fuel" cost={320} date="2026-07-11" description="Diesel refill - 180L" />
            <ExpenseCard vehicle="TRK-7734" category="Fuel" cost={450} date="2026-07-12" description="Diesel refill - 250L" />
          </div>
        </div>
      </Grid>
    </Section>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title={`${user?.role || 'User'} Dashboard`} subtitle="Overview of your daily operations and critical alerts." />
      {role.includes('manager') && renderFleetManagerDashboard()}
      {role.includes('dispatcher') && renderDispatcherDashboard()}
      {role.includes('safety') && renderSafetyDashboard()}
      {role.includes('financial') && renderFinancialDashboard()}
      {!['manager', 'dispatcher', 'safety', 'financial'].some(r => role.includes(r)) && renderFleetManagerDashboard()}
    </div>
  );
}
