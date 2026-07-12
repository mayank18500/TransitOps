import React, { useState, useEffect } from 'react';
import { PageHeader, Section } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { StatusChip } from '../components/ui/Feedback';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Overlays';
import { Plus } from 'lucide-react';
import { tripService } from '../services/trip.service';
import { vehicleService } from '../services/vehicle.service';
import { driverService } from '../services/driver.service';

export default function Trips() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ source: '', destination: '', cargoWeight: '', plannedDistance: '', vehicleId: '', driverId: '' });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const tripsData = await tripService.getAllTrips();
      const vecs = await vehicleService.getVehicles();
      const drvs = await driverService.getAllDrivers();
      setData(tripsData);
      setVehicles(vecs);
      setDrivers(drvs);
      if (vecs.length > 0 && drvs.length > 0) {
        setFormData(prev => ({ ...prev, vehicleId: vecs[0].id, driverId: drvs[0].id }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await tripService.createTrip({
        ...formData,
        cargoWeight: parseFloat(formData.cargoWeight),
        plannedDistance: parseFloat(formData.plannedDistance) || 0
      });
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to create trip');
    }
  };

  const columns = [
    { key: 'tripId', label: 'Trip ID', sortable: true, render: (row) => <span className="font-bold">{row.id.split('-')[0]}</span> },
    { key: 'vehicle', label: 'Vehicle', sortable: true, render: (row) => row.vehicle?.registrationNumber || 'Unknown' },
    { key: 'driver', label: 'Driver', sortable: true, render: (row) => row.driver?.name || 'Unknown' },
    { key: 'destination', label: 'Destination', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Trips Management" subtitle="Dispatch vehicles, assign drivers, and monitor active trips in real-time.">
        <Button variant="primary" icon={<Plus size={18} />} onClick={() => setIsModalOpen(true)}>
          Create Trip
        </Button>
      </PageHeader>
      
      <Section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by destination..." isFilterActive={false} onFilterToggle={() => {}} />
        <DataTable columns={columns} data={data} isLoading={isLoading} onSort={() => {}} />
      </Section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Trip">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input label="Source" required value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} />
          <Input label="Destination" required value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
          <Input label="Cargo Weight (kg)" type="number" required value={formData.cargoWeight} onChange={e => setFormData({...formData, cargoWeight: e.target.value})} />
          <Input label="Planned Distance (km)" type="number" required value={formData.plannedDistance} onChange={e => setFormData({...formData, plannedDistance: e.target.value})} />
          <Select 
            label="Vehicle" 
            options={vehicles.map(v => ({ value: v.id, label: v.registrationNumber }))}
            value={formData.vehicleId}
            onChange={e => setFormData({...formData, vehicleId: e.target.value})}
          />
          <Select 
            label="Driver" 
            options={drivers.map(d => ({ value: d.id, label: d.name }))}
            value={formData.driverId}
            onChange={e => setFormData({...formData, driverId: e.target.value})}
          />
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Trip</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
