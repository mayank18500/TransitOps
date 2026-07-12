import React from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { Card, InfoCard } from '../components/ui/Cards';
import { Button } from '../components/ui/Button';
import { StatusChip, Progress, Badge } from '../components/ui/Feedback';
import { ArrowLeft, PenTool, Flame, ShieldAlert, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MaintenanceCard, FuelCard } from '../components/ui/BusinessCards';

export default function VehicleDetails() {
  const vehicleInfo = [
    { label: 'Plate Number', value: 'TRK-9821' },
    { label: 'VIN', value: '1HGCM82633A004' },
    { label: 'Model', value: 'Volvo FH16' },
    { label: 'Year', value: '2023' },
    { label: 'Capacity', value: '20,000 kg' },
    { label: 'Odometer', value: '145,000 km' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-2 text-text-muted mb-4">
        <Link to="/vehicles" className="hover:text-text-primary transition-colors inline-flex items-center gap-1 font-semibold text-caption uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Vehicles
        </Link>
      </div>

      <PageHeader title="Volvo FH16 (TRK-9821)" subtitle="Detailed vehicle specifications, maintenance history, and logs.">
        <StatusChip status="Available" />
        <Button variant="outline" icon={<PenTool size={18} />}>Edit</Button>
      </PageHeader>
      
      <Section>
        <Grid cols={3} gap={6}>
          <div className="col-span-2 space-y-6">
            <InfoCard title="Vehicle Specifications" items={vehicleInfo} />
            
            <Card className="flex flex-col gap-4">
              <h4 className="text-body-lg font-bold tracking-tight border-b-4 border-border pb-2">Current Load Status</h4>
              <div className="text-caption space-y-1 mt-2">
                <div className="flex justify-between text-text-muted">
                  <span>Payload Utilization</span>
                  <span>14,500 / 20,000 kg</span>
                </div>
                <Progress value={14500} max={20000} showLabel={true} />
              </div>
            </Card>

            <h3 className="text-h3 font-bold mt-8 mb-4">Recent Maintenance</h3>
            <Grid cols={2} gap={4}>
              <MaintenanceCard vehicle="TRK-9821" type="Engine Oil Change" status="Resolved" cost="450" startDate="2026-06-15" />
              <MaintenanceCard vehicle="TRK-9821" type="Tire Rotation" status="Resolved" cost="250" startDate="2026-05-10" />
            </Grid>
          </div>
          
          <div className="space-y-6">
            <Card className="flex flex-col gap-4">
              <h4 className="text-body-lg font-bold tracking-tight border-b-4 border-border pb-2">Quick Actions</h4>
              <Button variant="primary" className="w-full" icon={<ShieldAlert size={18} />}>Dispatch to Trip</Button>
              <Button variant="secondary" className="w-full" icon={<PenTool size={18} />}>Log Maintenance</Button>
              <Button variant="outline" className="w-full" icon={<Flame size={18} />}>Add Fuel Log</Button>
            </Card>

            <Card className="flex flex-col gap-4">
              <h4 className="text-body-lg font-bold tracking-tight border-b-4 border-border pb-2">Recent Fuel Logs</h4>
              <FuelCard vehicle="TRK-9821" liters={180} cost={320} date="2026-07-11" odometer={144800} className="shadow-none border-border" />
              <FuelCard vehicle="TRK-9821" liters={200} cost={350} date="2026-07-08" odometer={144200} className="shadow-none border-border" />
            </Card>
          </div>
        </Grid>
      </Section>
    </div>
  );
}
