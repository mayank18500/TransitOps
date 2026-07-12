import React from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { Card, InfoCard } from '../components/ui/Cards';
import { Button } from '../components/ui/Button';
import { StatusChip, Badge, Progress } from '../components/ui/Feedback';
import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TripDetails() {
  const tripInfo = [
    { label: 'Trip ID', value: 'TRP-1049' },
    { label: 'Origin', value: 'San Francisco, CA' },
    { label: 'Destination', value: 'Los Angeles, CA' },
    { label: 'Departure', value: '2026-07-12 08:00 AM' },
    { label: 'Est. Arrival', value: '2026-07-12 04:30 PM' },
    { label: 'Cargo Weight', value: '18,000 kg' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-2 text-text-muted mb-4">
        <Link to="/trips" className="hover:text-text-primary transition-colors inline-flex items-center gap-1 font-semibold text-caption uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Trips
        </Link>
      </div>

      <PageHeader title="Trip Details (TRP-1049)" subtitle="Active shipment tracking and dispatch management.">
        <StatusChip status="Dispatched" />
        <Button variant="outline" icon={<CheckCircle2 size={18} />}>Mark Completed</Button>
      </PageHeader>
      
      <Section>
        <Grid cols={3} gap={6}>
          <div className="col-span-2 space-y-6">
            <InfoCard title="Shipment Details" items={tripInfo} />
            
            <Card className="flex flex-col gap-4">
              <h4 className="text-body-lg font-bold tracking-tight border-b-4 border-border pb-2">Route Progress</h4>
              <div className="text-caption space-y-1 mt-2">
                <div className="flex justify-between text-text-muted">
                  <span>Distance Covered</span>
                  <span>240 / 380 miles</span>
                </div>
                <Progress value={240} max={380} showLabel={false} />
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="flex flex-col gap-4">
              <h4 className="text-body-lg font-bold tracking-tight border-b-4 border-border pb-2">Assigned Personnel & Equipment</h4>
              <div className="space-y-4">
                <div>
                  <span className="text-caption text-text-muted uppercase tracking-wider block mb-1">Driver</span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text-primary">John Doe</span>
                    <Badge variant="brand">DL-11882</Badge>
                  </div>
                </div>
                <div>
                  <span className="text-caption text-text-muted uppercase tracking-wider block mb-1">Vehicle</span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text-primary">Volvo FH16</span>
                    <Badge variant="muted">TRK-9821</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="flex flex-col gap-4 border-danger/40 bg-danger/5">
              <h4 className="text-body-lg font-bold tracking-tight text-danger-fg border-b border-danger/20 pb-2 flex items-center gap-2">
                <ShieldAlert size={18} /> Emergency Actions
              </h4>
              <Button variant="danger" className="w-full">Report Incident</Button>
              <Button variant="outline" className="w-full text-danger-fg border-danger/40">Cancel Trip</Button>
            </Card>
          </div>
        </Grid>
      </Section>
    </div>
  );
}
