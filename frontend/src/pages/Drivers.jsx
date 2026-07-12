import React, { useState, useEffect } from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { StatusChip, Progress } from '../components/ui/Feedback';
import { Plus, CheckCircle2 } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Drivers() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    licenseCategory: 'Class A',
    licenseExpiry: '',
    contactNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const columns = [
    { key: 'name', label: 'Driver Name', sortable: true },
    { key: 'licenseNumber', label: 'License Number', sortable: true },
    { key: 'licenseExpiry', label: 'License Expiry', sortable: true, render: (row) => new Date(row.licenseExpiry).toLocaleDateString() },
    { key: 'safetyScore', label: 'Safety Score', sortable: true, render: (row) => <div className="w-24"><Progress value={row.safetyScore} max={100} showLabel={true} /></div> },
    { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
    { key: 'actions', label: 'Actions', render: (row) => <Button variant="ghost" size="sm" onClick={() => navigate(`/drivers/${row.id}`)}>View</Button> }
  ];

  const fetchDrivers = async () => {
    try {
      const response = await api.get('/api/drivers');
      setDrivers(response.data);
    } catch (error) {
      console.error('Failed to fetch drivers', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/api/drivers', {
        ...formData,
        licenseExpiry: new Date(formData.licenseExpiry).toISOString()
      });
      setIsModalOpen(false);
      setFormData({
        name: '', licenseNumber: '', licenseCategory: 'Class A', licenseExpiry: '', contactNumber: ''
      });
      fetchDrivers();
    } catch (error) {
      console.error('Failed to add driver', error);
      alert('Failed to add driver. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filteredDrivers = drivers.filter((d) => {
    const matchesSearch = d.name?.toLowerCase().includes(search.toLowerCase()) || 
                          d.licenseNumber?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && (!isFilterActive || matchesStatus);
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Drivers Directory" subtitle="Manage driver records, track safety scores, and monitor compliance.">
        {user?.role === 'Fleet Manager' && (
          <Button variant="primary" icon={<Plus size={18} />} onClick={() => setIsModalOpen(true)}>
            Add Driver
          </Button>
        )}
      </PageHeader>
      
      <Section>
        <div className="space-y-4">
          <SearchBar 
            value={search} 
            onChange={setSearch} 
            placeholder="Search by name or license number..." 
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
                    {value: 'On Trip', label: 'On Trip'},
                    {value: 'Off Duty', label: 'Off Duty'}
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
          <DataTable columns={columns} data={filteredDrivers} onSort={(conf) => console.log(conf)} />
        )}
        
        <Pagination currentPage={1} totalPages={Math.max(1, Math.ceil(filteredDrivers.length / 10))} onPageChange={() => {}} />
      </Section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Driver">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h4 className="text-body-lg font-bold tracking-tight pb-2 text-text-primary border-b border-border-default">Personal Details</h4>
          <Grid cols={2} gap={4}>
            <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" required />
            <Input label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="e.g. 555-0199" required />
          </Grid>

          <h4 className="text-body-lg font-bold tracking-tight pb-2 pt-2 text-text-primary border-b border-border-default">License Information</h4>
          <Grid cols={2} gap={4}>
            <Input label="License Number" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder="e.g. DL-12345" required />
            <Select 
              label="License Category" 
              name="licenseCategory"
              value={formData.licenseCategory}
              onChange={handleChange}
              options={[
                {value: 'Class A', label: 'Class A'}, 
                {value: 'Class B', label: 'Class B'},
                {value: 'Class C', label: 'Class C'}
              ]} 
            />
            <Input label="Expiry Date" type="date" name="licenseExpiry" value={formData.licenseExpiry} onChange={handleChange} required />
          </Grid>

          <div className="pt-6 mt-4 border-t border-border-default flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button variant="primary" type="submit" icon={<CheckCircle2 size={18} />} isLoading={isSubmitting}>Add Driver</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
