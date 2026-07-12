import React, { useState, useEffect } from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { Card, InfoCard } from '../components/ui/Cards';
import { Button } from '../components/ui/Button';
import { StatusChip, Badge, Progress } from '../components/ui/Feedback';
import { ArrowLeft, CheckCircle2, ShieldAlert, PenTool, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import axios from '../lib/axios';

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  const fetchTrip = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/trips/${id}`);
      setTrip(res.data);
    } catch (error) {
      console.error('Error fetching trip:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResources = async () => {
    try {
      const [vRes, dRes] = await Promise.all([
        axios.get('/api/vehicles'),
        axios.get('/api/drivers')
      ]);
      setVehicles(vRes.data.filter(v => v.status === 'Available'));
      setDrivers(dRes.data.filter(d => d.status === 'Available'));
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  useEffect(() => {
    fetchTrip();
    fetchResources();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-text-muted">Loading trip details...</div>;
  }

  if (!trip) {
    return <div className="p-8 text-center text-danger-fg">Trip not found</div>;
  }

  const tripInfo = [
    { label: 'Trip ID', value: trip.id },
    { label: 'Origin', value: trip.source },
    { label: 'Destination', value: trip.destination },
    { label: 'Cargo Weight', value: `${trip.cargoWeight} kg` },
    { label: 'Status', value: trip.status },
  ];

  const handleAction = async (e, actionType) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      if (actionType === 'edit') {
        await axios.put(`/api/trips/${id}`, {
          source: data.source,
          destination: data.destination,
          cargoWeight: parseFloat(data.cargoWeight)
        });
      } else if (actionType === 'complete') {
        await axios.put(`/api/trips/${id}/complete`);
        // If odometer was provided, update the vehicle
        if (data.odometer && trip.vehicleId) {
          await axios.put(`/api/vehicles/${trip.vehicleId}`, { odometer: parseFloat(data.odometer) });
        }
      } else if (actionType === 'assign') {
        await axios.put(`/api/trips/${id}`, {
          vehicleId: data.vehicleId,
          driverId: data.driverId
        });
      } else if (actionType === 'cancel') {
        await axios.put(`/api/trips/${id}/cancel`);
      } else {
        console.log(`Action ${actionType} performed with data:`, data);
      }
      
      setActiveModal(null);
      fetchTrip();
    } catch (error) {
      console.error(`Error performing ${actionType}:`, error);
      alert(`Failed to perform action: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-2 text-text-muted mb-4">
        <Link to="/trips" className="hover:text-text-primary transition-colors inline-flex items-center gap-1 font-semibold text-caption uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Trips
        </Link>
      </div>

      <PageHeader title={`Trip Details (${trip.id.substring(0,8).toUpperCase()})`} subtitle="Active shipment tracking and dispatch management.">
        <StatusChip status={trip.status} />
        {trip.status === 'Dispatched' && (
          <Button variant="outline" icon={<CheckCircle2 size={18} />} onClick={() => setActiveModal('complete')}>Mark Completed</Button>
        )}
      </PageHeader>
      
      <Section>
        <Grid cols={3} gap={6}>
          <div className="col-span-2 space-y-6">
            <InfoCard title="Shipment Details" items={tripInfo} />
            
            <Card className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b-4 border-border pb-2">
                <h4 className="text-body-lg font-bold tracking-tight">Route Progress</h4>
                <Button variant="ghost" size="sm" icon={<PenTool size={16} />} onClick={() => setActiveModal('edit')} disabled={trip.status === 'Completed' || trip.status === 'Cancelled'}>Edit Route</Button>
              </div>
              <div className="text-caption space-y-1 mt-2">
                <div className="flex justify-between text-text-muted">
                  <span>Distance</span>
                  <span>{trip.plannedDistance ? `${trip.plannedDistance} km` : 'Not Set'}</span>
                </div>
                <Progress value={trip.status === 'Completed' ? 100 : (trip.status === 'Dispatched' ? 50 : 0)} max={100} showLabel={false} />
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b-4 border-border pb-2">
                <h4 className="text-body-lg font-bold tracking-tight">Assigned Personnel & Equipment</h4>
                <Button variant="ghost" size="sm" icon={<Users size={16} />} onClick={() => setActiveModal('assign')} disabled={trip.status !== 'Draft'}>Reassign</Button>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-caption text-text-muted uppercase tracking-wider block mb-1">Driver</span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text-primary">{trip.driver?.name || 'Unassigned'}</span>
                    <Badge variant="brand">{trip.driver?.licenseNumber || 'N/A'}</Badge>
                  </div>
                </div>
                <div>
                  <span className="text-caption text-text-muted uppercase tracking-wider block mb-1">Vehicle</span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text-primary">{trip.vehicle?.model || 'Unassigned'}</span>
                    <Badge variant="muted">{trip.vehicle?.registrationNumber || 'N/A'}</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {(trip.status === 'Draft' || trip.status === 'Dispatched') && (
              <Card className="flex flex-col gap-4 border-danger/40 bg-danger/5">
                <h4 className="text-body-lg font-bold tracking-tight text-danger-fg border-b border-danger/20 pb-2 flex items-center gap-2">
                  <ShieldAlert size={18} /> Emergency Actions
                </h4>
                <Button variant="danger" className="w-full" onClick={() => setActiveModal('incident')}>Report Incident</Button>
                <Button variant="outline" className="w-full text-danger-fg border-danger/40 hover:bg-danger/10" onClick={() => setActiveModal('cancel')}>Cancel Trip</Button>
              </Card>
            )}
          </div>
        </Grid>
      </Section>

      <Modal isOpen={activeModal === 'edit'} onClose={() => setActiveModal(null)} title="Edit Route & Details">
        <form onSubmit={(e) => handleAction(e, 'edit')} className="space-y-4">
          <Input label="Origin" name="source" defaultValue={trip.source} required />
          <Input label="Destination" name="destination" defaultValue={trip.destination} required />
          <Input label="Cargo Weight (kg)" name="cargoWeight" type="number" defaultValue={trip.cargoWeight} required />
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Changes</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'complete'} onClose={() => setActiveModal(null)} title="Complete Trip">
        <form onSubmit={(e) => handleAction(e, 'complete')} className="space-y-4">
          <p className="text-body text-text-secondary">Are you sure you want to mark this trip as completed? This will update the status of the vehicle and driver back to Available.</p>
          <Input label="Final Odometer Reading" name="odometer" type="number" defaultValue={trip.vehicle?.odometer} required />
          <Input label="Arrival Time" name="arrivalTime" type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} required />
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Confirm Completion</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'assign'} onClose={() => setActiveModal(null)} title="Reassign Resources">
        <form onSubmit={(e) => handleAction(e, 'assign')} className="space-y-4">
          <Select label="New Vehicle" name="vehicleId" options={vehicles.map(v => ({ value: v.id, label: v.registrationNumber }))} defaultValue={trip.vehicleId} required />
          <Select label="New Driver" name="driverId" options={drivers.map(d => ({ value: d.id, label: d.name }))} defaultValue={trip.driverId} required />
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Update Assignment</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'incident'} onClose={() => setActiveModal(null)} title="Report Incident">
        <form onSubmit={(e) => handleAction(e, 'incident')} className="space-y-4">
          <Select label="Incident Type" name="type" options={[{value:'accident',label:'Accident'},{value:'breakdown',label:'Vehicle Breakdown'},{value:'delay',label:'Severe Delay'}]} required />
          <Input label="Description" name="description" placeholder="Provide details of the incident..." required />
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button type="submit" variant="danger">Submit Report</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'cancel'} onClose={() => setActiveModal(null)} title="Cancel Trip">
        <form onSubmit={(e) => handleAction(e, 'cancel')} className="space-y-4">
          <p className="text-body text-danger-fg">Warning: Cancelling this trip will immediately abort the dispatch and notify the driver.</p>
          <Input label="Reason for Cancellation" name="reason" placeholder="Enter reason..." required />
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Go Back</Button>
            <Button type="submit" variant="danger">Confirm Cancellation</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
