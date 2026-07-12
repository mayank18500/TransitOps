import React, { useState, useEffect } from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { Card, InfoCard } from '../components/ui/Cards';
import { Button } from '../components/ui/Button';
import { StatusChip, Progress } from '../components/ui/Feedback';
import { ArrowLeft, PenTool, Calendar, Award } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import axios from '../lib/axios';
import { useAuth } from '../context/AuthContext';

export default function DriverDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  const fetchDriver = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/drivers/${id}`);
      setDriver(res.data);
    } catch (error) {
      console.error('Error fetching driver:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriver();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-text-muted">Loading driver details...</div>;
  }

  if (!driver) {
    return <div className="p-8 text-center text-danger-fg">Driver not found</div>;
  }

  const driverInfo = [
    { label: 'Name', value: driver.name },
    { label: 'License Number', value: driver.licenseNumber },
    { label: 'License Category', value: driver.licenseCategory },
    { label: 'License Expiry', value: new Date(driver.licenseExpiry).toLocaleDateString() },
    { label: 'Contact', value: driver.contactNumber },
    { label: 'Status', value: driver.status },
  ];

  const handleAction = async (e, actionType) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      if (actionType === 'edit') {
        await axios.put(`/api/drivers/${id}`, {
          name: data.name,
          contactNumber: data.contactNumber,
          licenseExpiry: data.licenseExpiry,
          status: data.status
        });
      } else if (actionType === 'leave') {
        await axios.put(`/api/drivers/${id}`, {
          status: 'Off Duty'
        });
      } else {
        // Other actions might not have endpoints yet, just close modal
        console.log(`Action ${actionType} performed with data:`, data);
      }
      setActiveModal(null);
      fetchDriver();
    } catch (error) {
      console.error(`Error performing ${actionType}:`, error);
      alert(`Failed to perform action: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-2 text-text-muted mb-4">
        <Link to="/drivers" className="hover:text-text-primary transition-colors inline-flex items-center gap-1 font-semibold text-caption uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Drivers
        </Link>
      </div>

      <PageHeader title={`${driver.name} (Driver)`} subtitle={`Detailed driver profile and performance history (ID: ${driver.id})`}>
        <StatusChip status={driver.status} />
        {user?.role === 'Fleet Manager' && (
          <Button variant="outline" icon={<PenTool size={18} />} onClick={() => setActiveModal('edit')}>Edit</Button>
        )}
      </PageHeader>
      
      <Section>
        <Grid cols={3} gap={6}>
          <div className="col-span-2 space-y-6">
            <InfoCard title="Driver Information" items={driverInfo} />
            
            <Card className="flex flex-col gap-4">
              <h4 className="text-body-lg font-bold tracking-tight border- border-border pb-2">Safety & Performance</h4>
              <div className="text-caption space-y-1 mt-2">
                <div className="flex justify-between text-text-muted">
                  <span>Safety Score</span>
                  <span>{driver.safetyScore} / 100</span>
                </div>
                <Progress value={driver.safetyScore} max={100} showLabel={true} />
              </div>
            </Card>

            <h3 className="text-h3 font-bold mt-8 mb-4">Recent Trips</h3>
            <div className="space-y-4">
              {driver.trips?.length > 0 ? (
                driver.trips.slice(0, 3).map(trip => (
                  <Card key={trip.id} className="flex flex-col gap-2 p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Trip #{trip.id.substring(0,8).toUpperCase()}</span>
                      <StatusChip status={trip.status} />
                    </div>
                    <div className="text-sm text-text-muted">
                      <p>Vehicle: {trip.vehicle?.registrationNumber || 'Unassigned'}</p>
                      <p>Route: {trip.source} → {trip.destination}</p>
                      <p>Cargo: {trip.cargoWeight} kg</p>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-text-muted text-sm">No recent trips for this driver.</p>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="flex flex-col gap-4">
              <h4 className="text-body-lg font-bold tracking-tight border- border-border pb-2">Quick Actions</h4>
              {['Fleet Manager', 'Dispatcher'].includes(user?.role) && (
                <Button variant="primary" className="w-full" icon={<Calendar size={18} />} onClick={() => setActiveModal('leave')}>Schedule Leave</Button>
              )}
              {['Fleet Manager', 'Safety Officer'].includes(user?.role) && (
                <Button variant="secondary" className="w-full" icon={<Award size={18} />} onClick={() => setActiveModal('training')}>Record Training</Button>
              )}
              {(!user || (!['Fleet Manager', 'Dispatcher', 'Safety Officer'].includes(user.role))) && (
                <p className="text-text-muted text-sm italic">You don't have permission to perform actions.</p>
              )}
            </Card>
          </div>
        </Grid>
      </Section>

      <Modal isOpen={activeModal === 'edit'} onClose={() => setActiveModal(null)} title="Edit Driver">
        <form onSubmit={(e) => handleAction(e, 'edit')} className="space-y-4">
          <Input label="Name" name="name" defaultValue={driver.name} required />
          <Input label="Contact Number" name="contactNumber" defaultValue={driver.contactNumber} required />
          <Input label="License Expiry" name="licenseExpiry" type="date" defaultValue={new Date(driver.licenseExpiry).toISOString().split('T')[0]} required />
          <Select label="Status" name="status" defaultValue={driver.status} options={[{value:'Available',label:'Available'},{value:'On Trip',label:'On Trip'},{value:'Off Duty',label:'Off Duty'},{value:'Suspended',label:'Suspended'}]} />
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Changes</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'leave'} onClose={() => setActiveModal(null)} title="Schedule Leave">
        <form onSubmit={(e) => handleAction(e, 'leave')} className="space-y-4">
          <Input label="Start Date" name="startDate" type="date" required />
          <Input label="End Date" name="endDate" type="date" required />
          <Select label="Leave Type" name="leaveType" options={[{value:'Sick',label:'Sick Leave'},{value:'Vacation',label:'Vacation'},{value:'Personal',label:'Personal Leave'}]} required />
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Schedule Leave</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'training'} onClose={() => setActiveModal(null)} title="Record Training">
        <form onSubmit={(e) => handleAction(e, 'training')} className="space-y-4">
          <Input label="Course Name" name="courseName" placeholder="e.g. Winter Driving Safety" required />
          <Input label="Completion Date" name="completionDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Record</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
