import React from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { Card } from '../components/ui/Cards';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function VehicleRegistration() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-2 text-text-muted mb-4">
        <Link to="/vehicles" className="hover:text-text-primary transition-colors inline-flex items-center gap-1 font-semibold text-caption uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Vehicles
        </Link>
      </div>

      <PageHeader title="Register New Vehicle" subtitle="Add a new transport unit to the operational fleet." />
      
      <Section>
        <Card className="max-w-3xl">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/vehicles'); }}>
            <h4 className="text-body-lg font-bold tracking-tight border-b-4 border-border pb-2">Identification</h4>
            <Grid cols={2} gap={4}>
              <Input label="Plate Number" placeholder="e.g. TRK-1234" required />
              <Input label="VIN (Vehicle Identification Number)" placeholder="Enter 17-character VIN" required />
            </Grid>

            <h4 className="text-body-lg font-bold tracking-tight border-b-4 border-border pb-2 pt-4">Specifications</h4>
            <Grid cols={2} gap={4}>
              <Input label="Make / Manufacturer" placeholder="e.g. Volvo" required />
              <Input label="Model" placeholder="e.g. FH16" required />
              <Input label="Year of Manufacture" type="number" placeholder="2026" required />
              <Select 
                label="Fuel Type" 
                options={[{value: 'diesel', label: 'Diesel'}, {value: 'electric', label: 'Electric'}]} 
                defaultValue="diesel"
              />
              <Input label="Payload Capacity (kg)" type="number" placeholder="20000" required />
              <Input label="Initial Odometer (km)" type="number" placeholder="0" required />
            </Grid>

            <div className="pt-6 border-t-4 border-border flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => navigate('/vehicles')}>Cancel</Button>
              <Button variant="primary" type="submit" icon={<CheckCircle2 size={18} />}>Complete Registration</Button>
            </div>
          </form>
        </Card>
      </Section>
    </div>
  );
}
