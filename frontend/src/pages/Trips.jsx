import React, { useState, useEffect } from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { StatusChip } from '../components/ui/Feedback';
import { Plus, CheckCircle2 } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Trips() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [formData, setFormData] = useState({
    vehicleId: '',
    driverId: '',
    source: '',
    destination: '',
    cargoWeight: '',
    plannedDistance: ''
  });
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  
  const columns = [
    { key: 'id', label: 'Trip ID', sortable: true, render: (row) => <span className="font-bold">{row.id.slice(0, 8)}</span> },
    { key: 'vehicle', label: 'Vehicle', sortable: true, render: (row) => row.vehicle?.registrationNumber || 'N/A' },
    { key: 'driver', label: 'Driver', sortable: true, render: (row) => row.driver?.name || 'N/A' },
    { key: 'source', label: 'Source', sortable: true },
    { key: 'destination', label: 'Destination', sortable: true },
    { key: 'cargoWeight', label: 'Cargo (kg)', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
    { key: 'actions', label: 'Actions', render: (row) => <Button variant="ghost" size="sm" onClick={() => navigate(`/trips/${row.id}`)}>Manage</Button> }
  ];

  const fetchTrips = async () => {
    try {
      const response = await api.get('/api/trips');
      setTrips(response.data);
    } catch (error) {
      console.error('Failed to fetch trips', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    setIsLoadingOptions(true);
    try {
      const [vRes, dRes] = await Promise.all([
        api.get('/api/vehicles'),
        api.get('/api/drivers')
      ]);
      setVehicles(vRes.data.filter(v => v.status === 'Available'));
      setDrivers(dRes.data.filter(d => d.status === 'Available'));
    } catch (error) {
      console.error('Failed to fetch options', error);
    } finally {
      setIsLoadingOptions(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/api/trips', {
        ...formData,
        cargoWeight: parseInt(formData.cargoWeight),
        plannedDistance: parseInt(formData.plannedDistance)
      });
      setIsModalOpen(false);
      setFormData({
        vehicleId: '', driverId: '', source: '', destination: '', cargoWeight: '', plannedDistance: ''
      });
      fetchTrips();
    } catch (error) {
      console.error('Failed to create trip', error);
      alert('Failed to create trip. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filteredTrips = trips.filter((t) => {
    const matchesSearch = t.id?.toLowerCase().includes(search.toLowerCase()) || 
                          t.vehicle?.registrationNumber?.toLowerCase().includes(search.toLowerCase()) ||
                          t.driver?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && (!isFilterActive || matchesStatus);
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Trips Management" subtitle="Dispatch vehicles, assign drivers, and monitor active trips in real-time.">
        {['Fleet Manager', 'Dispatcher'].includes(user?.role) && (
          <Button variant="primary" icon={<Plus size={18} />} onClick={handleOpenModal}>
            Create Trip
          </Button>
        )}
      </PageHeader>
      
      <Section>
        <div className="space-y-4">
          <SearchBar 
            value={search} 
            onChange={setSearch} 
            placeholder="Search by Trip ID, vehicle, or driver..." 
            isFilterActive={isFilterActive} 
            onFilterToggle={() => setIsFilterActive(!isFilterActive)} 
          />
          
          {isFilterActive && (
            <div className="p-4 bg-bg-surface border border-border-default rounded-lg animate-fade-in flex gap-4 items-end">
              <div className="w-64">
                <Select 
                  label="Filter by Status" 
                  options={[
                    {value: 'All', label: 'All Statuses'},
                    {value: 'Planned', label: 'Planned'},
                    {value: 'In Progress', label: 'In Progress'},
                    {value: 'Completed', label: 'Completed'},
                    {value: 'Cancelled', label: 'Cancelled'}
                  ]}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={() => setStatusFilter('All')}>Clear</Button>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand-primary" />
          </div>
        ) : (
          <DataTable columns={columns} data={filteredTrips} onSort={(conf) => console.log(conf)} />
        )}
        
        <Pagination currentPage={1} totalPages={Math.max(1, Math.ceil(filteredTrips.length / 10))} onPageChange={() => {}} />
      </Section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Trip">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h4 className="text-body-lg font-bold tracking-tight pb-2 text-text-primary border-b border-border-default">Trip Assignment</h4>
          <Grid cols={2} gap={4}>
            <Select 
              label="Vehicle" 
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              options={vehicles.map(v => ({ value: v.id, label: `${v.registrationNumber} - ${v.name}` }))} 
              isLoading={isLoadingOptions}
              required
            />
            <Select 
              label="Driver" 
              name="driverId"
              value={formData.driverId}
              onChange={handleChange}
              options={drivers.map(d => ({ value: d.id, label: d.name }))} 
              isLoading={isLoadingOptions}
              required
            />
          </Grid>

          <h4 className="text-body-lg font-bold tracking-tight pb-2 pt-2 text-text-primary border-b border-border-default">Route Details</h4>
          <Grid cols={2} gap={4}>
            <Input label="Source Location" name="source" value={formData.source} onChange={handleChange} placeholder="e.g. Warehouse A" required />
            <Input label="Destination" name="destination" value={formData.destination} onChange={handleChange} placeholder="e.g. Distribution Center B" required />
            <Input label="Cargo Weight (kg)" name="cargoWeight" type="number" value={formData.cargoWeight} onChange={handleChange} placeholder="15000" required />
            <Input label="Planned Distance (km)" name="plannedDistance" type="number" value={formData.plannedDistance} onChange={handleChange} placeholder="500" required />
          </Grid>

          <div className="pt-6 mt-4 border-t border-border-default flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button variant="primary" type="submit" icon={<CheckCircle2 size={18} />} isLoading={isSubmitting}>Dispatch Trip</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
