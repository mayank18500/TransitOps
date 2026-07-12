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

export default function Vehicles() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [formData, setFormData] = useState({
    registrationNumber: '',
    name: '',
    model: '',
    type: 'Heavy Duty',
    maxLoadCapacity: '',
    acquisitionCost: '',
    odometer: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const columns = [
    { key: 'registrationNumber', label: 'Plate Number', sortable: true },
    { key: 'model', label: 'Model', sortable: true },
    { key: 'maxLoadCapacity', label: 'Capacity (kg)', sortable: true },
    { key: 'odometer', label: 'Odometer (km)', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
    { key: 'actions', label: 'Actions', render: (row) => <Button variant="ghost" size="sm" onClick={() => navigate(`/vehicles/${row.id}`)}>View</Button> }
  ];

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/api/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Failed to fetch vehicles', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/api/vehicles', {
        ...formData,
        maxLoadCapacity: parseInt(formData.maxLoadCapacity),
        acquisitionCost: parseInt(formData.acquisitionCost),
        odometer: parseInt(formData.odometer)
      });
      setIsModalOpen(false);
      setFormData({
        registrationNumber: '', name: '', model: '', type: 'Heavy Duty', maxLoadCapacity: '', acquisitionCost: '', odometer: ''
      });
      fetchVehicles(); // Refresh data
    } catch (error) {
      console.error('Failed to register vehicle', error);
      alert('Failed to register vehicle. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch = v.registrationNumber?.toLowerCase().includes(search.toLowerCase()) || 
                          v.model?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchesSearch && (!isFilterActive || matchesStatus);
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Vehicles Directory" subtitle="Manage your fleet, track status, and schedule maintenance.">
        {user?.role === 'Fleet Manager' && (
          <Button variant="primary" icon={<Plus size={18} />} onClick={() => setIsModalOpen(true)}>
            Register Vehicle
          </Button>
        )}
      </PageHeader>
      
      <Section>
        <div className="space-y-4">
          <SearchBar 
            value={search} 
            onChange={setSearch} 
            placeholder="Search by plate number or model..." 
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
                    {value: 'Available', label: 'Available'},
                    {value: 'In Transit', label: 'In Transit'},
                    {value: 'Maintenance', label: 'Maintenance'}
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
          <DataTable columns={columns} data={filteredVehicles} onSort={(conf) => console.log(conf)} />
        )}
        
        <Pagination currentPage={1} totalPages={Math.max(1, Math.ceil(filteredVehicles.length / 10))} onPageChange={() => {}} />
      </Section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Vehicle">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h4 className="text-body-lg font-bold tracking-tight pb-2 text-text-primary border-b border-border-default">Identification</h4>
          <Grid cols={2} gap={4}>
            <Input label="Registration Number" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="e.g. TRK-1234" required />
            <Input label="Vehicle Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Alpha 1" required />
          </Grid>

          <h4 className="text-body-lg font-bold tracking-tight pb-2 pt-2 text-text-primary border-b border-border-default">Specifications</h4>
          <Grid cols={2} gap={4}>
            <Input label="Model" name="model" value={formData.model} onChange={handleChange} placeholder="e.g. Volvo FH16" required />
            <Select 
              label="Type" 
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={[{value: 'Heavy Duty', label: 'Heavy Duty'}, {value: 'Light Commercial', label: 'Light Commercial'}]} 
            />
            <Input label="Max Payload Capacity (kg)" name="maxLoadCapacity" type="number" value={formData.maxLoadCapacity} onChange={handleChange} placeholder="20000" required />
            <Input label="Initial Odometer (km)" name="odometer" type="number" value={formData.odometer} onChange={handleChange} placeholder="0" required />
            <Input label="Acquisition Cost ($)" name="acquisitionCost" type="number" value={formData.acquisitionCost} onChange={handleChange} placeholder="150000" required />
          </Grid>

          <div className="pt-6 mt-4 border-t border-border-default flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button variant="primary" type="submit" icon={<CheckCircle2 size={18} />} isLoading={isSubmitting}>Complete Registration</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
