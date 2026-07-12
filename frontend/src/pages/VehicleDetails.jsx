import React, { useState, useEffect } from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { Card, InfoCard } from '../components/ui/Cards';
import { Button } from '../components/ui/Button';
import { StatusChip, Progress } from '../components/ui/Feedback';
import { ArrowLeft, PenTool, Flame, ShieldAlert } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { MaintenanceCard, FuelCard } from '../components/ui/BusinessCards';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import axios from '../lib/axios';
import { useAuth } from '../context/AuthContext';

export default function VehicleDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [draftTrips, setDraftTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/vehicles/${id}`);
      setVehicle(res.data);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDraftTrips = async () => {
    try {
      const res = await axios.get('/api/trips');
      setDraftTrips(res.data.filter(t => t.vehicleId === id && t.status === 'Draft'));
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    fetchVehicle();
    fetchDraftTrips();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-text-muted">Loading vehicle details...</div>;
  }

  if (!vehicle) {
    return <div className="p-8 text-center text-danger-fg">Vehicle not found</div>;
  }

  const vehicleInfo = [
    { label: 'Plate Number', value: vehicle.registrationNumber },
    { label: 'Name', value: vehicle.name },
    { label: 'Model', value: vehicle.model },
    { label: 'Type', value: vehicle.type },
    { label: 'Capacity', value: `${vehicle.maxLoadCapacity} kg` },
    { label: 'Odometer', value: `${vehicle.odometer} km` },
  ];

  const handleAction = async (e, actionType) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      if (actionType === 'edit') {
        await axios.put(`/api/vehicles/${id}`, {
          registrationNumber: data.registrationNumber,
          model: data.model,
          status: data.status
        });
      } else if (actionType === 'dispatch') {
        if (!data.tripId) {
          alert('Please select a trip to dispatch.');
          return;
        }
        await axios.post(`/api/trips/${data.tripId}/dispatch`);
      } else if (actionType === 'maintenance') {
        await axios.post('/api/maintenance', {
          vehicleId: id,
          description: `${data.type} - ${data.description}`,
          cost: parseFloat(data.cost),
          date: data.date
        });
        await axios.put(`/api/vehicles/${id}`, {
          status: 'In Shop'
        });
      } else if (actionType === 'fuel') {
        await axios.post('/api/fuel', {
          vehicleId: id,
          liters: parseFloat(data.liters),
          cost: parseFloat(data.cost),
          date: data.date
        });
        await axios.put(`/api/vehicles/${id}`, { odometer: parseFloat(data.odometer) });
      }
      
      setActiveModal(null);
      fetchVehicle(); // Refresh data
    } catch (error) {
      console.error(`Error performing ${actionType}:`, error);
      alert(`Failed to perform action: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-2 text-text-muted mb-4">
        <Link to="/vehicles" className="hover:text-text-primary transition-colors inline-flex items-center gap-1 font-semibold text-caption uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Vehicles
        </Link>
      </div>

      <PageHeader title={`${vehicle.model} (${vehicle.registrationNumber})`} subtitle="Detailed vehicle specifications, maintenance history, and logs.">
        <StatusChip status={vehicle.status} />
        {user?.role === 'Fleet Manager' && (
          <Button variant="outline" icon={<PenTool size={18} />} onClick={() => setActiveModal('edit')}>Edit</Button>
        )}
      </PageHeader>
      
      <Section>
        <Grid cols={3} gap={6}>
          <div className="col-span-2 space-y-6">
            <InfoCard title="Vehicle Specifications" items={vehicleInfo} />
            
            <Card className="flex flex-col gap-4">
              <h4 className="text-body-lg font-bold tracking-tight border- border-border pb-2">Current Load Status</h4>
              <div className="text-caption space-y-1 mt-2">
                <div className="flex justify-between text-text-muted">
                  <span>Capacity</span>
                  <span>{vehicle.maxLoadCapacity} kg Total</span>
                </div>
                <Progress value={vehicle.status === 'On Trip' ? vehicle.maxLoadCapacity * 0.8 : 0} max={vehicle.maxLoadCapacity} showLabel={false} />
              </div>
            </Card>

            <h3 className="text-h3 font-bold mt-8 mb-4">Recent Maintenance</h3>
            {vehicle.maintenanceLogs?.length > 0 ? (
              <Grid cols={2} gap={4}>
                {vehicle.maintenanceLogs.slice(0, 4).map(log => (
                  <MaintenanceCard key={log.id} vehicle={vehicle.registrationNumber} type={log.description.split(' - ')[0] || 'Maintenance'} status={log.status} cost={log.cost} startDate={new Date(log.date).toISOString().split('T')[0]} />
                ))}
              </Grid>
            ) : (
              <p className="text-text-muted">No maintenance logs found.</p>
            )}
          </div>
          
          <div className="space-y-6">
            <Card className="flex flex-col gap-4">
              <h4 className="text-body-lg font-bold tracking-tight border- border-border pb-2">Quick Actions</h4>
              {user?.role === 'Dispatcher' && (
                <Button variant="primary" className="w-full" icon={<ShieldAlert size={18} />} onClick={() => setActiveModal('dispatch')} disabled={vehicle.status !== 'Available'}>Dispatch to Trip</Button>
              )}
              {user?.role === 'Financial Analyst' && (
                <>
                  <Button variant="secondary" className="w-full" icon={<PenTool size={18} />} onClick={() => setActiveModal('maintenance')}>Log Maintenance</Button>
                  <Button variant="outline" className="w-full" icon={<Flame size={18} />} onClick={() => setActiveModal('fuel')}>Add Fuel Log</Button>
                </>
              )}
              {(!user || (!['Dispatcher', 'Financial Analyst'].includes(user.role))) && (
                <p className="text-text-muted text-sm italic">You don't have permission to perform actions.</p>
              )}
            </Card>

            <Card className="flex flex-col gap-4">
              <h4 className="text-body-lg font-bold tracking-tight border- border-border pb-2">Recent Fuel Logs</h4>
              {vehicle.fuelLogs?.length > 0 ? (
                vehicle.fuelLogs.slice(0, 3).map(log => (
                  <FuelCard key={log.id} vehicle={vehicle.registrationNumber} liters={log.liters} cost={log.cost} date={new Date(log.date).toISOString().split('T')[0]} odometer={vehicle.odometer} className="shadow-none border-border" />
                ))
              ) : (
                <p className="text-text-muted text-sm">No recent fuel logs.</p>
              )}
            </Card>
          </div>
        </Grid>
      </Section>

      <Modal isOpen={activeModal === 'edit'} onClose={() => setActiveModal(null)} title="Edit Vehicle">
        <form onSubmit={(e) => handleAction(e, 'edit')} className="space-y-4">
          <Input label="Plate Number" name="registrationNumber" defaultValue={vehicle.registrationNumber} required />
          <Input label="Model" name="model" defaultValue={vehicle.model} required />
          <Select label="Status" name="status" defaultValue={vehicle.status} options={[{value:'Available',label:'Available'},{value:'On Trip',label:'On Trip'},{value:'In Shop',label:'In Shop'},{value:'Retired',label:'Retired'}]} />
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Changes</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'dispatch'} onClose={() => setActiveModal(null)} title="Dispatch to Pre-defined Trip">
        <form onSubmit={(e) => handleAction(e, 'dispatch')} className="space-y-4">
          {draftTrips.length === 0 ? (
            <p className="text-text-muted text-sm pb-4">No draft trips are assigned to this vehicle. Please go to Trips and create one first.</p>
          ) : (
            <>
              <Select 
                label="Select Pre-defined Draft Trip" 
                name="tripId" 
                options={draftTrips.map(t => ({ value: t.id, label: `${t.source} to ${t.destination} (Driver: ${t.driver?.name || 'Assigned'})` }))} 
                required 
              />
              <p className="text-text-muted text-sm mt-2">Dispatching this trip will automatically update the vehicle and driver status to 'On Trip'.</p>
            </>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={draftTrips.length === 0}>Dispatch Trip</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'maintenance'} onClose={() => setActiveModal(null)} title="Log Maintenance">
        <form onSubmit={(e) => handleAction(e, 'maintenance')} className="space-y-4">
          <Select label="Maintenance Type" name="type" options={[{value:'Repair',label:'Repair'},{value:'Inspection',label:'Inspection'},{value:'Routine',label:'Routine'}]} required />
          <Input label="Cost ($)" name="cost" type="number" placeholder="Enter cost..." required />
          <Input label="Description" name="description" placeholder="Enter maintenance details..." required />
          <Input label="Date" name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Log Maintenance</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'fuel'} onClose={() => setActiveModal(null)} title="Add Fuel Log">
        <form onSubmit={(e) => handleAction(e, 'fuel')} className="space-y-4">
          <Input label="Liters" name="liters" type="number" placeholder="Amount fueled..." required />
          <Input label="Total Cost ($)" name="cost" type="number" placeholder="Total cost..." required />
          <Input label="Odometer Reading (km)" name="odometer" type="number" defaultValue={vehicle.odometer} required />
          <Input label="Date" name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Log</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
