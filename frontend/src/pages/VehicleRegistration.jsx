import React, { useState } from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { Card } from '../components/ui/Cards';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { vehicleService } from '../services/vehicle.service';

export default function VehicleRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    registrationNumber: '',
    name: '',
    model: '',
    type: 'Heavy Truck',
    maxLoadCapacity: '',
    odometer: '',
    acquisitionCost: ''
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await vehicleService.createVehicle({
        ...formData,
        maxLoadCapacity: parseFloat(formData.maxLoadCapacity),
        odometer: parseFloat(formData.odometer) || 0,
        acquisitionCost: parseFloat(formData.acquisitionCost) || 0,
      });
      navigate('/vehicles');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

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
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-danger font-semibold">{error}</div>}
            <h4 className="text-body-lg font-bold tracking-tight border-b-4 border-border pb-2">Identification</h4>
            <Grid cols={2} gap={4}>
              <Input label="Plate Number" placeholder="e.g. TRK-1234" required value={formData.registrationNumber} onChange={e => setFormData({...formData, registrationNumber: e.target.value})} />
              <Input label="Vehicle Name" placeholder="e.g. Heavy Hauler 1" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </Grid>

            <h4 className="text-body-lg font-bold tracking-tight border-b-4 border-border pb-2 pt-4">Specifications</h4>
            <Grid cols={2} gap={4}>
              <Input label="Model" placeholder="e.g. Volvo FH16" required value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
              <Input label="Type" placeholder="e.g. Heavy Truck" required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} />
              <Input label="Payload Capacity (kg)" type="number" placeholder="20000" required value={formData.maxLoadCapacity} onChange={e => setFormData({...formData, maxLoadCapacity: e.target.value})} />
              <Input label="Initial Odometer (km)" type="number" placeholder="0" required value={formData.odometer} onChange={e => setFormData({...formData, odometer: e.target.value})} />
              <Input label="Acquisition Cost ($)" type="number" placeholder="150000" required value={formData.acquisitionCost} onChange={e => setFormData({...formData, acquisitionCost: e.target.value})} />
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

